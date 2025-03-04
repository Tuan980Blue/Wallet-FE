import { Outlet } from "react-router-dom";
import NavbarWallet from "./NavbarWallet";


const WalletLayout = () => {
    return (
        <div className="min-h-screen bg-gray-100 w-full">
            <div>
                <NavbarWallet/>
            </div>

            <div className="container mx-auto p-4 pt-10">
                <Outlet />
            </div>
        </div>
    );
};

export default WalletLayout;