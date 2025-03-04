const AdminTable = ({ admins, filteredAdmins, handleEdit, handleDelete, roleName }) => {
    return (
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
            <thead>
            <tr className="bg-gray-100 text-gray-700 uppercase text-sm">
                <th className="py-4 px-6 text-left">ID</th>
                <th className="py-4 px-6 text-left">Tên</th>
                <th className="py-4 px-6 text-left">Ngày sinh</th>
                <th className="py-4 px-6 text-left">Email</th>
                <th className="py-4 px-6 text-left">Quyền</th>
                <th className="py-4 px-6 text-left">Hành động</th>
            </tr>
            </thead>
            <tbody className="text-gray-700 text-sm">
            {filteredAdmins.length > 0 ? (
                filteredAdmins.map((admin) => (
                    <tr key={admin.id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="py-4 px-6 text-left">{admin.id}</td>
                        <td className="py-4 px-6 text-left">{admin.lastName || "Không rõ"}</td>
                        <td className="py-4 px-6 text-left">{admin.dob || "Không rõ"}</td>
                        <td className="py-4 px-6 text-left">{admin.email || "tuananh21@gmail.com"}</td>
                        <td className="py-4 px-6 text-left">{roleName}</td>
                        <td className="py-4 px-6">
                            <button
                                className="bg-blue-500 text-white py-2 px-4 rounded-lg mr-2 hover:bg-blue-600 transition duration-300"
                                onClick={() => handleEdit(admin)}
                            >
                                Sửa
                            </button>
                            <button
                                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
                                onClick={() => handleDelete(admin)}
                            >
                                Xóa
                            </button>
                        </td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan="4" className="py-4 px-6 text-center text-gray-500">
                        Không tìm thấy người dùng nào
                    </td>
                </tr>
            )}
            </tbody>
        </table>
    );
};

export default AdminTable;