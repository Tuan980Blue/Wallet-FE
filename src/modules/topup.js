import {wPost} from '../util/request.util.js';

function topUpByAtmCard(walletId, amount, sourceId) {
  return wPost(
      '/v1/top-up',
      {
        to: walletId,
        amount: amount,
        method: 'ATM_CARD',
        sourceId: sourceId,
      },
  );
}

export async function topUp(walletId, amount, topUpMethod, sourceId) {
  switch (topUpMethod) {
    case 'PAYPAL':
      return topUpByPaypal(walletId, amount);
    case 'ATM_CARD':
      return topUpByAtmCard(walletId, amount, sourceId);
    default:
      return null;
  }
}

function topUpByPaypal(walletId, amount) {
  return wPost(
      '/v1/top-up',
      {
        to: walletId,
        amount: amount,
        method: 'PAYPAL',
      },
  );
}