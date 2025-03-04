import { useState } from "react";

import {IoIosEye, IoIosEyeOff } from "react-icons/io";
import {FaRegCopy, FaToggleOff, FaToggleOn} from "react-icons/fa";
import {Confirm} from "react-admin";
import {wPost} from "../../../../../util/request.util.js";

const PartnerDetails = ({ partner }) => {
    // State to toggle visibility of the API key
    const [isApiKeyVisible, setIsApiKeyVisible] = useState(false);
    const [copySuccess, setCopySuccess] = useState("");
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
    const [isModalOpenStatus, setIsModalOpenStatus] = useState(false);
    const [isPartnerActive, setIsPartnerActive] = useState(partner.status === "ACTIVE");

    // Function to toggle API Key visibility
    const toggleApiKeyVisibility = () => {
        setIsApiKeyVisible(!isApiKeyVisible);
    };

    // Function to copy API Key to clipboard
    const copyToClipboard = () => {
        navigator.clipboard.writeText(partner.apiKey).then(() => {
            setCopySuccess("API Key copied to clipboard!");
            setTimeout(() => setCopySuccess(""), 2000);
        }).catch(err => {
            setCopySuccess("Failed to copy API Key!");
            setTimeout(() => setCopySuccess(""), 2000);
        });
    };

    // Open Delete Confirmation Modal
    const openDeleteModal = () => {
        setIsModalOpenDelete(!isModalOpenDelete);
    };

    const handleDeleteConfirm = () => {
        console.log("Partner deleted:", partner.id);
        openDeleteModal();
        // Gọi API để xóa dữ liệu
    };

    const toggleStatusModal = () => setIsModalOpenStatus(!isModalOpenStatus);

    // Thay dổi trạng thái của Partner
    const toggleServiceStatus = async () => {
        try {
            const newStatus = !isPartnerActive;
            const apiUrl = newStatus ? `/v1/partner/restore/${partner.id}` : `/v1/partner/suspend/${partner.id}`;

            await wPost(apiUrl);
            setIsPartnerActive(newStatus);

            alert(`Partner is now ${newStatus ? "Active" : "Suspended"}`);
        } catch (error) {
            console.error("Error toggling service status:", error);
            alert("Could not change partner status. Please try again.");
        }
    };

    const handleStatusConfirm = () => {
        toggleServiceStatus();
        toggleStatusModal();
    };

    return (
        <div>
            <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mb-6">
                {/* Header Section */}
                <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                        <div className="h-16 w-16 bg-gray-300 rounded-full overflow-hidden">
                            <img
                                src={partner.avatar ? partner.avatar : "/avatarH.png"}
                                alt="Partner Avatar"
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </div>
                    <div className="flex-1">
                        <h2 className="text-3xl font-semibold text-gray-800">{partner.name}</h2>
                        <p className="text-lg text-gray-500">{partner.description}</p>
                    </div>
                </div>

                {/* Details Section */}
                <div className="mt-6 space-y-4">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-600">Email:</p>
                        <p className="text-sm text-gray-700">{partner?.email || "TuanAnhJunior@gmail.com"}</p>
                    </div>

                    {/* API Key Section with Toggle Visibility and Copy Button */}
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-600">API Key:</p>
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={copyToClipboard}
                                className="text-gray-900 hover:text-gray-700"
                                aria-label="Copy API Key"
                            >
                                <FaRegCopy/>
                            </button>
                            <p className="text-sm text-gray-700">
                                {isApiKeyVisible ? partner.secret : "***********************************"}
                            </p>
                            <button
                                onClick={toggleApiKeyVisibility}
                                className="text-gray-500 hover:text-gray-700"
                                aria-label={isApiKeyVisible ? "Hide API Key" : "Show API Key"}
                            >
                                {isApiKeyVisible ? (
                                    <IoIosEyeOff className="h-5 w-5"/>
                                ) : (
                                    <IoIosEye className="h-5 w-5"/>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Success message for copying */}
                    {copySuccess && (
                        <p className="text-sm text-green-600 mt-2">{copySuccess}</p>
                    )}

                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-600">Balance:</p>
                        <p className="text-lg font-semibold text-green-600">
                            {partner.balance.toLocaleString("en-VN", {style: "currency", currency: "VND"})}
                        </p>
                    </div>

                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-600">API Base URL:</p>
                        <p className="text-sm text-gray-700">{partner.apiBaseUrl || "N/A"}</p>
                    </div>

                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-600">Created:</p>
                        <p className="text-sm text-gray-700">{partner.createdAt ?  (new Date(partner.createdAt).toLocaleString()) : "N/A"}</p>
                    </div>

                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-600">Status:</p>
                        <button
                            className={`flex items-center px-3 py-1 rounded-md transition-colors duration-200 ${
                                !isPartnerActive ? "bg-green-500" : "bg-gray-300"
                            }`}
                            onClick={toggleStatusModal}
                        >
                            {!isPartnerActive ? (
                                <FaToggleOn className="text-white h-5 w-5 mr-1"/>
                            ) : (
                                <FaToggleOff className="text-gray-500 h-5 w-5 mr-1"/>
                            )}
                            <span className={`text-sm ${!isPartnerActive ? "text-white" : "text-gray-600"}`}>
                                {!isPartnerActive ? "ACTIVE" : "SUSPENDED"}
                            </span>
                        </button>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-4 flex space-x-4">
                    <button
                        onClick={openDeleteModal}
                        className="px-6 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                    >
                        Delete
                    </button>
                </div>
            </div>
            <Confirm
                isOpen={isModalOpenDelete}
                title={`Đối tác: ${partner.name}`}
                content="Bạn có chắc chắn muốn xóa Đối tác này không?"
                cancel="Quay lại"
                confirm="Xác nhận"
                onConfirm={handleDeleteConfirm}
                onClose={openDeleteModal}
            />
            <Confirm
                isOpen={isModalOpenStatus}
                title={`Đối tác: ${partner.name}`}
                content={`Bạn có chắc chắn muốn ${isPartnerActive ? "Tạm Dừng" : "Kích Hoạt lại"} Đối Tác này không?`}
                cancel="Quay lại"
                confirm="Xác nhận"
                onConfirm={handleStatusConfirm}
                onClose={toggleStatusModal}
            />
        </div>
    );
};

export default PartnerDetails;
