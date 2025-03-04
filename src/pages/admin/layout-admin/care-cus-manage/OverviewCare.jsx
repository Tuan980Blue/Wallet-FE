import { useState, useEffect } from 'react';

const OverviewCare = () => {
    const [requests, setRequests] = useState([]); 
    const [stats, setStats] = useState({}); 

    useEffect(() => {
        fetchStats();
        fetchRequests();
    }, []);

    const fetchStats = async () => {
        const response = await fetch('/api/stats');
        const data = await response.json();
        setStats(data);
    };

    const fetchRequests = async () => {
        const response = await fetch('/v1/ticket/all');
        const data = await response.json();

        const latestRequests = data.slice(0, 5);
        setRequests(latestRequests);
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Tổng Quan Chăm Sóc Khách Hàng</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-white shadow-md p-4 rounded-lg text-center">
                    <h3 className="text-xl font-semibold text-gray-700">Tổng Yêu Cầu Hôm Nay</h3>
                    <p className="text-2xl font-bold text-blue-600">{stats.todayRequests || 0}</p>
                </div>
                <div className="bg-white shadow-md p-4 rounded-lg text-center">
                    <h3 className="text-xl font-semibold text-gray-700">Yêu Cầu Đang Chờ</h3>
                    <p className="text-2xl font-bold text-yellow-600">{stats.pendingRequests || 0}</p>
                </div>
                <div className="bg-white shadow-md p-4 rounded-lg text-center">
                    <h3 className="text-xl font-semibold text-gray-700">Thời Gian Phản Hồi Trung Bình</h3>
                    <p className="text-2xl font-bold text-green-600">{stats.avgResponseTime || 0} phút</p>
                </div>
            </div>

            <div className="bg-white shadow-md p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">5 Yêu Cầu Gần Đây Của Khách Hàng</h3>
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm">
                            <th className="p-3 text-left">Khách Hàng</th>
                            <th className="p-3 text-left">Chủ Đề</th>
                            <th className="p-3 text-left">Ngày</th>
                            <th className="p-3 text-left">Trạng Thái</th>
                            <th className="p-3 text-left">Người Phụ Trách</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map((request) => (
                            <tr key={request.id} className="border-b hover:bg-gray-100">
                                <td className="p-3">{request.customerName}</td>
                                <td className="p-3">{request.subject}</td>
                                <td className="p-3">{request.date}</td>
                                <td className="p-3">
                                    <span
                                        className={`px-2 py-1 text-sm font-medium rounded ${
                                            request.status === 'Pending'
                                                ? 'bg-yellow-100 text-yellow-700'
                                                : 'bg-green-100 text-green-700'
                                        }`}
                                    >
                                        {request.status === 'Pending' ? 'Đang Chờ' : 'Hoàn Thành'}
                                    </span>
                                </td>
                                <td className="p-3">{request.assignedTo}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OverviewCare;
