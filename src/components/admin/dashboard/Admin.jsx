import {useState} from 'react';
import {NavLink, Outlet} from 'react-router-dom';
import {TiChevronRightOutline} from 'react-icons/ti';

export const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
      <div className="flex">
        <div className={`fixed inset-y-0 left-0 w-64 bg-gray-800 text-white shadow-lg transform ${isSidebarOpen
                                                                                                  ? 'translate-x-0'
                                                                                                  : '-translate-x-full'} transition-transform duration-300 ease-in-out z-50`}>
          <div className="relative p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Admin Menu</h2>
              <button onClick={toggleSidebar}
                      className={`absolute top-[30px] transform -translate-y-1/2 flex items-center p-1 rounded-full transition-all duration-300 shadow-lg focus:outline-none ${isSidebarOpen
                                                                                                                                                                               ? 'right-[10px] bg-gray-800'
                                                                                                                                                                               : 'right-[-45px] bg-gray-800 hover:bg-gray-700'}`}>
                <div className="hover:bg-blue-500 rounded-full p-1 transition duration-300">
                  <TiChevronRightOutline
                      className={`text-2xl text-white transition-transform duration-300 transform ${isSidebarOpen
                                                                                                    ? 'rotate-180'
                                                                                                    : 'rotate-0'}`}/>
                </div>
              </button>
            </div>
            <ul className="space-y-2">
              <li>
                <NavLink to="dashboard"
                         className="block px-4 py-2 rounded hover:bg-gray-700 hover:text-primaryColor transition duration-300"
                         style={{textDecoration: 'none'}}>Dashboard</NavLink>
              </li>
              <li>
                <NavLink to="customer-manage"
                         className="block px-4 py-2 rounded hover:bg-gray-700 hover:text-primaryColor transition duration-300"
                         style={{textDecoration: 'none'}}>Quản lý khách hàng</NavLink>
              </li>
              <li>
                <NavLink to="/lookup"
                         className="block px-4 py-2 rounded hover:bg-gray-700 hover:text-primaryColor transition duration-300"
                         style={{textDecoration: 'none'}}>Quản lý tra cứu</NavLink>
              </li>
              <li>
                <NavLink to="/statistics"
                         className="block px-4 py-2 rounded hover:bg-gray-700 hover:text-primaryColor transition duration-300"
                         style={{textDecoration: 'none'}}>Quản lý thống kê</NavLink>
              </li>
              <li>
                <NavLink to="/transactions"
                         className="block px-4 py-2 rounded hover:bg-gray-700 hover:text-primaryColor transition duration-300"
                         style={{textDecoration: 'none'}}>Quản lý giao dịch</NavLink>
              </li>
            </ul>
          </div>
        </div>
        <div className={`flex flex-col flex-grow p-6 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>

          <Outlet/>

        </div>
      </div>
  );
};
