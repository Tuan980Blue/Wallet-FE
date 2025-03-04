import {parse} from 'cookie';

function getCookie(name) {
  const cookies = parse(document.cookie);
  return cookies[name];
}

function setCookie(key, value, age, domain) {
  const secure = location.protocol === 'https:' ? 'Secure' : '';
  document.cookie = `${key}=${value};Path=/;Domain=${domain?? location.hostname}; Max-Age=${age};${secure}`;
}

function removeCookie(key) {
  document.cookie = `${key}=; Domain=${location.hostname}; Max-Age=0; Path=/`;
}

export {getCookie, setCookie, removeCookie};
