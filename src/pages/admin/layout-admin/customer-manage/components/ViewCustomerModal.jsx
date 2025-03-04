import {useQuery} from "@tanstack/react-query";
import {wGet} from "../../../../../util/request.util.js";

// API fetch function (giả sử API trả về customer theo customer.id)
const fetchCustomerById = async (id) => {
    try {
        const response = await wGet(`/v1/user/wallet/${id}`);
        return response;
    } catch (error) {
        console.error('Error fetching wallet customer data:', error);
        throw error;
    }
};

const ViewCustomerModal = ({customer, onClose}) => {
    const { data: wallet, error, isLoading } = useQuery(
        {
            queryKey: ['customer', customer.id],
            queryFn: () => fetchCustomerById(customer.id),
            enabled: !!customer.id,
            cacheTime: 1000 * 60 * 5,
            staleTime: 1000 * 60 * 2,
        }
    );

        // Hiển thị Loading hoặc lỗi nếu có
        if (isLoading) return <div>Loading...</div>;
        if (error) return <div>Error: {error.message}</div>;

        return (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
                <div
                    className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8 space-y-8 transform transition-all scale-105 hover:scale-100 duration-300">
                    {/* Avatar and Name Section */}
                    <div className="flex items-center space-x-6">
                        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-500 shadow-lg">
                            <img
                                src={customer.avatar || '/avatarH.png'} // Placeholder nếu không có avatar
                                alt={`${customer.lastName} Avatar`}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">
                                {customer.fullName}
                            </h2>
                            <p className="text-lg text-gray-500">{customer.email || 'tuananh21@gmail.com'}</p>
                            <p className="text-sm text-gray-500">Id: {customer.id || 'Iduser123'}</p>
                        </div>
                    </div>

                    {/* Customer Details Section */}
                    <div className="grid grid-cols-2 gap-4 text-gray-700 text-base font-medium">
                        <div>
                            <span className="text-gray-500">Tên:</span>
                            <p className="font-semibold text-gray-800">{customer.firstName + " " + customer.lastName}</p>
                        </div>
                        <div>
                            <span className="text-gray-500">Loại:</span>
                            <p className="font-semibold text-gray-800">{wallet.ownerType || "Chưa xác định"} </p>
                        </div>
                        <div>
                            <span className="text-gray-500">Ngày sinh:</span>
                            <p className="font-semibold text-gray-800">{customer.dob || "21/02/2004"} </p>
                        </div>
                        <div>
                            <span className="text-gray-500">Công việc:</span>
                            <p className="font-semibold text-gray-800">{customer.job || "Sinh Viên"}</p>
                        </div>
                        <div>
                            <span className="text-gray-500">Trạng thái tài khoản:</span>
                            <p className={`font-semibold ${customer.isActive ? 'text-blue-600' : 'text-red-600'}`}>
                                {customer.isActive ? 'Hoạt động' : 'Ngừng hoạt động'}
                            </p>
                        </div>
                        <div>
                            <span className="text-gray-500">Xác thực:</span>
                            <p className={`font-semibold ${customer.isVerified ? 'text-green-600' : 'text-red-600'}`}>
                                {customer.isVerified ? 'Đã xác thực' : 'Chưa xác thực'}
                            </p>
                        </div>
                        <div>
                            <span className="text-gray-500">Số dư:</span>
                            <p className="font-semibold text-green-600">
                                {new Intl.NumberFormat('vi-VN', {style: 'decimal'}).format(wallet.balance || 0)} VND
                            </p>
                        </div>
                    </div>

                    {/* Close Button */}
                    <div className="flex justify-center">
                        <button
                            onClick={onClose}
                            className="w-full py-3 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-colors duration-300"
                        >
                            Đóng
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    export default ViewCustomerModal;
