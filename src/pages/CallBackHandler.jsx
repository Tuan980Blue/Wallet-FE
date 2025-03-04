import {useNavigate, useSearchParams} from 'react-router-dom';
import {useEffect} from 'react';
import {ssoCallback} from '../modules/auth/auth.js';
import {setToken} from '../util/token.util.js';
import {getCookie, removeCookie} from '../util/cookie.util.js';

export const callBackUrl = '/sso/callback';

const CallBackHandler = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const returnUrl = getCookie('returnUrl');

  const token = searchParams.get('Token');
  useEffect(() => {
    if (token) {
      try {
        setToken(token);
        ssoCallback().then(() => {
          removeCookie('returnUrl');
          location.href = returnUrl ?? '/home';
        });
      }
      catch (e) {
        navigate('/sign-in');
      }
    }
  }, [navigate, returnUrl, token]);
  return (
      <div/>
  );
};

export default CallBackHandler;