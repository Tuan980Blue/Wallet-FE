import { useState } from "react";
import axios from 'axios';
import { wPost } from "../../../../../util/request.util.js";
import { queryClient } from "../../../../../modules/cache.js";

const InactivePartnerList = ({ inactivePartners }) => {
    const [selectedPartnerId, setSelectedPartnerId] = useState(null);

    // Toggle partner details display
    const togglePartnerDetails = (id) => {
        setSelectedPartnerId((prevId) => (prevId === id ? null : id));
    };

    // Send accept request
    const handleAccept = async (id) => {
        try {
            await wPost(`/v1/partner/approve/${id}`);
            alert("Đối tác đã được chấp nhận!");
            queryClient.invalidateQueries({ queryKey: ["partners"] });
        } catch (error) {
            console.error("Lỗi khi gửi yêu cầu chấp nhận:", error);
            alert("Không thể chấp nhận yêu cầu. Vui lòng thử lại.");
        }
    };

    // Send reject request
    const handleReject = async (id) => {
        try {
            await wPost(`/v1/partner/delete/${id}`);
            alert("Đối tác đã bị từ chối.");
            queryClient.invalidateQueries({ queryKey: ["partners"] });
        } catch (error) {
            console.error("Lỗi khi gửi yêu cầu từ chối:", error);
            alert("Không thể từ chối yêu cầu. Vui lòng thử lại.");
        }
    };

    return (
        <div className={"bg-blue-100 rounded-xl mb-6"}>
            <div className="p-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                    Yêu Cầu Tham Gia Trở Thành Đối Tác
                </h2>
                {inactivePartners?.length ? (
                    inactivePartners.map((partner) => (
                        <div
                            key={partner.id}
                            className="bg-white p-4 rounded-lg shadow mb-4 border border-gray-200"
                        >
                            <div className="flex justify-between items-center">
                            <span
                                onClick={() => togglePartnerDetails(partner.id)}
                                className="text-lg font-semibold text-gray-700 cursor-pointer hover:text-blue-600"
                            >
                                {partner.name}
                            </span>
                                <div className="space-x-2">
                                    <button
                                        onClick={() => handleAccept(partner.id)}
                                        className="px-4 py-1 bg-green-500 text-white font-medium rounded hover:bg-green-600 transition duration-200"
                                    >
                                        Chấp Nhận
                                    </button>
                                    <button
                                        onClick={() => handleReject(partner.id)}
                                        className="px-4 py-1 bg-red-500 text-white font-medium rounded hover:bg-red-600 transition duration-200"
                                    >
                                        Từ Chối
                                    </button>
                                </div>
                            </div>

                            {selectedPartnerId === partner.id && (
                                <div className="mt-4 text-gray-600 space-y-1">
                                    <p><strong>Email:</strong> {partner.email}</p>
                                    <p><strong>Mô tả:</strong> {partner.description}</p>
                                    <p><strong>Trạng thái:</strong> {partner.status}</p>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">Không có yêu cầu tham gia nào.</p>
                )}
            </div>
        </div>
    );
};

export default InactivePartnerList;