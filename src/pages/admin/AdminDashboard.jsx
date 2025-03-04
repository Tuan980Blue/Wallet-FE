import {Suspense, useState} from 'react';
import Sidebar from './library-admin/Sidebar.jsx';
import {Outlet} from 'react-router-dom';
import Navbar from './library-admin/Navbar.jsx';
import LoadingPageSkeleton from '../../components/LoadingPageSkeleton.jsx';

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (<div className="flex">
    <Navbar/>
    <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        className={`fixed top-0 left-0 w-64 h-full bg-white shadow-lg transform transition-transform duration-300 ${isSidebarOpen
                                                                                                                    ? 'translate-x-0'
                                                                                                                    : '-translate-x-48'}`}
    />
    <div className={`flex-1 mt-16 transition-all duration-300 ${isSidebarOpen ? 'ml-60' : 'ml-12'}`}>
      <div className={''}>
        <Suspense fallback={<LoadingPageSkeleton/>}><Outlet/></Suspense>
      </div>
    </div>
  </div>);
};

export default AdminDashboard;