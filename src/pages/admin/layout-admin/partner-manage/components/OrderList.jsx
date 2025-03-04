import { useState } from "react";
import { IoIosEye } from "react-icons/io";
import { useQuery } from "@tanstack/react-query";
import { GrNext } from "react-icons/gr";
import {wGet} from "../../../../../util/request.util.js";
import OrderDetail from "./OrderDetail.jsx";

// Hàm fetch data từ API với phân trang
const fetchTransactionPartners = async (id, page, pageSize) => {
    try {
        const response = await wGet(`/v1/application/${id}/order?offset=${pageSize}&page=${page}`);
        return response;
    } catch (error) {
        console.error("Lỗi khi lấy danh sách Partner:", error);
        return { data: [] };
    }
};

const OrderList = ({ partner }) => {
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [page, setPage] = useState(0);
    const pageSize = 10;

    const { data: orders, error, isLoading } = useQuery({
        queryKey: ["orders", partner.id, page],
        queryFn: () => fetchTransactionPartners(partner.id, page, pageSize),
        keepPreviousData: true,
        staleTime: 300000,
        cacheTime: 600000,
    });

    const handleViewDetails = (transaction) => setSelectedTransaction(transaction);
    const closeDetails = () => setSelectedTransaction(null);

    if (isLoading) return <div className="text-center text-gray-500">Loading...</div>;
    if (error) return <div className="text-center text-red-500">Error: {error.message}</div>;

    return (
        <div className="bg-white shadow-lg rounded-2xl p-6 mx-auto mb-6 max-w-4xl">
            {/* Header */}
            <header className="text-center mb-4">
                <h2 className="text-3xl font-bold text-gray-800">Lịch Sử Order {partner?.name || "Vi Dien Tu"}</h2>
            </header>

            <p className="text-gray-600 mb-2">Tổng số Order: {orders?.total || 0}</p>

            {/* Transaction Table */}
            <div className="overflow-hidden border border-gray-200 rounded-lg shadow">
                <table className="w-full text-left table-auto bg-white">
                    <thead className="bg-blue-100 text-gray-700 uppercase text-sm font-semibold">
                    <tr>
                        {["Ngày", "Tên DV", "Số tiền", "Trạng thái", "Thao tác"].map((header) => (
                            <th key={header} className="py-4 px-6">{header}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {orders.orders.length === 0 ? (
                        <tr>
                            <td colSpan="5" className="py-4 px-6 text-center text-gray-500">Không tìm thấy Order
                                nào
                            </td>
                        </tr>
                    ) : (
                        orders.orders?.map((order) => (
                            <tr key={order.id} className="border-b hover:bg-blue-50 transition">
                                <td className="py-4 px-6 text-gray-700">{new Date(order.created).toLocaleDateString()}</td>
                                <td className={`py-4 px-6 font-semibold`}>
                                    {order.serviceName}
                                </td>
                                <td className={`py-4 px-6 font-semibold ${order.status === 'SUCCESS' ? 'text-green-500' : 'text-red-500'}`}>
                                    {new Intl.NumberFormat('vi-VN', {
                                        style: 'currency',
                                        currency: 'VND'
                                    }).format(order.discountMoney)}
                                </td>
                                <td className="py-4 px-6">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                order.status === "SUCCESS"
                                                    ? "bg-green-100 text-green-600"
                                                    : order.status === "PENDING"
                                                        ? "bg-yellow-100 text-yellow-600"
                                                        : "bg-red-100 text-red-600"
                                            }`}
                                        >
                                            {order.status}
                                        </span>
                                </td>
                                <td className="py-4 px-6">
                                    <button
                                        className="flex items-center justify-center space-x-1 bg-blue-500 text-white px-3 py-1.5 rounded-lg hover:bg-blue-600 transition"
                                        onClick={() => handleViewDetails(order)}
                                    >
                                        <IoIosEye className="text-white"/>
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
    );
};

export default OrderList;