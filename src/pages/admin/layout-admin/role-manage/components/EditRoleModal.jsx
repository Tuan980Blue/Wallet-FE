import { useState } from 'react';

const EditRoleModal = ({ role, onSave, onCancel }) => {
    const [name, setName] = useState(role.name);
    const [description, setDescription] = useState(role.description);

    const handleSave = () => {
        onSave({ ...role, name, description });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                <h2 className="text-2xl font-bold mb-4">Chỉnh Sửa Vai Trò</h2>

                <div className="mb-4">
                    <label className="block text-gray-700">Tên Vai Trò</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-2 border rounded-md focus:ring focus:ring-blue-200 focus:outline-none"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Mô Tả Vai Trò</label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-2 border rounded-md focus:ring focus:ring-blue-200 focus:outline-none"
                    />
                </div>

                <div className="flex justify-end">
                    <button
                        onClick={onCancel}
                        className="bg-gray-500 text-white py-2 px-4 rounded-md mr-2 hover:bg-gray-600"
                    >
                        Hủy
                    </button>
                    <button
                        onClick={handleSave}
                        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                    >
                        Lưu
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditRoleModal;
