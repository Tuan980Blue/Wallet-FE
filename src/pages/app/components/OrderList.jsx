// Hàm fetch data từ API với phân trang
import {wGet} from "../../../util/request.util.js";
import {useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {IoIosEye} from "react-icons/io";
import {GrNext} from "react-icons/gr";
import OrderDetail from "../../admin/layout-admin/partner-manage/components/OrderDetail.jsx";

const fetchTransactionPartners = async (id, page, pageSize) => {
    try {
        const response = await wGet(`/v1/application/${id}/order?offset=${pageSize}&page=${page}`);
        return response;
    } catch (error) {
        console.error("Lỗi khi lấy danh sách Order:", error);
        return {data: []};
    }
};

const OrderList = ({partnerId}) => {
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [page, setPage] = useState(0);
    const pageSize = 10;

    const {data: orders, error, isLoading} = useQuery({
        queryKey: ["orders", partnerId, page],
        queryFn: () => fetchTransactionPartners(partnerId, page, pageSize),
        keepPreviousData: true,
        staleTime: 300000,
        cacheTime: 600000,
    });

    const handleViewDetails = (transaction) => setSelectedTransaction(transaction);
    const closeDetails = () => setSelectedTransaction(null);

    if (isLoading) return <div className="text-center text-gray-500">Loading...</div>;
    if (error) return <div className="text-center text-red-500">Error: {error.message}</div>;

    return (
        <div className="bg-gray-100 min-h-screen py-10">
            {/* Header */}
            <header className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-800">Lịch Sử Order</h1>
                <p className="text-gray-600 text-lg mt-2">Quản lý và theo dõi lịch sử giao dịch của đối tác</p>
            </header>

            <div className="container mx-auto px-6">
                {/* Tổng số Order */}
                <div className="flex justify-between items-center bg-white shadow-md rounded-lg p-6 mb-6">
                    <p className="text-gray-800 text-lg font-semibold">Tổng số Order: {orders?.total || 0}</p>
                    <p className="text-gray-500 text-sm">Trang hiện tại: {page + 1}</p>
                </div>

                {/* Transaction Table */}
                <div className="overflow-hidden border border-gray-300 rounded-lg shadow-lg bg-white">
                    <table className="w-full text-left table-auto">
                        <thead className="bg-gray-200 text-gray-600 uppercase text-sm font-medium">
                        <tr>
                            {["Ngày", "Tên DV", "Số tiền", "Trạng thái", "Thao tác"].map((header) => (
                                <th key={header} className="py-4 px-6">{header}</th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {orders.orders.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="py-8 px-6 text-center text-gray-500">Không tìm thấy Order
                                    nào
                                </td>
                            </tr>
                        ) : (
                            orders.orders?.map((order) => (
                                <tr key={order.id} className="border-b hover:bg-gray-100 transition-all">
                                    <td className="py-4 px-6 text-gray-700">{new Date(order.created).toLocaleDateString()}</td>
                                    <td className="py-4 px-6 font-semibold text-gray-800">{order.serviceName}</td>
                                    <td className={`py-4 px-6 font-semibold ${
                                        order.status === 'SUCCESS' ? 'text-green-500' : 'text-red-500'
                                    }`}>
                                        {new Intl.NumberFormat('vi-VN', {
                                            style: 'currency',
                                            currency: 'VND'
                                        }).format(order.discountMoney)}
                                    </td>
                                    <td className="py-4 px-6">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                order.status === "SUCCESS"
                                                    ? "bg-green-100 text-green-600"
                                                    : order.status === "PENDING"
                                                        ? "bg-yellow-100 text-yellow-600"
                                                        : "bg-red-100 text-red-600"
                                            }`}>
                                                {order.status}
                                            </span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <button
                                            className="flex items-center justify-center space-x-1 bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition"
                                            onClick={() => handleViewDetails(order)}
                                        >
                                            <IoIosEye/>
                                            <span>Xem chi tiết</span>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Controls */}
                <div className="mt-4 flex justify-center items-center space-x-4">
                    <button
                        onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
                        disabled={page === 0}
                        className={`px-4 py-2 rounded-full transition-colors duration-300 shadow-md ${
                            page === 0 ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"
                        } flex items-center justify-center`}
                    >
                        <GrNext className="rotate-180 text-lg"/>
                    </button>

                    <p className="text-gray-800 font-semibold text-lg">Trang {page + 1}</p>

                    <button
                        onClick={() => setPage((prev) => prev + 1)}
                        disabled={!orders || orders.orders?.length < pageSize}
                        className={`px-4 py-2 rounded-full transition-colors duration-300 shadow-md ${
                            !orders || orders.orders?.length < pageSize ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"
                        } flex items-center justify-center`}
                    >
                        <GrNext className="text-lg"/>
                    </button>
                </div>

                {/* Transaction Details Modal */}
                {selectedTransaction && (
                    <OrderDetail
                        transaction={selectedTransaction}
                        onClose={closeDetails}
                    />
                )}
            </div>
        </div>
    );
};

export default OrderList;