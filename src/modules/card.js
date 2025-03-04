import {wPost} from '../util/request.util.js';

export async function addCard({
                                cardNumber, atmId, cvv, holderName, month, year, expired,
                              })
{
  return (await wPost('/v1/card', {
    cardNumber, atmId, cvv, holderName, month, year, expired,
  })).data;
}