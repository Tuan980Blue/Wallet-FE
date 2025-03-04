import React, {useState} from 'react';
import numeral from 'numeral';
import {Button, TextInput} from '@mantine/core';
import {wGet, wPost} from '../../util/request.util.js';
import {useQuery} from '@tanstack/react-query';
import {useNavigate} from 'react-router-dom';
import {revalidateCache} from '../../modules/cache.js';

function fetchApplications() {
  return wGet('/v1/user/application');
}

const ApplicationManager = () => {
  const navigate = useNavigate();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [newApplication, setNewApplication] = useState('');
  const {data: applications, isLoading, error} = useQuery({
    queryKey: ['applications'],
    queryFn: fetchApplications,
    staleTime: 5 * 60 * 1000,
  });
  const toggleForm = () => {
    setIsFormVisible(!isFormVisible);
  };

  const cancelForm = () => {
    setIsFormVisible(false);
  };

  // Format date function
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  if (isLoading) return <div>Loading...</div>;

  function handleCreateApplication() {
    wPost("v1/application", {
      name: newApplication,
    }).then(() => {
        revalidateCache('applications').then();
    });
  }

  return (
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="sidebar w-64 bg-gray-900 min-h-screen p-5 shadow-lg">
          <h2 className="text-xl font-bold text-white">Sidebar</h2>
          {/* Add sidebar content here */}
          <nav className="mt-4">
            <ul>
              <li className="text-gray-300 hover:text-white transition-colors mb-2">
                <a href="#">Trang Chủ</a>
              </li>
              <li className="text-gray-300 hover:text-white transition-colors mb-2">
                <a href="#">Quản Lý Ứng Dụng</a>
              </li>
              <li className="text-gray-300 hover:text-white transition-colors mb-2">
                <a href="#">Cài Đặt</a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Main Content */}
        <div className="main-content flex-grow p-6 bg-gray-100">
          <div className="header flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Ứng Dụng</h1>
            <button
                onClick={toggleForm}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg transition duration-200 shadow-md"
            >
              Tạo ứng dụng mới
            </button>
          </div>

          {/* Form for New Application */}
          <div className={`transition-all duration-300 overflow-hidden ${isFormVisible ? 'h-28' : 'h-0'}`}>
            <TextInput
                value={newApplication}
                onChange={(event) => setNewApplication(event.target.value)}
                size="md"
                placeholder="Tên ứng dụng"
                className="w-full mt-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
            <div className="flex items-center mt-2 justify-start gap-2">
              <Button
                  onClick={cancelForm}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-200"
              >
                Hủy
              </Button>
              <Button onClick={handleCreateApplication} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition duration-200">
                Tạo
              </Button>
            </div>
          </div>

          {/* Applications List */}
          <div className="mt-6">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày Tạo</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Số Dư</th>
                  </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                  {applications.map((app) => (
                      <tr onClick={() => navigate(`/application/${app.id}`)} key={app.id} className="hover:bg-gray-50 hover:cursor-pointer transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{app.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{app.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(app.createdAt)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{numeral(app.balance).format('0.0a').toUpperCase()}</td>
                      </tr>
                  ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default ApplicationManager;