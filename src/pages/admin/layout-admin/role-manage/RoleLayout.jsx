import RolesAdmin from "./RolesAdmin.jsx";
import RolesUser from "./RolesUser.jsx";
import RolesCoach from "./RolesCoach.jsx";
import {useQuery} from "@tanstack/react-query";
import {wGet} from "../../../../util/request.util.js";

const fetchRoles = async () => {
    const response = await wGet('/v1/permission/roles');
    const responseJson = await response.json() || [];
    return responseJson;
};

const RoleLayout = () => {

    const {data: roles, isLoading, isError} = useQuery(
        {
            queryKey: ['roles'],
            queryFn: fetchRoles,
            cacheTime: 5 * 60 * 1000,
            staleTime: 60 * 1000,
        }
    );

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error fetching roles. Please try again later.</div>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 p-8">
            <div className="max-w-7xl mx-auto">
                {/* Phần tiêu đề */}
                <h1 className="text-5xl text-center font-bold tracking-tight text-gray-900 mb-8">
                    Phân Quyền Hệ Thống
                </h1>
                <div className="min-h-screen bg-gray-100 p-6">
                    <div>
                        {/*Chia nhỏ Component rồi vào đây để dễ quản lý không code quá nhiều trong Layout này.*/}
                        <RolesAdmin roles={roles}/>
                        <RolesCoach roles={roles}/>
                        <RolesUser roles={roles}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoleLayout;