import {useEffect, useState} from 'react';
import SearchBar from "./components/SearchBar.jsx";
import RolesManager from "./RolesManager.jsx";
import AdminTable from "./components/AdminTable.jsx";
import AdminEditModal from "./components/AdminEditModal.jsx";
import AdminDeleteModal from "./components/AdminDeleteModal.jsx";
import {useQuery} from "@tanstack/react-query";
import {toast} from "react-toastify";
import {queryClient} from "../../../../modules/cache.js";
import {wGet, wPost} from "../../../../util/request.util.js";

// Fetch danh sách admin theo vai trò
const fetchAdmins = async () => {
    const response = await wGet('/v1/permission/roles/2');
    const responseJson = await response.json();
    return responseJson?.users || [];
};

// Fetch danh sách roles
const fetchRoles = async () => {
    const response = await wGet('/v1/permission/roles');
    const responseJson = await response.json() || [];
    return responseJson;
};

// Cập nhật quyền admin
const updateAdminRole = async (adminId, roleId) => {
    const response = await wPost('/v1/permission/roles/assign', {
        "userId": adminId,
        "roleId": roleId
    });
    return response;
};

const RolesAdmin = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [editingAdmin, setEditingAdmin] = useState(null);
    const [newRole, setNewRole] = useState('');
    const [adminToDelete, setAdminToDelete] = useState(null);
    const [isRolesManagerOpen, setIsRolesManagerOpen] = useState(false);
    const [filteredAdmins, setFilteredAdmins] = useState([]);
    const [roles, setRoles] = useState([]);

    // Fetch danh sách admin
    const {data: admins, isLoading: isAdminsLoading, isError: isAdminsError} = useQuery(
        {
            queryKey: ['admins'],
            queryFn: fetchAdmins,
            cacheTime: 5 * 60 * 1000,
            staleTime: 10 * 60 * 1000,
            refetchOnWindowFocus: false, // Không refetch khi chuyển tab
        }
    );

    // Fetch danh sách roles
    const {data: rolesData, isLoading: isRolesLoading, isError: isRolesError} = useQuery(
        {
            queryKey: ['roles'],
            queryFn: fetchRoles,
            cacheTime: 5 * 60 * 1000,
            staleTime: 10 * 60 * 1000,
            refetchOnWindowFocus: false, // Không refetch khi chuyển tab
        }
    );

    useEffect(() => {
        setRoles(rolesData || []);
    }, [rolesData]);

    useEffect(() => {
        const filtered = (admins || []).filter((admin) =>
            admin.lastName?.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredAdmins(filtered);
    }, [searchTerm, admins]);

    const handleEdit = (admin) => {
        setEditingAdmin(admin);
        setNewRole(admin.role); // Gán giá trị vai trò cũ vào state
    };

    const handleSave = () => {
        if (newRole) {
            // Tìm roleId từ danh sách roles
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

    const toggleRolesManager = () => {
        setIsRolesManagerOpen((prev) => !prev);
    };

    if (isAdminsLoading || isRolesLoading) {
        return <div>Loading...</div>;
    }

    if (isAdminsError || isRolesError) {
        return <div>Error fetching data. Please try again later.</div>;
    }

    return (
        <div className="max-w-7xl mx-auto px-6">
            <button
                onClick={toggleRolesManager}
                className={`py-2 px-6 rounded-lg text-white transition-all duration-300 mb-2 
                ${isRolesManagerOpen ? 'bg-gray-400 hover:bg-gray-500' : 'bg-emerald-500 hover:bg-emerald-600'}`}
            >
                {isRolesManagerOpen ? "Đóng Quản Lý Vai Trò" : "Quản Lý Vai Trò"}
            </button>
            {isRolesManagerOpen && <RolesManager />}

            <div className="max-w-7xl mx-auto p-6 bg-gray-50">
                <h1 className="text-4xl font-bold text-cyan-600 mb-4 text-center">
                    Danh sách Admin
                </h1>

                <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>

                <AdminTable admins={admins} filteredAdmins={filteredAdmins} handleEdit={handleEdit}
                            handleDelete={setAdminToDelete} roleName={"Admin"}/>
            </div>

            {editingAdmin && (
                <AdminEditModal
                    editingAdmin={editingAdmin}
                    roles={roles} // Truyền danh sách roles vào modal
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

export default RolesAdmin;
