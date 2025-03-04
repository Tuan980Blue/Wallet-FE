import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ViewCustomerModal from './ViewCustomerModal';
import EditCustomerModal from './EditCustomerModal';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const CustomerList = ({ customers }) => {
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const navigate = useNavigate();

    const openViewModal = (customer) => {
        setSelectedCustomer(customer);
        setIsViewModalOpen(true);
    };

    const openEditModal = (customer) => {
        setSelectedCustomer(customer);
        setIsEditModalOpen(true);
    };

    const closeModal = () => {
        setSelectedCustomer(null);
        setIsViewModalOpen(false);
        setIsEditModalOpen(false);
    };

    const handleTransaction = (email) => {
        navigate(`/admin1/user-transactions/${email}`);
    };

    return (
        <div className="overflow-x-auto bg-white shadow-lg rounded-xl p-6 mb-6">
            <h2 className="text-xl font-bold text-center text-gray-800 mb-4">Danh Sách Khách Hàng</h2>
            <table className="min-w-full table-auto border-collapse">
                <thead>
                <tr className="bg-gradient-to-r from-blue-50 to-indigo-100 text-indigo-700 font-semibold">
                    {[ 'Email', 'Họ và Tên', 'Ngày Sinh', 'Giới Tính', 'Trạng Thái', 'Hành Động'].map((heading) => (
                        <th key={heading} className="px-6 py-4 text-left">{heading}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {customers.map((customer) => (
                    <tr
                        key={customer.id}
                        className="border-b hover:bg-indigo-50 transition-all duration-200"
                    >
                        <td className="px-6 py-4 text-gray-700 font-medium">{customer.email}</td>
                        <td className="px-6 py-4 text-gray-700">{customer.firstName +" "+ customer.lastName}</td>
                        <td className="px-6 py-4 text-gray-700">
                            {customer.dob ? `${customer.dob[2]}/${customer.dob[1]}/${customer.dob[0]}` : 'Chưa có'}
                        </td>
                        <td className="px-6 py-4 text-gray-700">{customer.gender ? 'Nam' : 'Nữ'}</td>
                        <td className="px-6 py-4">
                                <span
                                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                        customer.isActive ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                                    }`}
                                >
                                    {customer.isActive ? 'Hoạt động' : 'Không hoạt động'}
                                </span>
                        </td>
                        <td className="px-6 py-4">
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => openViewModal(customer)}
                                    className="p-2 text-sm rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition duration-200"
                                >
                                    Xem chi tiết
                                </button>
                                <button
                                    onClick={() => handleTransaction(customer.email)}
                                    className="p-2 text-sm rounded-lg bg-cyan-500 text-white hover:bg-cyan-600 transition duration-200"
                                >
                                    Xem giao dịch
                                </button>
                                <button
                                    onClick={() => openEditModal(customer)}
                                    className="p-2 text-sm rounded-lg bg-yellow-500 text-white hover:bg-yellow-600 transition duration-200"
                                >
                                    Chỉnh sửa
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* View Customer Modal */}
            {isViewModalOpen && (
                <ViewCustomerModal
                    customer={selectedCustomer}
                    onClose={closeModal}
                />
            )}

            {/* Edit Customer Modal */}
            {isEditModalOpen && (
                <EditCustomerModal
                    customer={selectedCustomer}
                    onClose={closeModal}
                    toast={toast}
                />
            )}

            <ToastContainer />
        </div>
    );
};

export default CustomerList;