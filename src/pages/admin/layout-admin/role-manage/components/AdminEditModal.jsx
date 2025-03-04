import { Avatar } from '@mui/material';

const AdminEditModal = ({ editingAdmin, roles, newRole, setNewRole, handleSave, handleClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-xl shadow-xl w-full sm:w-1/3 max-w-md">
                <div className="flex items-center mb-6">
                    {/* Avatar Section */}
                    <Avatar
                        alt={editingAdmin.lastName}
                        src={editingAdmin.avatarUrl || '/avatarT.png'}
                        sx={{width: 90, height: 90, marginRight: 2}}
                    />
                    <div>
                        <h2 className="text-3xl font-semibold text-gray-800">{editingAdmin.lastName}</h2>
                        <p className="text-gray-600">{editingAdmin.email || "tuananh21@gmail.com"}</p>
                    </div>
                </div>

                {/* Admin Role Selection */}
                <div className="mb-6">
                    <label htmlFor="adminRole" className="block text-gray-700 font-medium mb-2">Chọn quyền mới</label>
                    <select
                        id="adminRole"
                        value={newRole}
                        onChange={(e) => setNewRole(e.target.value)}
                        className="w-full p-4 border-2 border-emerald-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 transition duration-200"
                    >
                        {/* Option mặc định "Tất Cả" */}
                        <option value="Tất Cả">Xem Tất Cả</option>
                        {/* Các option quyền */}
                        {roles.map((role) => (
                            <option key={role.id} value={role.name}>
                                {role.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-4">
                    <button
                        className="bg-gray-300 text-gray-700 py-2 px-6 rounded-lg hover:bg-gray-400 transition duration-300"
                        onClick={handleClose}
                    >
                        Hủy
                    </button>
                    <button
                        className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                        onClick={handleSave}
                    >
                        Cập Nhật
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminEditModal;
