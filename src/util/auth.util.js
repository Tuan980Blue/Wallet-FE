import {startAuthentication} from '@simplewebauthn/browser';
import axios from 'axios';

export async function handleAuth(callback) {
  const authJSON = await axios.get('https://sso.htilssu.id.vn/v1/generate-auth', {
    withCredentials: true,
  });
  if (authJSON.data === null) {
    return;
  }
  const asseResp = await startAuthentication({optionsJSON: authJSON.data});
  if (asseResp) {
    callback();
  }
}