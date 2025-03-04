import { Link } from "react-router-dom";

const NavbarLinkItem = ({ item }) => {
  return (
    <div>
      <div
        className="items-center justify-between w-full md:flex md:w-auto md:order-1"
        id="navbar-user"
      >
        <div className="flex flex-col font-medium md:p-0 text-black rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
          {item.map((linkItem) => {
            return (
              <div key={linkItem.name}>
                <Link
                  className="block py-2 px-3 no-underline hover:no-underline
                   text-gray-900 rounded hover:bg-primary md:hover:bg-transparent md:hover:text-primary md:p-0"
                  to={linkItem.link}
                >
                  {linkItem.name}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NavbarLinkItem;
