import {parse} from 'cookie';
import {removeCookie, setCookie} from './cookie.util.js';
import {decodeJwt} from 'jose';

export function getToken() {
  const cookies = parse(document.cookie);
  return cookies['Token'];
}

export function setToken(token) {
  setCookie('Token', token, 60 * 60 * 24 * 7);
}

export function removeToken() {
  removeCookie('Token');
}

export function getAuthByToken() {
  try {
    const account = decodeJwt(getToken());
    if (account.role === 'user') account.id = account.userId;
    if (account.role === 'partner') account.id = account.partnerId;
    return account;
  }
  catch (e) {
    return null;
  }
}