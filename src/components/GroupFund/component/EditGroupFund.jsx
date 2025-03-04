// src/component/EditGroupFund.jsx
import { useEffect, useState } from 'react';
import { wPost } from "../../../util/request.util.js";
import {Confirm} from "react-admin";
import {useQueryClient} from "@tanstack/react-query";
import {TextField} from "@mui/material";
import {SyncLoader} from "react-spinners";
import {toast} from "react-toastify";

const EditGroupFund = ({ fundData, onClose, fundId }) => {
    const queryClient = useQueryClient();
    const [errors, setErrors] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        image: '',
        type: '',
        description: '',
        target: 0,
        targetDate: ''
    });

    useEffect(() => {
        if (fundData) {
            setFormData({
                name: fundData.name,
                image: fundData.image,
                type: fundData.type,
                description: fundData.description,
                target: fundData.target,
                targetDate: fundData.targetDate
            });
        }
    }, [fundData]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Reset lỗi của trường hiện tại khi người dùng nhập lại
        setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));

        // Chỉ định dạng lại khi mục tiêu được cập nhật
        if (name === 'target') {
            const numberValue = parseFloat(value.replace(/\./g, '').replace(',', '.'));
            setFormData((prev) => ({
                ...prev,
                [name]: isNaN(numberValue) ? 0 : numberValue
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value
            }));
        }
    };

// Hàm định dạng số
    const formatNumber = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };

// Hàm kiểm tra tính hợp lệ
    const validateFormData = () => {
        const { name, target, targetDate , description} = formData;
        const newErrors = {};

        // Kiểm tra không bỏ trống tên quỹ
        if (!name.trim()) {
            newErrors.name = "Tên quỹ không được bỏ trống.";
        } else if (name.length < 5) {
            newErrors.name = "Tên quỹ phải có ít nhất 5 ký tự.";
        } else if (name.length > 50) {
            newErrors.name = "Tên quỹ phải dưới 50 ký tự.";
        } else if (/[^a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềểếìỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ\s]/.test(name)) {
            newErrors.name = "Tên quỹ không được chứa ký tự đặc biệt.";
        }

        // Kiểm tra số tiền mục tiêu
        if (target < 0) {
            newErrors.target = "Số tiền không hợp lệ.";
        } else {
            if (target === 0) {
                newErrors.target = "Mục tiêu không được bằng 0.";
            } else if (target < 10000) {
                newErrors.target = "Mục tiêu phải lớn hơn hoặc bằng 10,000.";
            }
            if (isNaN(target)) {
                newErrors.target = "Mục tiêu không hợp lệ.";
            }
            if (target.toString().includes(',')) {
                newErrors.target = "Mục tiêu không hợp lệ.";
            }
            if (fundData.wallet && target < fundData.wallet.balance) {
                newErrors.target = "Mục tiêu không được nhỏ hơn số dư quỹ hiện tại.";
            }
        }

        if (description.length > 200) {
            newErrors.description = "Mô tả quỹ phải dưới 200 ký tự.";
        }

        // Kiểm tra ngày hạn không được là ngày quá khứ
        const currentDate = new Date().setHours(0, 0, 0, 0); // Ngày hiện tại, không có thời gian
        const selectedDate = new Date(targetDate).setHours(0, 0, 0, 0);

        if (targetDate && selectedDate < currentDate) {
            newErrors.targetDate = "Ngày hạn không được là ngày quá khứ.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateFormData()) {
            setIsModalOpen(true);
        }
    };

    const confirmUpdate = async (e) => {
        e.preventDefault();
        setIsModalOpen(false);
        setLoading(true);
        try {
            const response = await wPost(`/v1/group-fund/${fundId}`, formData);
            setTimeout(() => {
                queryClient.invalidateQueries({queryKey: ['groupFund', fundId]});
                setLoading(false);
                toast.success(response.message);
                onClose();
            }, 3000);
        } catch (error) {
            console.error("Error updating group fund:", error);
            alert("Có lỗi xảy ra khi cập nhật quỹ.");
        } finally {
            setIsModalOpen(false); // Đóng modal xác nhận
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 backdrop-blur-md">
            <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-xl transform transition-all duration-300 ease-in-out">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
                    ✨ Chỉnh Sửa Quỹ ✨
                </h2>
                <form onSubmit={handleSubmit} className="space-y-3">
                    <div>
                        <label className="block text-sm font-semibold text-gray-600">
                            Tên Quỹ:
                        </label>
                        <TextField
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="mt-2 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-600">
                            Loại:
                        </label>
                        <input
                            type="text"
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="mt-2 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-600">
                            Mô Tả:
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="mt-2 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                            rows="2"
                        ></textarea>
                        {errors.description && (
                            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-600">
                            Mục Tiêu:
                        </label>
                        <input
                            type="text"
                            name="target"
                            value={formatNumber(formData.target)}
                            onChange={handleChange}
                            required
                            className="mt-2 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                        />
                        {errors.target && (
                            <p className="text-red-500 text-sm mt-1">{errors.target}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-600">
                            Ngày Hạn:
                        </label>
                        <input
                            type="date"
                            name="targetDate"
                            value={formData.targetDate}
                            onChange={handleChange}
                            required
                            className="mt-2 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                        />
                        {errors.targetDate && (
                            <p className="text-red-500 text-sm mt-1">{errors.targetDate}</p>
                        )}
                    </div>
                    <div className="flex justify-center mt-8 space-x-4">
                        {loading ? (
                            <div>
                                <SyncLoader
                                    color="#00ff16"
                                    margin={5}
                                    size={15}
                                />
                            </div>
                        ) : (
                            <>
                                <button
                                    type="submit"
                                    className="w-1/2 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-xl py-3 shadow-lg hover:shadow-xl hover:from-blue-500 hover:to-blue-400 transition-all duration-300 transform hover:-translate-y-0.5"
                                >
                                    Cập Nhật
                                </button>
                                <button
                                    type="button"
                                    className="w-1/2 bg-gray-200 text-gray-700 font-semibold rounded-xl py-3 shadow-lg hover:shadow-xl hover:bg-gray-300 transition-all duration-300 transform hover:-translate-y-0.5"
                                    onClick={onClose}
                                >
                                    Đóng
                                </button>
                            </>
                        )}
                    </div>
                </form>
    <Confirm
        isOpen={isModalOpen}
        title={`Nhóm Quỹ: ${formData.name}`}
        content="Bạn có chắc chắn muốn cập nhật không?"
        cancel="Quay lại"
        confirm="Xác nhận"
        onConfirm={confirmUpdate}
        onClose={closeModal}
    />
</div>
</div>
)
    ;
};

export default EditGroupFund;