import PropTypes from 'prop-types';

const Modal = ({isOpen, onClose, children}) => {
    if (!isOpen) return null;

    const handleOverlayClick = (e) => {
        // Kiểm tra xem người dùng có nhấn vào overlay không
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out z-50"
            onClick={handleOverlayClick} // Đóng modal khi nhấn bên ngoài
        >
            <div
                className="bg-white rounded-lg shadow-xl max-w-3xl w-full transform transition-transform duration-300 ease-in-out scale-100">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-5 text-red-500 hover:text-red-600 transition-colors duration-200 text-4xl rounded-full focus:outline-none focus:ring-2 focus:ring-gray-300" // Làm cho nút lớn hơn
                    aria-label="Close Modal"
                >
                    &times; {/* Nút đóng */}
                </button>
                <div className="modal-content mt-4">
                    {children}
                </div>
            </div>
        </div>
    );
};

// PropTypes để kiểm tra kiểu dữ liệu
Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};

export default Modal;
