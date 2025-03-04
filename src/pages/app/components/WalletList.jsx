import {FaWallet} from 'react-icons/fa';
import {CiCircleList} from 'react-icons/ci';

const WalletList = ({wallets, onSelectWallet}) => {

  return (
      <div className="p-6 bg-white rounded-lg transition-transform transform">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
          <CiCircleList className="text-blue-600 mr-3" size={32}/>
          Danh Sách Ví Con Của Bạn
        </h2>
          <div>
              {wallets?.length === 0 && (
                    <div className="text-center text-gray-500">Không có ví nào</div>
              )}
          </div>
        <ul className="space-y-4">
          {wallets?.length > 0 && wallets.map((wallet) => (
              <li
                  key={wallet.id}
                  className="p-4 bg-gray-100 rounded-lg shadow hover:shadow-md hover:bg-gray-200 transition duration-300 flex items-center gap-4"
                  onClick={() => onSelectWallet(wallet)}
              >
                {/* Icon ở đầu mỗi mục */}
                <div className="text-blue-500">
                  <FaWallet size={24}/>
                </div>

                {/* Tên ví và số dư */}
                <div className="flex justify-between w-full">
                  {/* Tên ví */}
                  <span className="text-lg font-semibold text-gray-700">
                                {wallet.id}
                            </span>

                            {/* Số dư (màu xanh + đơn vị VNĐ) */}
                            <span className="text-lg font-bold text-green-600">
                                <span className="text-lg font-semibold text-gray-700 mr-2">
                                Số dư:
                                </span>
                                {wallet.balance} VNĐ
                            </span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default WalletList;