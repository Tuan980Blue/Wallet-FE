const AdminDeleteModal = ({ adminToDelete, handleDelete, handleClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-1/3">
                <h2 className="text-3xl font-semibold mb-6">Xác nhận xóa</h2>
                <p>Bạn có chắc chắn muốn xóa Admin <strong>{adminToDelete.name}</strong> không?</p>
                <div className="flex justify-end mt-6">
                    <button
                        className="bg-gray-500 text-white py-2 px-4 rounded-lg mr-4"
                        onClick={handleClose}
                    >
                        Hủy
                    </button>
                    <button
                        className="bg-red-600 text-white py-2 px-4 rounded-lg"
                        onClick={handleDelete}
                    >
                        Xóa
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminDeleteModal;
