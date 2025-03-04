import {wGet, wPost} from '../util/request.util.js';

export async function transfer({sourceId, receiverId, amount, message, otp}) {
  return (await wPost('/v2/transfer',
      {
        sourceId,
        receiverId,
        amount,
        message,
        otp,
      }));

}

export async function transfer_v2({sourceId, receiverId, money, message, otp}) {
  return (await wPost('/v2/transfer',
      {
        sourceId,
        receiverId,
        money,
        message,
        otp,
      }));

}

export async function checkUser(userUnique) {
  if (!userUnique || userUnique.length === 0) {
    return false;
  }
  return (await wGet(`/v1/transfer/check/${userUnique}`));
}

export async function payOrder(orderId) {
  if (!orderId) {
    return false;
  }

  return (await wPost(`/v1/pay/${orderId}`));
}