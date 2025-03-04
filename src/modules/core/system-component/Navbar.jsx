import {useAuth} from '../../hooks/useAuth.jsx';
import {TiThMenu} from 'react-icons/ti';
import {Link} from 'react-router-dom';
import NavbarAvatar from './Navbar.Avatar.jsx';
import NavbarLinkItem from './Navbar.LinkItem.jsx';
import {useEffect, useState} from 'react';

const navbarItem = [
  {
    name: 'Trang chủ',
    link: '/home',
  },
  {
    name: 'Nạp tiền',
    link: '/top-up',
    items: [
      {
        name: 'Test 1',
        link: '/test1',
      },
    ],
  },
  {
    name: 'Rút tiền',
    link: '/withdraw',
  },
];

const Navbar = () => {
  const {
    logout,
    user,
  } = useAuth();
  const [isShowLinkItem, setIsShowLinkItem] = useState(false);

  function resetDropdownStatus() {
    if (window.innerWidth >= 786) setIsShowLinkItem(false);
  }

  useEffect(() => {
    addEventListener('resize', resetDropdownStatus);

    return () => {
      removeEventListener('resize', resetDropdownStatus);
    };
  }, []);

  function handleLogout() {
    logout();
  }

  return (
      <nav className="w-full h-20 items-center z-10 shadow bg-white fixed top-0 left-0 border-gray-200 ">
        <div className="h-full md:px-20 sm:px-10 w-full max-w-screen-xl flex items-center justify-between mx-auto p-4">
          <Link
              className="h-full hover:no-underline flex items-center space-x-3 rtl:space-x-reverse"
              to={user ? '/home' : '/'}>
            <img src="/e-wallet.png" className="h-full" alt="logo"/>
            <span className="self-center hidden md:block text-2xl font-semibold whitespace-nowrap text-primary">
            EWallet
          </span>
          </Link>
          <div
              className="h-full relative gap-2 flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            {!user ? (
                <Link className="h-[90%]" to={'/sign-in'}>
                  <button
                      type="button"
                      className="h-full hover:text-white border-primary bg-blue-200 border-1 text-primary bg-opacity-50 hover:bg-primary font-medium px-2 rounded-lg transition-colors ease-in-out"
                  >
                    Đăng nhập
                  </button>
                </Link>
            ) : (
                 <NavbarAvatar logout={handleLogout}/>
             )}

            <button
                onClick={() => {
                  setIsShowLinkItem((isShowLinkItem) => !isShowLinkItem);
                }}
                data-collapse-toggle="navbar-user"
                type="button"
                className="flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 border-1 rounded-lg md:hidden"
                aria-controls="navbar-user"
                aria-expanded="true"
            >
              <TiThMenu/>
            </button>
          </div>
          <div
              className={
                  `${isShowLinkItem ? 'max-h-56 ' : 'max-h-0 '}` +
                  'order-1 md:static absolute  md:max-h-none h-auto transition-all md:transition-none shadow md:shadow-none rounded-b-lg md:rounded-none left-0 px-2 bg-white md:w-auto top-full overflow-hidden w-full z-10'
              }
          >
            <NavbarLinkItem item={navbarItem} logout={handleLogout}/>
          </div>
        </div>
      </nav>
  );
};

export default Navbar;
