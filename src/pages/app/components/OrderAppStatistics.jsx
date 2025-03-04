import { useQuery } from "@tanstack/react-query";
import { wGet } from "../../../util/request.util.js";
import { FaMoneyBillWave, FaCheckCircle, FaRegClock, FaRegWindowClose, FaUndo } from "react-icons/fa";

const fetchTransactionStats = async (id) => {
    const response = await wGet(`/v1/statistics/app/${id}`);
    return response;
};

const OrderAppStatistics = ({ id }) => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["transactionStats", id],
        queryFn: () => fetchTransactionStats(id),
        staleTime: 1000 * 60 * 5,
        cacheTime: 1000 * 60 * 10,
        refetchOnWindowFocus: false,
    });

    if (isLoading) {
        return <div className="text-center py-4 animate-pulse text-gray-500">Đang tải dữ liệu...</div>;
    }

    if (isError) {
        return <div className="text-center py-4 text-red-500">Đã có lỗi xảy ra: {error.message}</div>;
    }

    const {
        totalMoneySuccess,
        totalOrdersSuccess,
        totalOrdersCancelled,
        totalOrdersPending,
        totalMoneyRefunded,
        totalOrdersRefunded,
    } = data || {};

    return (
        <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
            <h2 className="text-3xl font-bold text-gray-800 mb-6"> Tổng Quan Giao Dịch</h2>

            {/* Tổng Doanh Thu */}
            <div className="flex justify-between items-center bg-blue-100 p-4 rounded-lg shadow-md mb-6">
                <div className="flex items-center">
                    <FaMoneyBillWave className="text-blue-600 text-3xl mr-3" />
                    <div>
                        <p className="text-lg text-gray-600">Tổng Doanh Thu</p>
                        <p className="text-2xl font-bold text-blue-800">{totalMoneySuccess.toLocaleString()} VND</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {/* Giao dịch thành công */}
                <div
                    className="bg-green-100 rounded-lg p-6 text-center shadow-md hover:scale-105 transform transition-transform">
                    <FaCheckCircle className="text-green-600 text-3xl mb-2"/>
                    <p className="text-lg text-gray-600 mb-2">Giao Dịch Thành Công</p>
                    <p className="text-2xl font-extrabold text-green-600">{totalOrdersSuccess}</p>
                    <p className="text-sm text-gray-500">Số tiền: {totalMoneySuccess.toLocaleString()} VND</p>
                </div>

                {/* Giao dịch đã hủy */}
                <div
                    className="bg-red-100 rounded-lg p-6 text-center shadow-md hover:scale-105 transform transition-transform">
                    <FaRegWindowClose className="text-red-600 text-3xl mb-2" />
                    <p className="text-lg text-gray-600 mb-2">Giao Dịch Đã Hủy</p>
                    <p className="text-2xl font-extrabold text-red-600">{totalOrdersCancelled}</p>
                </div>

                {/* Giao dịch đang xử lý */}
                <div className="bg-yellow-100 rounded-lg p-6 text-center shadow-md hover:scale-105 transform transition-transform">
                    <FaRegClock className="text-yellow-600 text-3xl mb-2" />
                    <p className="text-lg text-gray-600 mb-2">Giao Dịch Đang Xử Lý</p>
                    <p className="text-2xl font-extrabold text-yellow-600">{totalOrdersPending}</p>
                </div>

                {/* Giao dịch hoàn tiền */}
                <div
                    className="bg-purple-100 rounded-lg p-6 text-center shadow-md hover:scale-105 transform transition-transform">
                    <FaUndo className="text-purple-600 text-3xl mb-2"/>
                    <p className="text-lg text-gray-600 mb-2">Giao Dịch Hoàn Tiền</p>
                    <p className="text-2xl font-extrabold text-purple-600">{totalOrdersRefunded}</p>
                    <p className="text-sm text-gray-500">Tổng Số tiền: {totalMoneyRefunded.toLocaleString()} VND</p>
                </div>
            </div>
        </div>
    );
};

export default OrderAppStatistics;