import {wPost} from '../util/request.util.js';

export function withdraw(sourceId, amount) {
  return wPost('/v1/withdraw', {
    amount: amount,
    sourceId: sourceId,
  });
}