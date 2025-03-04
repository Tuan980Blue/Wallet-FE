import {Menu, MenuItem, Sidebar, SubMenu} from 'react-pro-sidebar';
import {Link, Outlet} from 'react-router-dom';
import {Suspense} from 'react';
import FullBlockLoading from './FullBlockLoading.jsx';

const PartnerLayout = () => {
  return (
      <div className={'min-h-screen flex w-full'}>
        <Sidebar className={'min-h-screen bg-white border border-gray-500'}>
          <Menu>
            <SubMenu label="Giao dịch">
              <MenuItem component={<Link to={'orders'}/>}>Danh sách giao dịch</MenuItem>
              {/*<MenuItem> Line charts </MenuItem>*/}
            </SubMenu>
            <MenuItem component={<Link to={'api-key'}/>}> Api-Key </MenuItem>
          </Menu>
        </Sidebar>
        <div className={'w-full h-full'}>
          <nav className={'h-18 w-full bg-black'}>

          </nav>
          <Suspense fallback={<FullBlockLoading/>}>
            <Outlet/>
          </Suspense>
        </div>
      </div>
  );
};

export default PartnerLayout;