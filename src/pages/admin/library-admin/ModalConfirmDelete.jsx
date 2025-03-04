
const ModalConfirmation = ({ isOpen, onClose, onConfirm, employeeName }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
                <h3 className="text-lg font-semibold mb-4">Xác Nhận Xóa Nhân Viên</h3>
                <p>Bạn có chắc chắn muốn xóa <strong>{employeeName}</strong> ra khỏi hệ thống không?</p>
                <div className="flex justify-end mt-4 space-x-2">
                    <button
                        onClick={onConfirm}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                    >
                        Xóa
                    </button>
                    <button
                        onClick={onClose}
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
                    >
                        Hủy
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalConfirmation;