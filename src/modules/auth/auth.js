import {wPost} from '../../util/request.util.js';

export async function signIn(userData) {
  if (userData.username && userData.password) {
    return await wPost('/v1/auth/sign-in', userData);
  }

  throw new Error('username hoặc password không được để trống');
}

export async function signUp(userData) {
  if (userData.username && userData.password) {
    return await wPost('/v1/auth/sign-up', userData);
  }

  throw new Error('username hoặc password không được để trống');
}

export async function ssoCallback() {
  return await wPost('/v1/auth/sso');
}
