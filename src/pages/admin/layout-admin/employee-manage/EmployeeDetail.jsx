
const EmployeeDetail = ({ employee }) => {
    if (!employee) {
        return <div className="text-center text-lg text-gray-500">No employee selected.</div>;
    }

    return (
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg px-8 py-6 mt-8">
            <h2 className="text-3xl font-semibold mb-4 text-gray-800">Chi Tiết Nhân Viên</h2>
            <div className="flex items-center mb-6">
                <img
                    src={employee.avatar}
                    alt="Avatar"
                    className="w-32 h-32 object-cover rounded-full border border-gray-300 shadow-md mr-4"
                />
                <div>
                    <h3 className="text-2xl font-semibold text-gray-800">{employee.name}</h3>
                    <p className="text-gray-600">Chức Vụ: {employee.position}</p>
                    <p className="text-gray-600">Phòng Ban: {employee.department}</p>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-100 p-4 rounded-lg shadow-xl">
                    <h4 className="font-semibold text-lg text-gray-700">Thông Tin Liên Hệ</h4>
                    <p className="text-gray-600"><strong>Email:</strong> {employee.email}</p>
                    <p className="text-gray-600"><strong>Điện Thoại:</strong> {employee.phone}</p>
                    <p className="text-gray-600"><strong>Địa Chỉ:</strong> {employee.address}</p>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg shadow-xl">
                    <h4 className="font-semibold text-lg text-gray-700">Thông Tin Cá Nhân</h4>
                    <p className="text-gray-600"><strong>Ngày Sinh:</strong> {employee.dateOfBirth}</p>
                    <p className="text-gray-600"><strong>Giới Tính:</strong> {employee.gender}</p>
                    <p className="text-gray-600"><strong>Ngày Bắt Đầu:</strong> {employee.startDate}</p>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg shadow-xl md:col-span-2">
                    <h4 className="font-semibold text-lg text-gray-700">Trạng Thái</h4>
                    <p className={`text-lg ${employee.status === 'Active' ? 'text-green-600' : 'text-red-600'}`}>
                        {employee.status}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default EmployeeDetail;
