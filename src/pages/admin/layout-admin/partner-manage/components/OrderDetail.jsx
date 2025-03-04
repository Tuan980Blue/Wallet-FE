import { useRef, useEffect } from "react";
import { FaRegWindowClose } from "react-icons/fa";

const OrderDetail = ({ transaction, onClose }) => {
    const modalRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);

    if (!transaction) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 transition-opacity">
            <div
                ref={modalRef}
                className="bg-white p-8 rounded-2xl shadow-2xl max-w-xl w-full relative animate-fadeIn"
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors"
                >
                    <FaRegWindowClose className="h-6 w-6" />
                </button>

                {/* Title */}
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center border-b pb-4">
                    Chi Tiết Order
                </h2>

                {/* Transaction Details Content */}
                <div className="space-y-4">
                    <div className="flex justify-between">
                        <span className="text-gray-700 font-semibold">ID:</span>
                        <span className="text-gray-800">{transaction.id}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-700 font-semibold">Số Tiền:</span>
                        <span className="text-gray-800">{transaction.money.toLocaleString()} VND</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-700 font-semibold">Trạng Thái:</span>
                        <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                                transaction.status === "SUCCESS"
                                    ? "bg-green-200 text-green-800"
                                    : transaction.status === "PENDING"
                                        ? "bg-yellow-200 text-yellow-800"
                                        : "bg-red-200 text-red-800"
                            }`}
                        >
                            {transaction.status}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-700 font-semibold">Dịch Vụ:</span>
                        <span className="text-gray-800">{transaction.serviceName}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-700 font-semibold">Ngày Tạo:</span>
                        <span className="text-gray-800">
                            {new Date(transaction.created).toLocaleString()}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-700 font-semibold">Ngày Cập Nhật:</span>
                        <span className="text-gray-800">
                            {new Date(transaction.updated).toLocaleString()}
                        </span>
                    </div>
                </div>

                {/* Application Details */}
                {transaction.application && (
                    <div className="mt-6 bg-gray-100 p-4 rounded-lg">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Thông Tin Ứng Dụng</h3>
                        <div className="flex justify-between">
                            <span className="text-gray-700 font-semibold">ID Ứng Dụng:</span>
                            <span className="text-gray-800">{transaction.application.id}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-700 font-semibold">Tên Ứng Dụng:</span>
                            <span className="text-gray-800">{transaction.application.name}</span>
                        </div>
                    </div>
                )}

                {/* Close Button */}
                <div className="mt-8 text-center">
                    <button
                        onClick={onClose}
                        className="bg-red-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-red-600 transition-colors"
                    >
                        Đóng
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderDetail;