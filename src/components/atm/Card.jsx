import { useState } from "react";
import { FaTrash } from 'react-icons/fa';

const Card = ({ cardNumber, cardHolder, expiryDate, bankName, onDelete }) => {
    const [hover, setHover] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const handleMouseEnter = () => {
        setHover(true);
    };

    const handleMouseLeave = () => {
        setHover(false);
    };

    const handleDelete = () => {
        setShowConfirm(true); // Hiển thị dialog xác nhận
    };

    const confirmDelete = () => {
        onDelete(cardNumber); // Gọi hàm onDelete với cardNumber
        setShowConfirm(false); // Ẩn dialog xác nhận sau khi xóa
    };

    const cancelDelete = () => {
        setShowConfirm(false); // Ẩn dialog xác nhận nếu hủy
    };

    return (
        <div
            className="w-full md:w-[400px] h-auto bg-[url('/ava.png')] rounded-xl shadow-md overflow-hidden p-5 relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="text-white text-center text-xl font-semibold mb-2">{bankName}</div>
            <div className="flex flex-col items-center">
                <div className="w-full h-24 rounded-xl flex items-center justify-center mb-2 relative bg-opacity-50">
                    <img src={"/chip.png"} alt="Chip" className="absolute top-2 left-4 w-10" />
                    <div className="text-white text-xl font-mono mt-5">{cardNumber}</div>
                </div>
                <div className="w-full flex justify-between text-white mt-4">
                    <div className="flex flex-col">
                        <span className="text-xs text-black">Expiry Date</span>
                        <span className="text-sm font-semibold">{expiryDate}</span>
                        <span className="text-md font-semibold">{cardHolder}</span>
                    </div>
                </div>
            </div>
            <div className="absolute bottom-2 right-2">
                <img src={"/Mastercard.png"} alt="MasterCard" className="w-12" />
            </div>
            {hover && (
                <div
                    className="absolute top-5 right-6 cursor-pointer text-white text-xl "
                    onClick={handleDelete}
                >
                    <FaTrash className={"text-red-400"} />
                </div>
            )}

            {showConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                    <div className="bg-white p-5 rounded-lg shadow-lg z-60">
                        <p className="text-lg mb-4">Bạn có chắc chắn muốn xóa thẻ này không?</p>
                        <div className="flex justify-end space-x-4">
                            <button
                                className="px-4 py-2 bg-red-500 text-white rounded"
                                onClick={confirmDelete}
                            >
                                Xóa
                            </button>
                            <button
                                className="px-4 py-2 bg-gray-300 rounded"
                                onClick={cancelDelete}
                            >
                                Hủy
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Card;
