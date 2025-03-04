const statusStrings = {
  PENDING: 'Đang chờ xử lý',
  SUCCESS: 'Thành công',
  CANCELLED: 'Đã hủy',
  REFUNDED: 'Đã hoàn tiền',
  undefined: 'Thành công'
};
const transactionStatusColor = {
  'PENDING': 'text-yellow-500',
  'SUCCESS': 'text-green-500',
  'FAILED': 'text-red-500',
  'CANCEL': 'text-gray-500',
  undefined: 'text-green-500'
};

export const transactionType = {
  'TRANSFER_MONEY': 'Chuyển tiền',
  'RECEIVE_MONEY': 'Nhận tiền',
  'TOP_UP': 'Nạp tiền',
  'WITHDRAW': 'Rút tiền',
  'TOP_UP_GROUP_FUND': 'Góp quỹ',
  'WITHDRAW_GROUP_FUND': 'Rút quỹ',
};

const statusColors = {
  PENDING: 'yellow',
  SUCCESS: 'green',
  CANCELLED: 'red',
  REFUNDED: 'gray',
  undefined: 'green-500'
};
export {statusStrings, transactionStatusColor, statusColors};