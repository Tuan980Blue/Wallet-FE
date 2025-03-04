import {FaDownload} from 'react-icons/fa';
import {useState} from 'react';
import {Button, LoadingOverlay, NumberInput} from '@mantine/core';
import {wGet} from '../../util/request.util.js';
import {useQuery} from '@tanstack/react-query';
import {ScrollRestoration} from 'react-router-dom';
import {Collapse} from '@material-tailwind/react';
import {getRevealFormat} from '../../util/number.util.js';
import {topUp} from '../../modules/topup.js';
import {getMyWallet} from '../../modules/wallet/wallet.js';
import {revalidateCache} from '../../modules/cache.js';
import {toast} from 'react-toastify';

const suggestedAmounts = [20000, 50000, 100000, 200000, 500000, 1000000];
const paymentMethods = [
  {
    label: 'Paypal',
    method: 'PAYPAL',
    minAmount: 10000,
    image: '/paypal_icon.png',
  },
  {
    label: 'Online bằng thẻ liên kết',
    method: 'ATM_CARD',
    minAmount: 10000,
    // fee: '0,33%',
  },
];

const TopUpForm = () => {
  const [amount, setAmount] = useState('');
  const [methodPay, setMethodPay] = useState('');
  const [error, setError] = useState(false);
  const [suggestAmount, setSuggestAmount] = useState(0);
  const [selectedCardNumber, setSelectedCardNumber] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const {data: wallet} = useQuery({
    queryKey: ['wallet'],
    queryFn: async () => getMyWallet(),
  });

  const {
    data: cardList,
  } = useQuery({
    queryKey: ['card-list'],
    queryFn: async () => await wGet('/v1/card'),
    staleTime: 1000 * 60 * 10,
  });

  const {data: bankList} = useQuery({
    queryKey: ['bank-list'],
    queryFn: async () => await wGet('/v1/banks'),
    staleTime: 1000 * 60 * 60,
  });

  const handleAmountChange = (e) => {
    setSuggestAmount(0);
    if (parseInt(e) > BigInt(Number.MAX_SAFE_INTEGER)) {
      setError('Số tiền quá lớn');
      return;
    }
    if (parseInt(e) > 100000000) {
      setError('Số tiền nạp không được lớn hơn 100.000.000 VND');
      return;
    }
    setAmount(e);
    setError(null);
  };

  const handleMethodChange = (methodPay) => {
    setMethodPay(methodPay);
    setError(false);
    setSelectedCardNumber(undefined);
  };

  function onSubmitTopUp(e) {
    e.preventDefault();
    if (!amount || amount < 10000) {
      setError('Số tiền phải lớn hơn 10.000 VND');
      return;
    }
    if (!methodPay) {
      setError('Vui lòng chọn phương thức thanh toán');
      return;
    }
    if (methodPay === 'ATM_CARD' && !selectedCardNumber) {
      setError('Vui lòng chọn thẻ liên kết');
      return;
    }
    setError(null);
    setLoading(true);
    topUp(wallet.id, amount, methodPay, selectedCardNumber, methodPay).then(r => {
      if (r.redirectTo) {
        window.location.href = r.redirectTo;
      }
      else {
        setTimeout(() => {
          setLoading(false);
          revalidateCache('wallet').then();
          toast.success('Nạp tiền thành công');
        }, 1000);
      }
    }).catch(() => {
      setLoading(false);
    });
  }

  function handleSelectCard(card) {
    setSelectedCardNumber(card.cardNumber);
  }

  return (
      <div className={'w-full relative'}>
        <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{radius: 'sm', blur: 2}}/>
        <div className="bg-white shadow-md rounded-lg overflow-hidden mb-9">
          <div
              className="flex items-center p-4 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-t-lg">
            <FaDownload size={25}/>
            <h2 className="text-2xl font-bold ml-3">Nạp tiền</h2>
          </div>
          <div className={'p-4'}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
                SỐ TIỀN CẦN NẠP
              </label>
              <NumberInput
                  size={'md'}
                  suffix={''}
                  max={BigInt(Number.MAX_SAFE_INTEGER)}
                  min={10000}
                  rightSection={<div className={'mr-10'}>VNĐ</div>}
                  allowNegative={false}
                  allowDecimal={false}
                  error={error}
                  thousandSeparator="," //Thêm dấu phẩy ngăn cách hàng nghìn
                  placeholder="Số tiền tối thiểu phải lớn hơn 10.000 VND"
                  value={amount}
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
                          setAmount(val.toString());
                          setSuggestAmount(val);
                          setError(false);
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
              <label className="block text-gray-700 text-sm font-bold mb-2">
                CHỌN PHƯƠNG THỨC NẠP
              </label>
              {error && !amount &&
                  <p className="text-red-600 text-sm my-2">Vui lòng nhập số tiền trước khi chọn phương
                    thức</p>}
              <div className="grid grid-cols-2 gap-4">
                {paymentMethods.map(({
                                       image,
                                       method,
                                       label,
                                       minAmount,
                                       fee,
                                     }) => (
                    <div
                        key={label}
                        onClick={() => handleMethodChange(method)}
                        className={`p-4 flex justify-start items-center rounded-lg transition-colors border ${methodPay ===
                                                                                                              method
                                                                                                              ? 'border-green-500 bg-green-100'
                                                                                                              : 'hover:border-green-500 hover:bg-gray-100'} cursor-pointer`}
                    >
                      {image && <img src={image} alt={label} className="flex w-1/3 mr-3"/>}
                      <div>
                        <p className={`font-semibold ${methodPay === method
                        && 'text-blue-500'}`}>{label}</p>
                        <p className="text-sm text-gray-500">Tối
                          thiểu: {minAmount.toLocaleString()}đ {fee && ` - Phí: ${fee}`}</p>
                      </div>
                    </div>
                ))}
              </div>
            </div>


            <Collapse open={methodPay === 'ATM_CARD'}>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  CHỌN THẺ LIÊN KẾT
                </label>
              </div>
              <div className={'w-full grid grid-cols-2 gap-3'}>
                {Array.isArray(cardList) && cardList?.map((card) => {
                  const bank = bankList?.find(b => b.id == card.atmId);
                  return (
                      (<div key={card.id}
                            className={`${card.cardNumber === selectedCardNumber &&
                            '!bg-green-100 border-green-500'} w-full flex items-center rounded hover:border-green-500 hover:bg-gray-100 transition-colors px-2 py-3 border`}
                            onClick={() => handleSelectCard(card)}
                      >
                        <img src={bank?.logo} className={'w-1/3'} alt="bank logo"/>
                        <div className={'text-center w-full'}>{getRevealFormat(card.cardNumber.toString())}</div>
                      </div>)
                  );
                })}
              </div>

            </Collapse>

            <div className={'w-full mt-3'}>
              <Button
                  color={'green'}
                  onClick={onSubmitTopUp}
                  type={'submit'}
                  size={'md'}
                  className={'mb-2 w-full'}>
                Nạp tiền
              </Button>
            </div>
          </div>
        </div>
        <ScrollRestoration/>
      </div>
  );

};

export default TopUpForm;
