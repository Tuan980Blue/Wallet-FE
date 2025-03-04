import 'rsuite/dist/rsuite.min.css';
import {Button} from '@mantine/core';
import {setTitle} from '../../util/title.util.js';
import {callBackUrl} from '../CallBackHandler.jsx';
import {sso} from '../../SSO.jsx';
import {setCookie} from '../../util/cookie.util.js';
import {useSearchParams} from 'react-router-dom';

const SignInPage = () => {
  setTitle('Đăng nhập - WoWoWallet');
  const [searchParams] = useSearchParams();

  setCookie('returnUrl', searchParams.get('returnUrl') ?? '/home', 60 * 10);

  const handleLogin = () => {
    sso.redirectToLogin(location.origin + callBackUrl);
  };

  return (
      <div className="min-h-screen w-full p-4 overflow-hidden bg-gray-100 text-gray-900 flex justify-center">
        <div
            className="w-full m-0 bg-white rounded-lg overflow-hidden shadow sm:rounded-lg flex justify-center flex-1">
          <div className="flex-1 bg-green-100 text-center hidden sm:flex">
            <div
                className="w-full bg-contain bg-center bg-no-repeat"
                style={{
                  backgroundImage: 'url("/login_banner.webp")',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                }}
            >
              <div
                  className={'w-full h-full opacity-15'}
                  style={{
                    backgroundImage: 'url("/noise.png")',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'repeat-x',
                  }}
              ></div>
            </div>
          </div>
          <div
              className="sm:w-3/5 relative z-10 w-full flex justify-center items-center md:w-1/2 lg:w-5/12 md:p-6 sm:p-12">
            <div className="w-full flex flex-col justify-center items-center">
              <Button onClick={handleLogin} className={'py-1 px-2'}>
                Đăng nhập bằng tài khoản OGGYCLUB
              </Button>
            </div>
          </div>
        </div>
      </div>
  );
};

export default SignInPage;
