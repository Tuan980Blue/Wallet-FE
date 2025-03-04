import {wGet, wPost} from '../../util/request.util.js';

export async function getUserWallet(userId) {
  return await wGet(`/v1/user/${userId}/wallet`);
}

export async function getUser() {
  return await wGet('/v1/user');
}

export async function resetPassword(email) {
  return await wPost("/v1/password/reset", {
    email: email
  })
}
