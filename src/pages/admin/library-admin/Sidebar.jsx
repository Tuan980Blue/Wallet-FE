import {IoMoonOutline, IoSunnyOutline} from 'react-icons/io5';
import {TbBellRingingFilled} from 'react-icons/tb';
import {MdAssessment, MdGroups2, MdHome, MdManageAccounts, MdSettings} from 'react-icons/md'; // Import icons
import {Collapse} from '@material-tailwind/react';
import {useState} from 'react';
import {SiGoogletagmanager} from 'react-icons/si';
import {IoIosArrowForward, IoMdPersonAdd} from 'react-icons/io';
import {BsPersonVcardFill} from 'react-icons/bs';
import {NavLink} from 'react-router-dom';
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { RiExchangeFill } from "react-icons/ri";

const Sidebar = ({
  isSidebarOpen,
  setIsSidebarOpen,
  isDarkMode,
  setIsDarkMode,
}) => {

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [openTable, setOpenTable] = useState(false);
  const [isArrowRotated, setIsArrowRotated] = useState(false);

  const menuItems = [
    {
      name: 'Home',
      link: '/admin1',
      icon: <MdHome/>,
    },
    {
      name: 'Chăm sóc Khách hàng',
      link: '/admin1/care-cus-manage',
      icon: <BsPersonVcardFill/>,
    },
    {
      name: 'Quản Lý',
      icon: <SiGoogletagmanager/>,
    },
    {
      name: 'Phân Quyền',
      link: '/admin1/role-manage',
      icon: <MdManageAccounts/>,
    },
    {
      name: 'Thống Kê',
      link: '/admin1/statistic-manage',
      icon: <MdAssessment/>,
    },
    {
      name: 'Cài Đặt',
      link: '/admin1/setting',
      icon: <MdSettings/>,
    },
  ];

  const tableSubItems = [
    {
      name: 'Quản lý Giao dịch',
      link: '/admin1/transaction-manage',
      icon: <RiExchangeFill/>,
    },
    {
      name: 'Quản lý Khách hàng',
      link: '/admin1/customer-manage',
      icon: <FaMoneyBillTrendUp/>,
    },
    {
      name: 'Quản lý Nhân viên',
      link: '/admin1/employee-manage',
      icon: <MdGroups2/>,
    },
    {
      name: 'Quản lý Partner',
      link: '/admin1/partner-manage',
      icon: <IoMdPersonAdd/>,
    },
  ];

  return (
      <aside
          className={`w-60 fixed transition-transform ease-in-out duration-1000 z-50 flex h-screen bg-[#1E293B] 
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-48'}`}
      >
        <div
            className={`max-toolbar w-full -right-6 transition transform ease-in duration-300 flex items-center justify-between border-4 border-white dark:border-[#0F172A] bg-[#1E293B] absolute top-2 rounded-full h-12 ${isSidebarOpen
                                                                                                                                                                                                                            ? 'scale-x-100'
                                                                                                                                                                                                                            : 'scale-x-0'}`}
        >
          <div className="flex pl-4 items-center space-x-2">
            <div>
              {!isDarkMode ? (
                  <div
                      onClick={() => setIsDarkMode(true)}
                      className="moon text-white hover:text-green-500 dark:hover:text-[#38BDF8]"
                  >
                    <IoMoonOutline/>
                  </div>
              ) : (
                   <div
                       onClick={() => setIsDarkMode(false)}
                       className="sun text-white hover:text-green-500 dark:hover:text-[#38BDF8]"
                   >
                     <IoSunnyOutline/>
                   </div>
               )}
            </div>
            <div className="text-white hover:text-green-500 dark:hover:text-[#38BDF8]">
              <TbBellRingingFilled/>
            </div>
          </div>
          <div
              className="flex items-center space-x-3 group bg-gradient-to-r dark:from-green-500 dark:to-blue-400 from-green-400 via-purple-600 to-yellow-400 pl-6 pr-2 py-1 rounded-full text-white shadow-lg transform transition-all ease-in-out duration-500">
            <div className="transform ease-in-out duration-300 mr-12 font-semibold">
              Admin Pro
            </div>
          </div>
        </div>

        <div
            className={`absolute top-2 -right-6 p-3 rounded-full bg-[#1E293B] border-4 border-white dark:border-[#0F172A] 
    text-white shadow-lg transform transition-transform duration-500 hover:rotate-45 hover:scale-110 hover:bg-gradient-to-r hover:from-green-500 hover:to-green-600 dark:hover:from-blue-400 dark:hover:to-blue-600`}
            onClick={toggleSidebar}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2}
               stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round"
                  d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"/>
          </svg>
        </div>

        <div className="mt-20 flex flex-col space-y-2 w-full h-[calc(100vh)]">
          {menuItems.map((item, idx) => (
              <div key={idx}>
                <NavLink
                    to={item.link}
                    className={`hover:ml-4 ${isSidebarOpen ? 'pl-8' : 'justify-end pr-5'} text-white no-underline hover:no-underline hover:text-green-400 dark:hover:text-green-500 w-full bg-[#1E293B] p-2 rounded-full transform ease-in-out duration-300 flex items-center space-x-3`}
                    onClick={() => {
                      if (item.name === 'Quản Lý') {
                        setOpenTable(!openTable);
                        setIsArrowRotated(!isArrowRotated);
                      }
                    }}
                >
                  {item.icon}
                  <span className={`${!isSidebarOpen && 'hidden'} origin-left transform duration-200`}>
                                {item.name}
                            </span>
                  {item.name === 'Quản Lý' && (
                      <div>
                        <IoIosArrowForward
                            className={`transition-transform duration-300 ${isArrowRotated ? 'rotate-90' : ''} ml-20`}/>
                      </div>
                  )}
                </NavLink>

                {item.name === 'Quản Lý' && (
                    <Collapse open={openTable}>
                      <div className="ml-8">
                        {tableSubItems.map((subItem, subIdx) => (
                            <NavLink
                                key={subIdx}
                                to={subItem.link}
                                className={`hover:translate-x-2 text-white no-underline hover:no-underline hover:text-green-400 dark:hover:text-green-500 p-2 rounded-lg bg-[#2E3B4E] mt-1 flex items-center transition-all duration-300 ease-in-out
    ${isSidebarOpen ? 'space-x-2' : 'justify-end mr-2'}`}
                            >
                              {subItem.icon}
                              {isSidebarOpen && (
                                  <span>{subItem.name}</span>
                              )}
                            </NavLink>
                        ))}
                      </div>
                    </Collapse>
                )}
              </div>
          ))}
          <div className={'px-4 py-2'}>
            <div className={'text-gray-500 border-t-2 border-gray-500 text-md font-extralighto'}>
              Xem thêm
            </div>
          </div>
        </div>
      </aside>
  );
};

export default Sidebar;