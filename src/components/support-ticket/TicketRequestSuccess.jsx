const TicketRequestSuccess = ({ onClose }) => {
    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={onClose} // Đóng modal khi bấm vào overlay
        >
            <div 
                className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center relative"
                onClick={(e) => e.stopPropagation()} 
            >
                <div className="bg-green-500 p-4 rounded-full flex items-center justify-center mb-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-10 h-10 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path d="M9 16.2l-3.5-3.5L4 14l5 5L20 8l-1.5-1.5L9 16.2z" />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Thành công!</h2>
                <p className="mt-2 text-gray-600 text-center">
                    Yêu cầu của bạn đã được gửi thành công. <br />
                    Chúng tôi sẽ phản hồi sớm nhất có thể.
                </p>
                <button
                    onClick={onClose}
                    className="mt-6 px-6 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition duration-200"
                >
                    Đóng
                </button>
            </div>
        </div>
    );
};

export default TicketRequestSuccess;
