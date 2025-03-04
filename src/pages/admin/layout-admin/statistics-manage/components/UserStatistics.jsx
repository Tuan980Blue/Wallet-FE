import { useQuery } from "@tanstack/react-query";
import { wGet } from "../../../../../util/request.util.js";

const fetchStatistics = async () => {
    const response = await wGet('/v1/statistics/all');
    return response;
};

const UserStatistics = () => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['userStatistics'],
        queryFn: fetchStatistics,
        staleTime: 1000 * 60 * 5,
        cacheTime: 1000 * 60 * 10,
        refetchOnWindowFocus: false,
    });

    // Xử lý trạng thái tải và lỗi
    if (isLoading) {
        return (
            <div className="text-center py-4 animate-pulse text-lg text-gray-500">
                Đang tải dữ liệu...
            </div>
        );
    }
    if (isError) {
        return (
            <div className="text-center py-4 text-red-500">
                Đã có lỗi xảy ra: {error.message}
            </div>
        );
    }

    return (
        <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 transition-transform transform hover:shadow-2xl">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Thống Kê Người Dùng</h2>
            <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 md:space-x-4">
                {/* Thống kê số ví */}
                <div
                    className="stat-item bg-blue-50 rounded-lg p-6 flex-1 text-center shadow-md transition-transform transform hover:scale-105">
                    <p className="text-md text-gray-500 mt-2">Số ví</p>
                    <p className="text-4xl font-extrabold text-blue-600">{data.total_wallets}</p>
                </div>
                {/* Thống kê số quỹ nhóm */}
                <div
                    className="stat-item bg-green-50 rounded-lg p-6 flex-1 text-center shadow-md transition-transform transform hover:scale-105">
                    <p className="text-md text-gray-500 mt-2">Số quỹ nhóm</p>
                    <p className="text-4xl font-extrabold text-green-600">{data.total_group_funds}</p>
                </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 md:space-x-4 mt-4">
                {/* Thống kê số người dùng */}
                <div
                    className="stat-item bg-yellow-50 rounded-lg p-6 flex-1 text-center shadow-md transition-transform transform hover:scale-105">
                    <p className="text-md text-gray-500 mt-2">Số người dùng</p>
                    <p className="text-4xl font-extrabold text-yellow-600">{data.total_users}</p>
                </div>
                {/* Thống kê số đối tác */}
                <div
                    className="stat-item bg-red-50 rounded-lg p-6 flex-1 text-center shadow-md transition-transform transform hover:scale-105">
                    <p className="text-md text-gray-500 mt-2">Số đối tác</p>
                    <p className="text-4xl font-extrabold text-red-600">{data.total_partners}</p>
                </div>
            </div>
        </div>
    );
};

export default UserStatistics;