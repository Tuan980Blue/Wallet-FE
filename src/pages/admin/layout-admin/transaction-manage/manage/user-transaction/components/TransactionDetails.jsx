import { useRef, useEffect } from "react";
import { FaRegWindowClose } from "react-icons/fa";

const TransactionDetails = ({ transaction, onClose }) => {
    const modalRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        // Clean up the event listener on component unmount
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);

    if (!transaction) return null;

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
            <div ref={modalRef} className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                >
                    <FaRegWindowClose className="h-6 w-6" />
                </button>

                {/* Transaction Details Title */}
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Chi Tiết Giao Dịch</h2>

                {/* Transaction Details Content */}
                <div className="space-y-2">
                    <p className="text-gray-700">
                        <strong>ID Giao Dịch:</strong> {transaction.id}
                    </p>
                    <p className="text-green-500">
                        <strong className={"text-gray-700 mr-2"}>Số Tiền:</strong>
                        {transaction.amount.toLocaleString()} VND
                    </p>
                    <p className="text-gray-700">
                        <strong>Trạng Thái:</strong>
                        <span
                            className={`ml-2 px-2 py-1 rounded-full text-sm font-medium ${
                                transaction.status === "SUCCESS"
                                    ? "bg-green-100 text-green-600"
                                    : transaction.status === "PENDING"
                                        ? "bg-yellow-100 text-yellow-600"
                                        : "bg-green-100 text-green-600"
                            }`}
                        >
                            {transaction?.status || "Thành công"}
                        </span>
                    </p>
                    <p className="text-gray-700">
                        <strong>Loại:</strong> {transaction.flowType}
                    </p>
                    <p className="text-gray-700">
                        <strong>Mô Tả:</strong> {transaction?.message || "Không có mô tả"}
                    </p>
                    <p className="text-gray-700">
                        <strong>Ngày Tạo:</strong> {new Date(transaction.created).toLocaleString()}
                    </p>

                    {/* Receiver Information */}
                    {transaction.receiverName && (
                        <div>
                            <div className="mt-4 border-t border-gray-200">
                                <div className={"bg-gray-100 rounded-xl px-4 py-2"}>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Thông Tin Người Nhận</h3>
                                    <p className="text-gray-700">
                                        <strong>Tên:</strong> {transaction?.receiverName || "Chưa cập nhật"}
                                    </p>
                                    <p className="text-gray-700">
                                        <strong>Email:</strong> {transaction.receiver?.email || "Chưa cập nhật"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                    {/* Sender Information for IN transactions */}
                    {transaction.senderName && (
                        <div>
                            <div className="mt-4 border-t border-gray-200">
                                <div className="bg-gray-100 rounded-xl px-4 py-2">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Thông Tin Người Chuyển</h3>
                                    <p className="text-gray-700">
                                        <strong>Tên:</strong> {transaction.senderName || "Chưa cập nhật"}
                                    </p>
                                    <p className="text-gray-700">
                                        <strong>Email:</strong> {transaction.sender?.email || "Chưa cập nhật"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Close Button */}
                <div className="mt-6 text-right">
                    <button
                        onClick={onClose}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                    >
                        Đóng
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TransactionDetails;
