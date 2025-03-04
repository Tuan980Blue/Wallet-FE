import { Outlet } from "react-router-dom";
import NavbarCare from "./NavbarCare";


const CareCustomerLayout = () => {
    return (
        <div className="min-h-screen bg-gray-100 w-full">
            <div>
                <NavbarCare/>
            </div>

            <div className="container mx-auto p-4">
                <Outlet />
            </div>
        </div>
    );
};

export default CareCustomerLayout;