import { NavLink, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { Button } from '@mui/material';

const NavbarWallet = () => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate("all");
    }, [navigate]);

    return (
        <div className="w-full">
            <nav className="bg-gradient-to-r from-blue-500 to-indigo-600 w-full p-4 shadow-lg">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex items-center justify-center">
                        <Button 
                            variant="text" 
                            onClick={() => navigate("/admin1/transaction-manage")} 
                            startIcon={<IoArrowBackCircleSharp />}
                            style={{ color: "white", fontSize: "2.5rem" }} 
                        />
                        <div className="text-white text-2xl font-semibold tracking-wider ml-4">
                            Giao dịch ví
                        </div>
                    </div>

                    <div className="flex space-x-4">
                        <NavLink to="all">
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
                                    Các giao dịch
                                </Button>
                            )}
                        </NavLink>
                        <NavLink to="transfer">
                            {({ isActive }) => (
                                <Button
                                    variant="contained"
                                    style={{
                                        color: isActive ? '#D1FAD1' : 'white',
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
                                    Danh sách chuyển tiền
                                </Button>
                            )}
                        </NavLink>
                        <NavLink to="gym-cost">
                            {({ isActive }) => (
                                <Button
                                    variant="contained"
                                    style={{
                                        color: isActive ? '#D1FAD1' : 'white',
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
                                    Danh sách nạp tiền
                                </Button>
                            )}
                        </NavLink>
                        <NavLink to="gym-statistical">
                            {({ isActive }) => (
                                <Button
                                    variant="contained"
                                    style={{
                                        color: isActive ? '#D1FAD1' : 'white',
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
                                    Thống Kê
                                </Button>
                            )}
                        </NavLink>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default NavbarWallet;
