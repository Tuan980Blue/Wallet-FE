import {useState} from 'react';
import {ScrollRestoration, useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import {useAuth} from '../../modules/hooks/useAuth.jsx';
import {Button, Divider, Modal, NumberInput, Textarea, TextInput} from '@mantine/core';
import OTPForm from '../OTPForm.jsx';
import {sendTransferMoneyOtp, verifyTransferMoneyOtp} from '../../modules/otp.js';
import {CiAt} from 'react-icons/ci';
import {isNotEmpty, useForm} from '@mantine/form';
import {checkUser, transfer_v2} from '../../modules/transfer.js';
import {getMyWallet} from '../../modules/wallet/wallet.js';
import {useQuery} from '@tanstack/react-query';
import {handleAuth} from '../../util/auth.util.js';

const TransferMoney = () => {
  //lấy thông tin Ví
  const {user} = useAuth();
  const [isShowOtpForm, setIsShowOtpForm] = useState(false);
  const [receiver, setReceiver] = useState(null);
  const [suggestAmount, setSuggestAmount] = useState(0);

  const {data: wallet} = useQuery({
    queryKey: ['wallet'],
    queryFn: async () => await getMyWallet(),
  });

  const form = useForm({
    initialValues: {
      money: 0,
      receiverId: '',
      message: '',
    },
    validate: {
      money: (value) => {
        if (value < 10000) {
          return 'Số tiền phải lớn hơn 10.000 VND';
        }
        if (value > wallet?.balance) {
          return 'Số tiền chuyển không được lớn hơn số dư trong ví';
        }
      },
      receiverId: isNotEmpty('Email người nhận không được để trống'),
    },
  });

  const suggestedAmounts = [20000, 50000, 100000, 200000, 500000, 1000000];

  const handleAmountChange = (value) => {
    setSuggestAmount(0);
    form.setFieldValue('money', value);
  };

  const navigate = useNavigate();

  async function onVerifyOtp(otp) {
    await verifyTransferMoneyOtp(otp);
    toast.success('Xác thực OTP thành công!');
    setIsShowOtpForm(false);
    await submit();
  }

  async function submit() {
    transfer_v2({...form.values, sourceId: wallet?.id}).then((data) => {
      navigate(`/transaction/${data.id}`);
    }).catch((e) => {
      toast.error(e.response.data.message);
    });
  }

  async function sendOtp() {
    await sendTransferMoneyOtp();
  }

  function onSubmitTransferMoney() {
    const formValidationResult = form.validate();
    if (formValidationResult.hasErrors) return;
    if (!receiver) {
      form.setFieldError('receiverId', 'Người nhận không tồn tại');
      return;
    }
    if (parseInt(form.values.money) >= 5000000) {
      handleAuth(() => {
        submit().then();
      }).then();
    }
    else {
      sendOtp().then();
      setIsShowOtpForm(true);
    }
  }

  return (<div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden mb-9">
    {isShowOtpForm &&
        <Modal title={'Xác thực OTP chuyển tiền'} onClose={() => {
          setIsShowOtpForm(false);
        }} opened centered>
          <OTPForm sendTo={user.email} onSubmit={onVerifyOtp} onResendOtp={sendOtp}/>
        </Modal>}
    <div className="flex items-center p-4 bg-gradient-to-r from-green-500 to-blue-400 text-white rounded-t-lg">
      <h2 className="text-3xl font-bold ml-3">Chuyển Tiền</h2>
    </div>
    <div>
      <form className="p-4 md:p-6">
        <div className="mb-6">
          <label
              className="block text-gray-700 text-lg font-bold mb-2"
              htmlFor="amount"
          >
            Số tiền cần chuyển
          </label>
          <NumberInput
              size={'md'}
              rightSection={<div className={'mr-10'}>VNĐ</div>}
              allowNegative={false}
              allowDecimal={false}
              thousandSeparator="," //Thêm dấu phẩy ngăn cách hàng nghìn
              placeholder="Số tiền tối thiểu phải lớn hơn 10.000 VND"
              value={form.values.money}
              {...form.getInputProps('money')}
              onChange={handleAmountChange}/>
        </div>

        <div className="mb-6">
          <p className="text-gray-700 text-md font-semibold mb-2">Số tiền đề xuất:</p>
          <div className="grid grid-cols-3 gap-4">
            {suggestedAmounts.map((val) => (
                <button
                    key={val}
                    type="button"
                    onClick={() => {
                      form.setFieldValue('money', val);
                      setSuggestAmount(val);
                    }}
                    className={`h-10 ${val === suggestAmount
                                       ? '!bg-green-400 text-white'
                                       : 'bg-white'} border text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline transition duration-300`}
                >
                  {val.toLocaleString()}
                </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <div className="mb-4">
            <label
                className="block text-gray-700 text-md font-semibold mb-2"
                htmlFor="recipientEmail"
            >
              Email người nhận:
            </label>
            <TextInput
                type="email"
                id="recipientEmail"
                placeholder="Nhập email người nhận"
                leftSection={<CiAt/>}
                size={'md'}
                {...form.getInputProps('receiverId')}
                onBlur={() => {
                  if (user?.email === form.values.receiverId) {
                    form.setFieldError('receiverId', 'Không thể chuyển tiền cho chính mình');
                    return;
                  }

                  checkUser(form.values.receiverId).then((res) => {
                    setReceiver(res);
                  }).catch(e => {
                    setReceiver(null);
                    form.setFieldError('receiverId', e.response.data.message);
                  });
                }}
                className="text-gray-700"
            />
          </div>
        </div>
        <div>
          <TextInput
              label={'Tên người nhận'}
              placeholder={'Tên người nhận'}
              disabled
              size={'md'}
              value={receiver ? receiver?.lastName + ' ' + receiver?.firstName : ''}
              className="text-gray-700"
          />
        </div>

        <div className="mb-6">
          <label
              className="block text-gray-700 text-md font-semibold mb-2"
              htmlFor="content"
          >
            Nội dung:
          </label>
          <Textarea
              id="content"
              placeholder="Nhập nội dung chuyển tiền"
              {...form.getInputProps('message')}
              height={100}
              maxRows={4}
              size={'md'}
              minRows={2}
              autosize
          />
        </div>

        <Divider/>
        <div className="mb-2 border-gray-300 pt-4">
          <p className="text-gray-700 text-lg font-semibold mb-2">
            Tổng số tiền: {form.values.money.toLocaleString()} đ
          </p>
        </div>
        <Button
            type="button"
            size={'md'}
            className={`w-full bg-green-500 hover:bg-green-600 rounded-lg text-white font-bold text-lg`}
            onClick={() => onSubmitTransferMoney()}
        >
          Xác Nhận
        </Button>
      </form>
    </div>
    <ScrollRestoration/>
  </div>);
};

export default TransferMoney;
