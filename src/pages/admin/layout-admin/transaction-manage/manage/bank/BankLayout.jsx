import { Outlet } from "react-router-dom";
import NavbarBank from "./NavbarBank";

const BankLayout = () => {
    return (
        <div className="min-h-screen bg-gray-100 w-full">
            <div>
                <NavbarBank/>
            </div>

            <div className="container mx-auto p-4 pt-10">
                <Outlet />
            </div>
        </div>
    );
};

export default BankLayout;