import {wGet, wPost} from '../../util/request.util.js';

export async function getMyWallet() {
  return (await wGet(`/v1/user/wallet`));
}

export async function transfer({sourceId, senderId, receiverId, money, description}) {
  return (await wPost(`/v2/transfer`, {
    sourceId,
    senderId,
    receiverId,
    money,
    description,
  }));
}

export function validateExpiredTime(expired) {
  if (!expired || expired.length === 0) return 'Không được để trống';

  let [month, year] = expired.split('/');

  const now = new Date();
  const currentYear = now.getFullYear().toString().slice(2);
  if (now.getMonth() < month || month <= 0) return 'Thời gian hết hạn không hợp lệ';
  console.log(currentYear);
  if (year < currentYear || year <= 0) return 'Thời gian hết hạn không hợp lệ';
}