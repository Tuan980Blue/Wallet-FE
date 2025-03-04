import {FaEdit} from 'react-icons/fa';
import {HiMiniCheckBadge} from 'react-icons/hi2';
import {Link, useNavigate} from 'react-router-dom';
import AvatarStatus from '../library component/AvatarStatus.jsx';
import {useAuth} from '../../modules/hooks/useAuth.jsx';
import {Divider, Skeleton} from '@mantine/core';
import {formatCurrency} from '../../util/currency.util.js';
import {useQuery} from '@tanstack/react-query';
import {wGet} from '../../util/request.util.js';

function WalletSection() {
  const {
    data: wallet,
    isLoading,
  } = useQuery({
    queryKey: ['wallet'],
    queryFn: async () => await wGet('/v1/user/wallet'),
    staleTime: 1000 * 30,
  });

  return (
      <div className="p-4 rounded-2xl bg-white">
        <div>
          <div className="text-zinc-900 font-medium text-xl mb-2">VÍ CỦA TÔI</div>
          <div className="flex flex-wrap">
            <div className={'p-2 me-5 flex flex-col justify-between'}>
              <p className="text-sm text-gray-600">Số dư tổng</p>
              <div className="text-lg text-rose-600 font-semibold">
                {wallet ? formatCurrency(wallet.balance) : <Skeleton height={20} width={100}/>}
              </div>
            </div>
            <div className={'p-2 me-5 flex flex-col justify-between'}>
              <p className="text-sm text-gray-600">Số dư khả dụng</p>
              <div className="text-lg font-semibold text-rose-600">
                {wallet ? formatCurrency(wallet.balance) :
                 <Skeleton height={20} width={100}/>}</div>
            </div>
            <div className={'p-2 me-5 flex flex-col justify-between'}>
              <p className="text-sm text-gray-600">Số dư đóng băng</p>
              <p className="text-lg font-semibold text-rose-600">0 đ</p>
            </div>
            <div className={'p-2 me-5 flex flex-col justify-between'}>
              <p className="text-sm text-gray-600">Số dư chờ chuyển</p>
              <p className="text-lg font-semibold text-rose-600">0 đ</p>
            </div>
          </div>
        </div>
      </div>
  );
}

function TopUpBtn() {

  return (
      <div className={'p-5'}>
        <div className="text-center">
          <button className="bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline
                    transition duration-300 ease-in-out hover:bg-green-800 hover:text-white">
            <Link to={'/top-up'} className={'h-full w-full hover:no-underline active:no-underline'}>Nạp tiền</Link>
          </button>
        </div>
      </div>
  );
}

const MyWallet = () => {
  const {user} = useAuth();
  const navigate = useNavigate();
  const handleMPersonal = (e) => {
    e.preventDefault();
    navigate('/management-personal');
  };

  return (
      <div className={'w-full'}>
        <div className="max-w-lg mx-auto bg-white rounded-lg overflow-hidden mb-9">
          <div>
            <div className="bg-[url('/backgroundLogin.png')] bg-cover">
              <div className="max-w-lg mx-auto shadow-md backdrop-blur-sm rounded-lg overflow-hidden">
                <div className="px-6 py-4 flex justify-between items-center">
                  <div>
                    <h2 className="text-white text-3xl font-bold mb-2">Thông tin cá nhân</h2>
                  </div>
                  <div className="flex items-center text-green-400 hover:text-red-400"
                       onClick={handleMPersonal}>
                    <FaEdit size={20} className="cursor-pointer mr-2"/>
                    <span className="cursor-pointer">Sửa</span>
                  </div>
                </div>
                <div className="flex items-center px-6 py-4">
                  <div className="flex cursor-pointer mr-4 border-2 border-white rounded-full"
                       onClick={handleMPersonal}>
                    <AvatarStatus
                        src="/avatarH.png"
                        alt="avatar"
                        size="w-16 h-16"
                    />
                  </div>
                  <div>
                    <div className={'flex flex-grow justify-start items-center gap-2'}>
                      <p className="text-white text-lg font-semibold">{user.lastName + ' ' + user.firstName}</p>
                      <HiMiniCheckBadge size={22}
                                        className={user.isVerified ? 'text-blue-600' : 'text-gray-400'}/>
                    </div>
                    <div className="flex items-center">
                      <p className={user.isVerified
                                    ? 'text-emerald-300 font-semibold mr-2'
                                    : 'text-gray-300 font-semibold mr-2'}>{user.isVerified
                                                                           ? 'Đã chứng thực'
                                                                           : 'Chưa chứng thực'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="max-w-lg mx-auto bg-white overflow-hidden mt-1 p-6">
              <div className="mb-2">
                <label className="block text-gray-700 text-base font-extralight mb-0.5">
                  Loại tài khoản
                </label>
                <p className="text-gray-900 font-semibold">Tài khoản cá nhân</p>
              </div>
              <div className="mb-2">
                <label className="block text-gray-700 text-base font-extralight mb-0.5">
                  Email đăng nhập
                </label>
                <p className="text-gray-900 font-semibold">{user.email}</p>
              </div>
            </div>
          </div>
          <Divider/>
          <WalletSection/>
          <TopUpBtn/>
        </div>
      </div>
  );
};

export default MyWallet;
export {WalletSection, TopUpBtn};
