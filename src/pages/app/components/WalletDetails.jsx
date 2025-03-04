
import OrderList from "./OrderList.jsx";
import { FaArrowLeft, FaWallet, FaMoneyBillWave, FaClipboardList } from "react-icons/fa"; // Import các icon từ react-icons

const WalletDetails = ({ wallet, onBack }) => {
    return (
        <div className="p-8 bg-gradient-to-r from-white to-gray-50 rounded-xl  transition-transform transform">
            <button className="mb-6 text-blue-500 flex items-center group" onClick={onBack}>
                <FaArrowLeft className="mr-2 group-hover:animate-bounce" />
                <span className="group-hover:underline">Quay lại</span>
            </button>
            <div className="flex items-center mb-6">
                <FaWallet className="text-green-600 mr-4 animate-pulse" size={36} />
                <h2 className="text-3xl font-bold text-gray-900">Chi Tiết Ví: {wallet?.name || "Ví Điện Tử"}</h2>
            </div>
            <p className="text-lg text-gray-700 mb-6">
                <strong>Số dư:</strong> <span className="text-green-700 text-2xl font-bold">{wallet?.balance || 0} VNĐ</span>
            </p>
            <div className="bg-white p-6 rounded-xl border-t-4 border-emerald-500 shadow-md mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <FaMoneyBillWave className="text-blue-600 mr-3" />
                    Thông Tin Ví
                </h3>
                <p className="text-gray-700">Mã ví: {wallet.id}</p>
                <p className="text-gray-700">Ngày tạo: 01/01/2022</p>
                <p className="text-gray-700">Trạng thái: Đang hoạt động</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <FaClipboardList className="text-blue-600 mr-3" />
                    Danh Sách Giao Dịch
                </h3>
                <OrderList walletId={wallet.id} />
            </div>
        </div>
    );
};

export default WalletDetails;