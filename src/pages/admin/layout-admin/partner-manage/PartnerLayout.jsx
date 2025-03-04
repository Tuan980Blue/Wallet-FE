import {useState} from "react";
import PartnerList from "./components/PartnerList.jsx";
import PartnerDetails from "./components/PartnerDetail.jsx";
import OrderList from "./components/OrderList.jsx";
import {wGet} from "../../../../util/request.util.js";
import {useQuery} from "@tanstack/react-query";
import InactivePartnerList from "./components/InactivePartnerList.jsx";

const fetchPartners = async () => {
    try {
        const response = await wGet("/admin/v1/application");
        return response;
    } catch (error) {
        console.error("Lỗi khi lấy danh sách App:", error);
        throw error;
    }
};

function PartnerLayout() {
    const [selectedPartner, setSelectedPartner] = useState(null);
    const [showInactivePartners, setShowInactivePartners] = useState(false);

    const {data: apps, error, isLoading} = useQuery({
        queryKey: ["apps"],
        queryFn: fetchPartners,
        staleTime: 300000,
        cacheTime: 600000,
    });

    const inactivePartners = apps?.filter(partner => partner.status === 'INACTIVE');
    const activeOrSuspendedPartners = apps?.filter(partner =>
        partner.status === 'ACTIVE' || partner.status === 'SUSPENDED'
    );

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="min-h-screen bg-gray-50 p-8 flex flex-col w-full">
            <div className="flex items-center justify-center mb-8">
                <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg">
                    Quản Lý Đối Tác
                </h1>
            </div>

            <div>
                {/* Button to toggle inactive partners list */}
                <button
                    onClick={() => setShowInactivePartners(prev => !prev)}
                    className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
                >
                    {showInactivePartners ? "Ẩn Danh Sách" : "Xem Danh Sách Yêu Cầu Làm Đối Tác"}
                </button>

                {/* Conditionally render InactivePartnerList */}
                {showInactivePartners && (
                    <div>
                        <InactivePartnerList inactivePartners={inactivePartners} />
                    </div>
                )}
            </div>

            <div className="w-full max-w-8xl grid grid-cols-12 gap-6">
                {/* Active/Suspended Partners List Section */}
                <div className="col-span-12 md:col-span-4">
                    <PartnerList
                        setSelectedPartner={setSelectedPartner}
                        activeOrSuspendedPartners={apps}
                    />
                </div>

                {/* Details Section */}
                <div className="col-span-12 md:col-span-8 space-y-6">
                    {selectedPartner ? (
                        <div>
                            <div className="shadow-lg">
                                <PartnerDetails partner={selectedPartner}/>
                            </div>

                            <div className="shadow-lg ">
                                <OrderList partner={selectedPartner}/>
                            </div>
                        </div>
                    ) : (
                        <div
                            className="col-span-12 bg-white shadow-lg rounded-lg p-5 flex justify-center items-center h-full">
                            <p className="text-gray-600 text-lg text-center">
                                Chọn đối tác để xem chi tiết.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default PartnerLayout;