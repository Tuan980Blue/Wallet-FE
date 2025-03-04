import {FaUpload} from 'react-icons/fa';
import {useState} from 'react';
import {WalletSection} from '../../components/account/WalletSection.jsx';
import {Button, LoadingOverlay, NumberInput} from '@mantine/core';
import {useQuery} from '@tanstack/react-query';
import {getMyWallet} from '../../modules/wallet/wallet.js';
import {getRevealFormat} from '../../util/number.util.js';
import {wGet} from '../../util/request.util.js';
import {withdraw} from '../../modules/withdraw.js';
import {revalidateCache} from '../../modules/cache.js';
import {toast} from 'react-toastify';
import {useWallet} from '../../modules/hooks/useWallet.jsx';

const WithdrawPage = () => {
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [suggestAmount, setSuggestAmount] = useState(0);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const {data: wallet} = useWallet();
  const {data: bankList} = useQuery({
    queryKey: ['bank-list'], queryFn: async () => await wGet('/v1/banks'), staleTime: 1000 * 60 * 60,
  });
  const {
    data: cardList,
  } = useQuery({
    queryKey: ['card-list'], queryFn: async () => await wGet('/v1/card'), staleTime: 1000 * 60 * 10,
  });

  function handleSelectCard(card) {
    setSelectedCard(card.id);
  }

  const suggestedAmounts = [100000, 200000, 300000, 400000, 500000, 1000000];

  const handleAmountChange = (e) => {
    setError('');
    setSuggestAmount(0);
    if (parseInt(e) > parseInt(wallet?.balance)) {
      setError('Số tiền rút không được lớn hơn số dư trong ví.');
    }
    setAmount(e);
  };

  function showSuccessMessage() {
    toast.success('Rút tiền thành công');
  }

  function handleSubmitWithdraw() {
    setError('');
    if (parseInt(amount) > parseInt(wallet?.balance)) {
      setError('Số tiền rút không được lớn hơn số dư trong ví.');
      return;
    }

    if (!amount || amount === '') {
      setError('Vui lòng nhập số tiền cần rút.');
      return;
    }
    if (amount < 10000) {
      setError('Số tiền rút ít nhất 10.000 VNĐ.');
      return;
    }

    if (parseInt(amount) > BigInt(Number.MAX_SAFE_INTEGER)) {
      setError('Số tiền rút không hợp lệ');
    }
    console.log(selectedCard);
    if (!selectedCard || selectedCard === '') {
      setError('Vui lòng chọn thẻ liên kết');
      return;
    }
    setIsLoading(true);
    withdraw(wallet.id, amount).then(() => {
      revalidateCache('wallet').then();
      showSuccessMessage();
      setIsLoading(false);
    }).catch((e) => {
      setError(e.response.data.message);
    });
  }

  return (<div className="flex relative flex-col md:flex-row justify-center">
    <LoadingOverlay visible={isLoading} zIndex={1000} overlayProps={{radius: 'sm', blur: 2}}/>
    <div className="w-full md:w-2/3 lg:w-1/2 bg-white shadow-md rounded-lg overflow-hidden mb-9">
      <div className="flex items-center p-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-t-lg">
        <FaUpload size={25}/>
        <h2 className="text-2xl font-bold ml-3">Rút tiền</h2>
      </div>
      <div className={'p-4'}>
        <div className="mb-6 flex justify-start">
          <h1 className="text-xl md:text-2xl lg:text-4xl text-gray-500 font-light">
            Thông tin rút tiền
          </h1>
        </div>
        <div className="mb-2 flex flex-col">
          <div className="mb-4">
            <label
                className="mr-4 text-gray-700 text-sm font-bold mb-2 "
                htmlFor="amount"
            >
              Số Tiền
            </label>
            <NumberInput
                placeholder="Số tiền cần rút"
                value={amount}
                size="md"
                max={BigInt(Number.MAX_SAFE_INTEGER)}
                min={10000}
                error={error}
                thousandSeparator={','}
                suffix={''}
                rightSection={<div className={'mr-10'}>VNĐ</div>}
                allowNegative={false}
                allowDecimal={false}
                onChange={handleAmountChange}
                hideControls
            />
          </div>
          <p className="text-gray-700 text-md font-semibold mb-2">Số tiền đề xuất:</p>
          <div className="grid grid-cols-2 gap-2 md:gap-4 justify-center md:grid-cols-3">
            {suggestedAmounts.map((val) => (<button
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
            </button>))}
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mt-3">
              CHỌN THẺ LIÊN KẾT
            </label>
          </div>
          <div className={'w-full grid grid-cols-2 gap-3 mt-2'}>
            {Array.isArray(cardList) && cardList?.map((card) => {
              const bank = bankList?.find(b => b.id == card.atmId);
              return ((<div key={card.id}
                            className={`${card.id === selectedCard &&
                            '!bg-green-100 border-green-500'} w-full flex items-center rounded hover:border-green-500 hover:bg-gray-100 transition-colors px-2 py-3 border`}
                            onClick={() => handleSelectCard(card)}
              >
                <img src={bank?.logo} className={'w-1/3'} alt="bank logo"/>
                <div className={'text-center w-full'}>{getRevealFormat(card.cardNumber.toString())}</div>
              </div>));
            })}
          </div>
          <div className="flex justify-end mt-5">
            <Button
                onClick={handleSubmitWithdraw}
                color="green"
                type="submit"
                size={'md'}
                className="w-full mt-3"
            >
              Tiếp tục
            </Button>
          </div>
        </div>
      </div>

    </div>
    <div className="order-first md:order-last w-full md:w-1/3 lg:w-1/4 mb-6 md:mb-0 md:ml-9">
      <WalletSection/>
    </div>
  </div>);
};

export default WithdrawPage;
