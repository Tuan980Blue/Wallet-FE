import { useState } from 'react';

const SettingAdmin = () => {
    const [activeTab, setActiveTab] = useState('security');

    return (
        <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">Cài đặt Admin</h1>

            <div className="flex justify-around mb-6 border-b-2 border-gray-300">
                {['security', 'notification', 'activity', 'appearance', 'api', 'session'].map(tab => (
                    <button
                        key={tab}
                        className={`py-2 px-4 font-semibold ${activeTab === tab ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-500'}`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab === 'security' && 'Bảo mật'}
                        {tab === 'notification' && 'Thông báo'}
                        {tab === 'activity' && 'Lịch sử hoạt động'}
                        {tab === 'appearance' && 'Tùy chỉnh giao diện'}
                        {tab === 'api' && 'Quản lý API Keys'}
                        {tab === 'session' && 'Quản lý phiên đăng nhập'}
                    </button>
                ))}
            </div>

            {/* Nội dung của tab */}
            <div className="p-4 bg-gray-50 rounded-lg">
                {activeTab === 'security' && (
                    <div>
                        <h2 className="text-2xl font-bold mb-4 text-gray-700">Bảo mật</h2>
                        <button className="bg-blue-500 text-white py-2 px-4 rounded-lg mb-2 hover:bg-blue-600 transition">Kích hoạt 2FA</button>
                        <p className="mb-2 text-gray-600">Quản lý các thiết bị đăng nhập gần đây.</p>
                        <button className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition">Đăng xuất khỏi tất cả các phiên</button>
                    </div>
                )}

                {activeTab === 'notification' && (
                    <div>
                        <h2 className="text-2xl font-bold mb-4 text-gray-700">Thông báo</h2>
                        <p className="text-gray-600">Cấu hình nhận thông báo qua email, SMS hoặc ứng dụng.</p>
                        <button className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 hover:bg-blue-600 transition">Cập nhật cài đặt thông báo</button>
                    </div>
                )}

                {activeTab === 'activity' && (
                    <div>
                        <h2 className="text-2xl font-bold mb-4 text-gray-700">Lịch sử hoạt động</h2>
                        <p className="text-gray-600">Hiển thị nhật ký các hoạt động của quản trị viên.</p>
                        <button className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 hover:bg-blue-600 transition">Xem lịch sử</button>
                    </div>
                )}

                {activeTab === 'appearance' && (
                    <div>
                        <h2 className="text-2xl font-bold mb-4 text-gray-700">Tùy chỉnh giao diện</h2>
                        <p className="text-gray-600">Thay đổi giao diện và màu sắc của bảng điều khiển.</p>
                        <button className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 hover:bg-blue-600 transition">Chọn chế độ tối/sáng</button>
                    </div>
                )}

                {activeTab === 'api' && (
                    <div>
                        <h2 className="text-2xl font-bold mb-4 text-gray-700">Quản lý API Keys</h2>
                        <p className="text-gray-600">Tạo, xóa hoặc xem các API keys cho việc tích hợp.</p>
                        <button className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 hover:bg-blue-600 transition">Quản lý API Keys</button>
                    </div>
                )}

                {activeTab === 'session' && (
                    <div>
                        <h2 className="text-2xl font-bold mb-4 text-gray-700">Quản lý phiên đăng nhập</h2>
                        <p className="text-gray-600">Xem và quản lý các phiên đăng nhập hiện tại của admin.</p>
                        <button className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 hover:bg-blue-600 transition">Xem các phiên đăng nhập</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SettingAdmin;
