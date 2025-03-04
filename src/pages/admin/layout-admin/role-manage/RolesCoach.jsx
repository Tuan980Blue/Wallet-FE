import {useEffect, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {toast} from "react-toastify";
import {queryClient} from "../../../../modules/cache.js";
import SearchBar from "./components/SearchBar.jsx";
import AdminTable from "./components/AdminTable.jsx";
import AdminEditModal from "./components/AdminEditModal.jsx";
import AdminDeleteModal from "./components/AdminDeleteModal.jsx";
import {wGet, wPost} from "../../../../util/request.util.js";

const fetchAdmins = async () => {
    const response = await wGet('/v1/permission/roles/3');
    const responseJson = await response.json();
    return responseJson?.users || [];
};

const updateAdminRole = async (userId, roleId) => {
    const response = await wPost('/v1/permission/roles/assign', {
        "userId": userId,
        "roleId": roleId
    });
    return response;
};

const RolesCoach = ({ roles }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [editingAdmin, setEditingAdmin] = useState(null);
    const [newRole, setNewRole] = useState('');
    const [adminToDelete, setAdminToDelete] = useState(null);
    const [filteredAdmins, setFilteredAdmins] = useState([]);

    const { data: admins, isLoading, isError } = useQuery(
        {
            queryKey: ['coaches'],
            queryFn: fetchAdmins,
            cacheTime: 5 * 60 * 1000,
            staleTime: 10 * 60 * 1000,
            refetchOnWindowFocus: false, // Không refetch khi chuyển tab
        }
    );

    useEffect(() => {
        const filtered = (admins || []).filter((admin) =>
            admin.lastName?.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredAdmins(filtered);
    }, [searchTerm, admins]);

    const handleEdit = (admin) => {
        setEditingAdmin(admin);
        setNewRole(admin.role);
    };

    const handleSave = () => {
        if (newRole) {
            // Lấy roleId từ danh sách roles
            const selectedRole = roles.find(role => role.name === newRole);
            // Gọi API để cập nhật quyền
            try {
                const response = updateAdminRole(editingAdmin.id, selectedRole.id);

                console.log('Cập nhật quyền thành công', response);

                setTimeout(() => {
                    queryClient.invalidateQueries('coaches');
                    queryClient.invalidateQueries('users');
                    queryClient.invalidateQueries('admins');
                    setEditingAdmin(null);
                    toast.info('Cập nhật quyền thành công');
                }, 2000);

            } catch (error) {
                console.error('Cập nhật quyền thất bại', error);
                toast.error('Cập nhật quyền thất bại');
            }
        }
    };

    const handleDelete = () => {
        if (adminToDelete) {
            // Gửi request xóa admin
            toast.info('Đang xóa admin...');
            setAdminToDelete(null);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error fetching admins. Please try again later.</div>;
    }

    return (
        <div className="max-w-7xl mx-auto p-6 bg-gray-50">
            <h1 className="text-4xl font-bold text-green-600 mb-4 text-center">
                Danh sách Huấn Luyện Viên
            </h1>

            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>

            <AdminTable admins={admins} filteredAdmins={filteredAdmins} handleEdit={handleEdit}
                        handleDelete={setAdminToDelete} roleName={"HLV"}/>

            {editingAdmin && (
                <AdminEditModal
                    editingAdmin={editingAdmin}
                    roles={roles}  /* Truyền roles vào AdminEditModal */
                    newRole={newRole}
                    setNewRole={setNewRole}
                    handleSave={handleSave}
                    handleClose={() => setEditingAdmin(null)}
                />
            )}

            {adminToDelete && (
                <AdminDeleteModal
                    adminToDelete={adminToDelete}
                    handleDelete={handleDelete}
                    handleClose={() => setAdminToDelete(null)}
                />
            )}
        </div>
    );
};

export default RolesCoach;
