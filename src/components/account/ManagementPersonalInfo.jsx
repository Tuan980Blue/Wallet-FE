import { FaClipboardUser } from "react-icons/fa6"; //management-user-icon
import { FaUserCircle } from "react-icons/fa"; //user-icon
import { FaShield } from "react-icons/fa6"; //shield-icon
import { FaLock } from "react-icons/fa"; //lock-icon
import { FaTableCellsRowLock } from "react-icons/fa6"; //tranLock-icon
import { FaUserCog } from "react-icons/fa"; //user-icon
import { NavLink, Outlet, useNavigate } from "react-router-dom"; //ChangeLink library

const ManagementPersonalInfo = () => {
  const navigate = useNavigate();
  // Set first child `info-account`
  const navigateToInfoAccount = () => {
    navigate('');
  };

  return (
    <div className="management-account w-full lg:w-auto mr-4 ml-2 lg:mx-20 lg:px-14">
      {/* TitleManagementAccount */}
      <div className="flex items-center w-auto mb-5">
        <div><FaClipboardUser size={21} color="#0f8be8" /></div>
        <div className="font-medium text-xl ml-2">Quản trị tài khoản</div>
      </div>

      {/* OptionContent */}
      <div className="grid grid-cols-1 lg:grid-cols-4 w-full h-auto mb-16 gap-4 lg:gap-0">
        {/* Dad */}
        <div className="col-span-1 flex grid-rows-5 overflow-x-scroll gap-x-2 lg:grid lg:grid-rows-5 gap-y-2 mr-2 bg-white w-full text-nowrap max-h-16 lg:w-auto lg:max-h-75 ml-2 rounded-lg p-2 items-center">
          {/* InFoAccount */}
          <NavLink
            to="info-account"
            className={({ isActive }) =>
              isActive
                ? "pr-3 lg:pr-0 row-span-1 w-auto h-full items-center py-4 rounded-md bg-dimPrimaryColor pl-3 flex cursor-pointer group text-primaryColor"
                : "pr-3 lg:pr-0 row-span-1 w-auto h-full items-center py-4 hover:rounded-md bg pl-3 flex hover:bg-dimPrimaryColor cursor-pointer group text-textGray"
            }
            onClick={navigateToInfoAccount}
            style={{ textDecoration: 'none' }}
          >
            <div><FaUserCircle size={20} /></div>
            <p className="ml-3 font-medium text-md">Thông tin tài khoản</p>
          </NavLink>
          {/* SettingAdmitTransaction */}
          <NavLink
            to="transaction-account"
            className={({ isActive }) =>
              isActive
                ? "pr-3 lg:pr-0 row-span-1 w-auto h-full items-center py-4 rounded-md bg-dimPrimaryColor pl-3 flex cursor-pointer group text-primaryColor"
                : "pr-3 lg:pr-0 row-span-1 w-auto h-full items-center py-4 hover:rounded-md bg pl-3 flex hover:bg-dimPrimaryColor cursor-pointer group text-textGray"
            }
            style={{ textDecoration: 'none' }}
          >
            <div><FaShield size={20} /></div>
            <p className="ml-3 font-medium text-md">Cấu hình xác thực giao dịch</p>
          </NavLink>
          {/* ChangePassword */}
          <NavLink
            to="change-password"
            className={({ isActive }) =>
              isActive
                ? "pr-3 lg:pr-0 row-span-1 w-auto h-full items-center py-4 rounded-md bg-dimPrimaryColor pl-3 flex cursor-pointer group text-primaryColor"
                : "pr-3 lg:pr-0 row-span-1 w-auto h-full items-center py-4 hover:rounded-md bg pl-3 flex hover:bg-dimPrimaryColor cursor-pointer group text-textGray"
            }
            style={{ textDecoration: 'none' }}
          >
            <div><FaLock size={20} /></div>
            <p className="ml-3 font-medium text-md">Đổi mật khẩu</p>
          </NavLink>
          {/* ChangeTransactionPassword */}
          <NavLink
            to="change-transaction-password"
            className={({ isActive }) =>
              isActive
                ? "pr-3 lg:pr-0 row-span-1 w-auto h-full items-center py-4 rounded-md bg-dimPrimaryColor pl-3 flex cursor-pointer group text-primaryColor"
                : "pr-3 lg:pr-0 row-span-1 w-auto h-full items-center py-4 hover:rounded-md bg pl-3 flex hover:bg-dimPrimaryColor cursor-pointer group text-textGray"
            }
            style={{ textDecoration: 'none' }}
          >
            <div><FaTableCellsRowLock size={20} /></div>
            <p className="ml-3 font-medium text-md">Đổi mật khẩu giao dịch</p>
          </NavLink>
          {/* SettingLevelUser */}
          <NavLink
            to="setting-level-user"
            className={({ isActive }) =>
              isActive
                ? "pr-3 lg:pr-0 row-span-1 w-auto h-full items-center py-4 rounded-md bg-dimPrimaryColor pl-3 flex cursor-pointer group text-primaryColor"
                : "pr-3 lg:pr-0 row-span-1 w-auto h-full items-center py-4 hover:rounded-md bg pl-3 flex hover:bg-dimPrimaryColor cursor-pointer group text-textGray"
            }
            style={{ textDecoration: 'none' }}
          >
            <div><FaUserCog size={20} /></div>
            <p className="ml-3 font-medium text-md">Cài đặt phân quyền</p>
          </NavLink>
        </div>

        {/* Child */}
        {/* Change on Child */}
        <div className="col-span-3 mr-6">
          {/* change another child */}
          <Outlet />
        </div>
      </div>
    </div>
  );
}
export default ManagementPersonalInfo;
