import {useState} from 'react';
import RoleForm from "./components/RoleForm.jsx";
import RolesList from "./components/RolesList.jsx";
import EditRoleModal from "./components/EditRoleModal.jsx";
import {useQuery} from "@tanstack/react-query";
import {toast, ToastContainer} from "react-toastify";
import {wGet} from "../../../../util/request.util.js";

const fetchRoles = async () => {
    const response = await wGet('/v1/permission/roles');
    const responseJson = await response.json() || [];
    return responseJson;
};

const RolesManager = () => {

    const {data: roles, isLoading, isError} = useQuery(
        {
            queryKey: ['roles'],
            queryFn: fetchRoles,
            cacheTime: 5 * 60 * 1000,
            staleTime:  60 * 1000,
        }
    );

    const [editingRole, setEditingRole] = useState(null);

    const handleAddRole = (name, description) => {
        if (name.trim() && description.trim()) {
            const newRole = {name, description};
            // Gửi request tạo mới role
            toast.info('Đang tạo mới vai trò...');
        }
    };

    const handleEditRole = (role) => {
        setEditingRole(role);
    };

    const handleSaveEdit = (updatedRole) => {
        // Gửi request cập nhật role
        toast.info('Đang cập nhật vai trò...');
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error fetching roles. Please try again later.</div>;
    }

    return (
        <div className="p-6 bg-white shadow-lg rounded-lg mb-10">
            <h1 className="text-2xl text-center font-bold text-gray-800 mb-2">Quản Lý Vai Trò</h1>
            <RoleForm onAddRole={handleAddRole} roles={roles}/>
            <RolesList roles={roles} onEditRole={handleEditRole}/>
            {editingRole && (
                <EditRoleModal
                    role={editingRole}
                    onSave={handleSaveEdit}
                    onCancel={() => setEditingRole(null)}
                />
            )}
            <ToastContainer/>
        </div>
    );
};

export default RolesManager;
