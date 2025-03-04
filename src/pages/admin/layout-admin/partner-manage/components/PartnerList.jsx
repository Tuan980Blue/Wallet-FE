import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { CheckCircleIcon, ClockIcon, XCircleIcon } from "@heroicons/react/16/solid/index.js";

const statusIcons = {
    ACTIVE: <CheckCircleIcon className="h-5 w-5 text-green-500" />,
    INACTIVE: <XCircleIcon className="h-5 w-5 text-red-500" />,
    SUSPENDED: <ClockIcon className="h-5 w-5 text-yellow-500" />,
    Default: <ClockIcon className="h-5 w-5 text-gray-500" />
};

const PartnerList = ({ setSelectedPartner, activeOrSuspendedPartners }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedPartnerId, setSelectedPartnerId] = useState(null); // Track selected partner ID

    const filteredPartners = activeOrSuspendedPartners?.filter((partner) =>
        partner.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSelectPartner = (partner) => {
        setSelectedPartner(partner);
        setSelectedPartnerId(partner.id); // Set selected partner ID for highlighting
    };

    return (
        <div className="bg-blue-100 shadow-lg rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-5 bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
                Danh sách Partner
            </h2>

            <div className="relative mb-5">
                <FaSearch className="absolute left-3 top-2.5 text-gray-400" size={18} />
                <input
                    type="text"
                    placeholder="Tìm kiếm đối tác..."
                    className="w-full pl-10 pr-3 py-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <ul className="space-y-4 max-h-96 overflow-y-auto">
                {filteredPartners?.length > 0 ? (
                    filteredPartners.map((partner) => {
                        const partnerStatus = partner.status || "ACTIVE";
                        const isSelected = partner.id === selectedPartnerId; // Check if this partner is selected

                        return (
                            <li
                                key={partner.id}
                                className={`flex items-center justify-between p-3 rounded-lg shadow-sm hover:shadow-lg transition-all cursor-pointer ${
                                    isSelected ? "bg-blue-200 text-blue-800" : "bg-gray-50 hover:bg-gray-100"
                                }`}
                                onClick={() => handleSelectPartner(partner)}
                            >
                                <div className="flex items-center">
                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                                        <svg
                                            className="w-6 h-6 text-blue-500"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M10 0C4.485 0 0 4.485 0 10s4.485 10 10 10 10-4.485 10-10S15.515 0 10 0zM5 10a5 5 0 0110 0 5 5 0 01-10 0z" />
                                        </svg>
                                    </div>
                                    <span className="text-lg font-medium">{partner.name}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    {statusIcons[partnerStatus]}
                                    <span className="text-sm font-semibold">{partnerStatus}</span>
                                    <svg
                                        className="w-5 h-5 text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </li>
                        );
                    })
                ) : (
                    <li className="text-center text-gray-500">Không tìm thấy đối tác nào.</li>
                )}
            </ul>
        </div>
    );
};

export default PartnerList;
