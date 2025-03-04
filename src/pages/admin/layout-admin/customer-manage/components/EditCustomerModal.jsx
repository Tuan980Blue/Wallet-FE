import { useState, useEffect } from 'react';
import { queryClient } from "../../../../../modules/cache.js";
import {wDelete, wPut} from "../../../../../util/request.util.js";

const EditCustomerModal = ({ customer, onClose, toast = { toast } }) => {
    const [editedCustomer, setEditedCustomer] = useState({ ...customer });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [validationErrors, setValidationErrors] = useState({});
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

    useEffect(() => {
        setEditedCustomer({ ...customer });
    }, [customer]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedCustomer({ ...editedCustomer, [name]: value });
    };

    // Handle form submission for editing
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setValidationErrors({});

        try {
            //const response = await wPut(`/v1/user/${customer.id}`, editedCustomer);
            queryClient.invalidateQueries({ queryKey: ['customers-admin'] });
            onClose();
            toast.success('Cập nhật thành công');
            setIsLoading(false);
        } catch (err) {
            setValidationErrors(err.response.data.message);
        }
    };

    // Handle delete customer
    const handleDelete = async () => {
        setIsLoading(true);
        setError(null);
        try {
            //const response = await wDelete(`/v1/user/${customer.id}`);
            //queryClient.invalidateQueries({ queryKey: ['customers-admin'] });
            onClose();
            toast.info('Tính năng đang được phát triển');
            setIsLoading(false);
        } catch (err) {
            setError(err.response.data.message);
        }
    };

    const confirmDelete = () => {
        setShowDeleteConfirmation(true);
    };

    const cancelDelete = () => {
        setShowDeleteConfirmation(false);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 space-y-6 transform transition-all scale-105 hover:scale-100 duration-300">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Chỉnh sửa khách hàng</h2>

                {error && <p className="text-red-600 text-center">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name input */}
                    <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">First
                            Name:</label>
                        <input
                            id="lastName"
                            type="text"
                            name="lastName"
                            value={editedCustomer.firstName}
                            onChange={handleChange}
                            className={`w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${validationErrors.lastName ? 'border-red-500' : ''}`}
                            placeholder="Nhập First Name"
                        />
                        {validationErrors.firstName &&
                            <p className="text-red-500 text-sm mt-1">{validationErrors.firstName}</p>}
                    </div>
                    <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last
                            Name:</label>
                        <input
                            id="lastName"
                            type="text"
                            name="lastName"
                            value={editedCustomer.lastName}
                            onChange={handleChange}
                            className={`w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${validationErrors.lastName ? 'border-red-500' : ''}`}
                            placeholder="Nhập Last Name"
                        />
                        {validationErrors.lastName &&
                            <p className="text-red-500 text-sm mt-1">{validationErrors.lastName}</p>}
                    </div>

                    {/* Date of Birth input */}
                    <div>
                        <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-1">Ngày Sinh:</label>
                        <input
                            id="dob"
                            type="date"
                            name="dob"
                            value={editedCustomer.dob || ''}
                            onChange={handleChange}
                            className={`w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${validationErrors.dob ? 'border-red-500' : ''}`}
                        />
                        {validationErrors.dob && <p className="text-red-500 text-sm mt-1">{validationErrors.dob}</p>}
                    </div>

                    {/* Gender input */}
                    <div>
                        <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">Giới
                            Tính:</label>
                        <select
                            id="gender"
                            name="gender"
                            value={editedCustomer.gender ? 'Nam' : 'Nữ'}
                            onChange={handleChange}
                            className={`w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${validationErrors.gender ? 'border-red-500' : ''}`}
                        >
                            <option value="Nam">Nam</option>
                            <option value="Nữ">Nữ</option>
                        </select>
                        {validationErrors.gender &&
                            <p className="text-red-500 text-sm mt-1">{validationErrors.gender}</p>}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-4 mt-6">
                        <button
                            onClick={onClose}
                            className="w-full py-3 rounded-lg bg-gray-600 text-white hover:bg-gray-700 focus:ring-4 focus:ring-gray-200"
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full py-3 rounded-lg text-white font-medium ${isLoading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-200'}`}
                        >
                            {isLoading ? 'Đang lưu...' : 'Lưu'}
                        </button>
                    </div>
                </form>

                {/* Delete button */}
                <div className="mt-4 text-center">
                    <button
                        onClick={confirmDelete}
                        disabled={isLoading}
                        className={`w-full py-3 rounded-lg text-white font-medium ${isLoading ? 'bg-gray-400' : 'bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-200'}`}
                    >
                        {isLoading ? 'Đang xóa...' : 'Xóa Customer'}
                    </button>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteConfirmation && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
                    <div
                        className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 space-y-6 transform transition-all scale-105 hover:scale-100 duration-300">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">Xác nhận xóa</h2>
                        <p className="text-gray-800 text-center">Bạn có chắc chắn muốn xóa khách hàng này?</p>
                        <div className="flex space-x-4 mt-4">
                            <button
                                onClick={cancelDelete}
                                className="w-full py-3 rounded-lg bg-gray-600 text-white hover:bg-gray-700 focus:ring-4 focus:ring-gray-200"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={isLoading}
                                className={`w-full py-3 rounded-lg text-white font-medium ${isLoading ? 'bg-gray-400' : 'bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-200'}`}
                            >
                                {isLoading ? 'Đang xóa...' : 'Xóa'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditCustomerModal;
