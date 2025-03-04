import { NavLink, useNavigate } from "react-router-dom";
import { Button } from '@mui/material';

const NavbarCare = () => {
    const navigate = useNavigate();

    return (
        <div className="w-full">
            <nav className="bg-gradient-to-r from-blue-500 to-indigo-600 w-full p-4 shadow-lg">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex items-center justify-center"></div>
                    <div className="flex space-x-4">
                        <NavLink to="overview">
                            {({ isActive }) => (
                                <Button
                                    variant="contained"
                                    style={{
                                        color: isActive ? '#D1FAD1' : '#FFFFFF',
                                        backgroundImage: isActive 
                                            ? 'linear-gradient(to right, #34D399, #34D389)' 
                                            : 'none',
                                        backgroundColor: isActive ? 'transparent' : '#3B82F6',
                                        padding: "8px 16px",
                                        borderRadius: "8px",
                                        fontSize: "1rem",
                                        transition: "background-color 0.3s, transform 0.2s",
                                    }}
                                    className="hover:bg-green-400 transform hover:scale-105"
                                >
                                    Tổng Quan
                                </Button>
                            )}
                        </NavLink>
                        <NavLink to="request">
                            {({ isActive }) => (
                                <Button
                                    variant="contained"
                                    style={{
                                        color: isActive ? '#D1FAD1' : '#FFFFFF',
                                        backgroundImage: isActive
                                            ? 'linear-gradient(to right, #34D399, #34D389)'
                                            : 'none',
                                        backgroundColor: isActive ? 'transparent' : '#3B82F6',
                                        padding: "8px 16px",
                                        borderRadius: "8px",
                                        fontSize: "1rem",
                                        transition: "background-color 0.3s, transform 0.2s",
                                    }}
                                    className="hover:bg-green-400 transform hover:scale-105"
                                >
                                    Yêu cầu Khách Hàng
                                </Button>
                            )}
                        </NavLink>
                        <NavLink to="chat">
                            {({ isActive }) => (
                                <Button
                                    variant="contained"
                                    style={{
                                        color: isActive ? '#D1FAD1' : '#FFFFFF',
                                        backgroundImage: isActive
                                            ? 'linear-gradient(to right, #34D399, #34D389)'
                                            : 'none',
                                        backgroundColor: isActive ? 'transparent' : '#3B82F6',
                                        padding: "8px 16px",
                                        borderRadius: "8px",
                                        fontSize: "1rem",
                                        transition: "background-color 0.3s, transform 0.2s",
                                    }}
                                    className="hover:bg-green-400 transform hover:scale-105"
                                >
                                    Trao đổi
                                </Button>
                            )}
                        </NavLink>
                        <NavLink to="analytics">
                            {({ isActive }) => (
                                <Button
                                    variant="contained"
                                    style={{
                                        color: isActive ? '#D1FAD1' : '#FFFFFF',
                                        backgroundImage: isActive
                                            ? 'linear-gradient(to right, #34D399, #34D389)'
                                            : 'none',
                                        backgroundColor: isActive ? 'transparent' : '#3B82F6',
                                        padding: "8px 16px",
                                        borderRadius: "8px",
                                        fontSize: "1rem",
                                        transition: "background-color 0.3s, transform 0.2s",
                                    }}
                                    className="hover:bg-green-400 transform hover:scale-105"
                                >
                                    Phân Tích
                                </Button>
                            )}
                        </NavLink>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default NavbarCare;
