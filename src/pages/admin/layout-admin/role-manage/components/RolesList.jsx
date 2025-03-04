
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const roleDescriptions = {
    'ADMIN': 'Người quản trị hệ thống',
    'USER': 'Người dùng hệ thống',
    'HLV': 'Huấn luyện viên',
    'GUEST': 'Khách hành vãng lai',
};

const RolesList = ({ roles, onEditRole, onDeleteRole }) => {
    return (
        <div className="mb-6 px-6">
            <h2 className="text-3xl font-bold text-indigo-600 mb-6 text-center">Danh Sách Vai Trò</h2>

            {/* Table để hiển thị danh sách vai trò */}
            <div className="overflow-x-auto shadow-lg ">
                <table className="min-w-full bg-white border border-gray-200 rounded-2xl overflow-hidden">
                    <thead>
                    <tr className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white uppercase text-sm leading-normal shadow-md">
                        <th className="py-4 px-6 text-left">ID</th>
                        <th className="py-4 px-6 text-left">Tên Vai Trò</th>
                        <th className="py-4 px-6 text-left">Mô Tả</th>
                        <th className="py-4 px-6 text-left">Hành Động</th>
                    </tr>
                    </thead>

                    <tbody className="text-gray-700 text-sm font-medium">
                    {roles?.length > 0 ? (
                        roles.map((role) => (
                            <tr key={role.id}
                                className="border-b border-gray-200 hover:bg-gradient-to-r from-pink-50 to-yellow-50 transition-all duration-300">
                                <td className="py-4 px-6 text-left">{role.id}</td>
                                <td className="py-4 px-6 text-left">{role.name || "Super Admin"}</td>
                                <td className="py-4 px-6 text-left">
                                    {role?.description || roleDescriptions[role.name] || 'Không có mô tả'}
                                </td>
                                <td className="py-4 px-6 text-left flex space-x-3">
                                    {/* Nút Sửa */}
                                    <button
                                        className="bg-blue-500 text-white py-2 px-4 rounded-full shadow-lg hover:bg-blue-600 transition-all duration-300 flex items-center space-x-2"
                                        onClick={() => onEditRole(role)}
                                    >
                                        <FaEdit className="text-white"/>
                                        <span>Sửa</span>
                                    </button>

                                    {/* Nút Xóa */}
                                    <button
                                        className="bg-red-500 text-white py-2 px-4 rounded-full shadow-lg hover:bg-red-600 transition-all duration-300 flex items-center space-x-2"
                                        onClick={() => onDeleteRole(role.id)}
                                    >
                                        <FaTrashAlt className="text-white"/>
                                        <span>Xóa</span>
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="py-6 px-6 text-center text-gray-500 italic">
                                Không có vai trò nào.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RolesList;