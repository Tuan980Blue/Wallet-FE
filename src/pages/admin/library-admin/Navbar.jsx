import { Avatar } from "@material-tailwind/react";
import { useState } from "react";
import { FcApproval } from "react-icons/fc";
import { IoSettingsOutline } from "react-icons/io5";
import { HiOutlineLogout } from "react-icons/hi";
import { AiOutlineDashboard } from "react-icons/ai";
import {useAuth} from "../../../modules/hooks/useAuth.jsx";

const UserMenuItem = ({ link, text, icon }) => {
    return (
        <li className="flex items-center">
            <a
                href={link}
                className="flex items-center block px-4 py-2 text-gray-100 hover:text-green-400 transition-colors duration-200 rounded-md"
            >
                {icon && <span className="mr-2">{icon}</span>} {/* Hiển thị biểu tượng */}
                {text}
            </a>
        </li>
    );
};

const Navbar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const userName = useAuth().user?.fullName;

    return (
        <div className="fixed w-full z-30 flex bg-[#1E293B] p-4 items-center justify-between h-16 shadow-lg">
            <div className="logo ml-24 text-white font-bold text-xl transform ease-in-out duration-300 hover:scale-105">
                Admin Pro
            </div>
            <FcApproval />
            {/* SPACER */}
            <div className="grow h-full flex items-center justify-center" />
            <div className="flex-none h-full text-center flex items-center justify-center relative">
                <div className="flex items-center px-4" onClick={() => setDropdownOpen(!dropdownOpen)}>
                    <div className="flex-none">
                        <Avatar
                            src='/avatarH.png'
                            alt="avatar"
                            withBorder={true}
                            className="p-0.5 rounded-full border-emerald-400 cursor-pointer transition-transform transform hover:scale-110"
                        />
                    </div>
                    <div className={"flex flex-col justify-center items-start ml-2"}>
                        <div
                            className="hidden md:block text-sm md:text-md text-white font-semibold hover:underline cursor-pointer">
                            {userName || "Tuan Anh"}
                        </div>
                        <div className={"font-extralight text-sm text-gray-300"}>
                            #Admin
                        </div>
                    </div>
                </div>
                {/* Dropdown Menu */}
                {dropdownOpen && (
                    <ul className="absolute -right-5 mt-44 w-40 bg-[#1E293B] rounded-b-lg shadow-lg transition-opacity duration-300">
                        <UserMenuItem
                            link="/dashboard"
                            text="Dashboard"
                            icon={<AiOutlineDashboard />}
                        />
                        <UserMenuItem
                            link="/settings"
                            text="Settings"
                            icon={<IoSettingsOutline />}
                        />
                        <UserMenuItem
                            link="/sign-out"
                            text="Sign out"
                            icon={<HiOutlineLogout />}
                        />
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Navbar;
