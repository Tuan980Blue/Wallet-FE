// CustomerInfo.jsx
const CustomerInfo = ({ customer }) => {
    return (
        <div className="bg-gradient-to-r from-gray-50 to-cyan-100 p-6 rounded-lg shadow-lg space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 text-center">Thông tin khách hàng</h2>

            {/* Avatar */}
            <div className="flex items-center space-x-4">
                <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-blue-500 shadow-lg">
                    <img
                        src={customer.avatar || '/avatarH.png'}
                        alt="Avatar"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="flex flex-col">
                    <p className="text-xl font-medium text-gray-900">{customer.fullName || `${customer.lastName} ${customer.firstName}`}</p>
                    <p className="text-sm text-gray-500">{customer.email}</p>
                </div>
            </div>

            {/* Details */}
            <div className="text-gray-600 space-y-4">
                <div className="flex justify-between">
                    <span className="font-medium">Tên đăng nhập:</span>
                    <span>{customer.username}</span>
                </div>
                <div className="flex justify-between">
                    <span className="font-medium">Email:</span>
                    <span>{customer.email}</span>
                </div>
                <div className="flex justify-between">
                    <span className="font-medium">Trạng thái tài khoản:</span>
                    <span className={`font-semibold ${customer.isActive ? 'text-green-500' : 'text-red-500'}`}>
                        {customer.isActive ? 'Hoạt động' : 'Không hoạt động'}
                    </span>
                </div>
                <div className="flex justify-between">
                    <span className="font-medium">Xác thực tài khoản:</span>
                    <span className={`font-semibold ${customer.isVerified ? 'text-green-500' : 'text-orange-500'}`}>
                        {customer.isVerified ? 'Đã xác thực' : 'Chưa xác thực'}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default CustomerInfo;