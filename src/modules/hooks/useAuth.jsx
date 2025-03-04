import {createContext, useContext, useEffect, useState} from 'react';
import {getToken, removeToken} from '../../util/token.util.js';
import {getUser} from '../user/user.js';
import {removeCookie, setCookie} from '../../util/cookie.util.js';
import {Modal} from '@mantine/core';
import {useLocalStorage} from '@mantine/hooks';
import {startRegistration} from '@simplewebauthn/browser';
import axios from 'axios';

const AuthContext = createContext({});
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
export const AuthProvider = (props) => {
  const [auth, setAuth] = useState({
    user: null,
  });
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [webauthn, setWebAuthn] = useLocalStorage({
    defaultValue: {},
    deserialize: JSON.parse,
    serialize: JSON.stringify,
    key: 'webauthn',
  });

  useEffect(() => {
    removeCookie('userId');
    if (getToken() !== null) {
      getUser().then((user) => {
        setCookie('userId', user.id, 9999999, 'htilssu.id.vn');
        setAuth({
          user: user,
        });
        setLoading(false);
      }).catch(() => {
        setLoading(false);
      });
    }
  }, []);

  useEffect(() => {

    const ressp = axios.get('https://sso.htilssu.id.vn/v1/generate-auth', {
      withCredentials: true,
    });

    ressp.then(async (res) => {
      const data = res.data;
      setWebAuthn(JSON.stringify(data));
    }).catch((e) => {
      const resp = axios.get('https://sso.htilssu.id.vn/v1/generate-registration', {
        withCredentials: true,
      });

      resp.then(async (res) => {
        const data = await startRegistration({optionsJSON: res.data});
        await axios.post('https://sso.htilssu.id.vn/v1/verify-registration', data, {
          withCredentials: true,
        });
        location.reload();
      });
    });

  }, [auth, setWebAuthn]);

  function handleSetUser(user) {
    setAuth((prevAuth) => ({
      ...prevAuth,
      user: user,
    }));
  }

  function handleLogout() {
    removeToken();
    setAuth({
      user: null,
    });
  }

  return (
      <AuthContext.Provider
          value={{
            user: auth.user,
            login: handleSetUser,
            logout: handleLogout,
            loading,
          }}
      >
        {props.children}
        <Modal opened={isOpen} onClose={() => {
          setIsOpen(false);
        }}>

        </Modal>
      </AuthContext.Provider>
  );
};
