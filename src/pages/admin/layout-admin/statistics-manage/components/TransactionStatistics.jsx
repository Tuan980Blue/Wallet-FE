import { useQuery } from "@tanstack/react-query";
import { wGet } from "../../../../../util/request.util.js";

// Hàm fetch API
const fetchTransactionStats = async () => {
    const response = await wGet('/v1/transaction/stats'); // URL API của bạn
    return response; // Trả về dữ liệu từ API
};

// Hàm ánh xạ trạng thái giao dịch
const mapStatus = (flowType) => {
    // Định nghĩa các trạng thái
    const statusMap = {
        TRANSFER_MONEY: { label: "Chuyển tiền", color: "bg-yellow-200", textColor: "text-yellow-800" },
        RECEIVE_MONEY: { label: "Nhận tiền", color: "bg-green-200", textColor: "text-green-800" },
        TOP_UP: { label: "Nạp tiền", color: "bg-blue-200", textColor: "text-blue-800" },
        WITHDRAW: { label: "Rút tiền", color: "bg-red-200", textColor: "text-red-800" },
        TOP_UP_GROUP_FUND: { label: "Nạp vào quỹ nhóm", color: "bg-purple-200", textColor: "text-purple-800" },
        WITHDRAW_GROUP_FUND: { label: "Rút từ quỹ nhóm", color: "bg-orange-200", textColor: "text-orange-800" },
    };

    // Trả về trạng thái tương ứng hoặc trạng thái mặc định nếu không tìm thấy
    return statusMap[flowType] || { label: "Không xác định", color: "bg-gray-200", textColor: "text-gray-800" };
};

const TransactionStatistics = () => {
    // Sử dụng useQuery để fetch dữ liệu
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['transactionStats'],
        queryFn: fetchTransactionStats,
        staleTime: 1000 * 60 * 5,
        cacheTime: 1000 * 60 * 10,
        refetchOnWindowFocus: false,
    });

    // Tính toán tổng số giao dịch và tổng số tiền
    const totalStats = data
        ? {
            totalTransactions: data.reduce((sum, item) => sum + item.totalTransactions, 0),
            totalAmount: data.reduce((sum, item) => sum + item.totalAmount, 0),
        }
        : { totalTransactions: 0, totalAmount: 0 };

    // Xử lý trạng thái khi đang tải hoặc gặp lỗi
    if (isLoading) {
        return <div className="text-center py-4 animate-pulse text-gray-500">Đang tải dữ liệu...</div>;
    }

    if (isError) {
        return <div className="text-center py-4 text-red-500">Đã có lỗi xảy ra: {error.message}</div>;
    }

    return (
        <div className="bg-gradient-to-r from-white to-gray-100 shadow-xl rounded-lg p-6 border border-gray-200">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Tổng quan về Giao Dịch</h2>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Tổng số giao dịch */}
                <div
                    className="bg-cyan-100 stat-item transition-transform transform hover:scale-105 rounded-lg p-6 text-center shadow-md">
                    <p className="text-lg text-gray-500 mb-2">Tổng số giao dịch</p>
                    <p className="text-2xl font-extrabold text-blue-600">{totalStats.totalTransactions}</p>
                </div>
                {/* Tổng số tiền */}
                <div
                    className="bg-cyan-100 stat-item transition-transform transform hover:scale-105 rounded-lg p-6 text-center shadow-md">
                    <p className="text-lg text-gray-500 mb-2">Tổng số tiền Giao Dịch</p>
                    <p className="text-2xl font-extrabold text-green-600">{totalStats.totalAmount.toLocaleString()} VND</p>
                </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-700 mt-8 mb-4">Chi Tiết Giao Dịch Theo Trạng Thái</h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {data.map((transaction, index) => {
                    const flowType = mapStatus(transaction.flowType);
                    return (
                        <div
                            key={index}
                            className={`transition-transform transform hover:scale-105 rounded-lg p-4 shadow-md ${status.color}`}>
                            <h4 className={`text-lg font-bold ${flowType.textColor} mb-2`}>
                                {flowType.label}
                            </h4>
                            <ul className="space-y-2">
                                <li className="flex justify-between">
                                    <span className="text-gray-600">Số giao dịch:</span>
                                    <span className="text-gray-600 font-bold">{transaction.totalTransactions}</span>
                                </li>
                                <li className="flex justify-between">
                                    <span className="text-gray-600">Số tiền:</span>
                                    <span
                                        className="text-green-500 font-bold">{transaction.totalAmount.toLocaleString()} VND</span>
                                </li>
                            </ul>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default TransactionStatistics;