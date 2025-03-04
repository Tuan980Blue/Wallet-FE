export function formatCurrency(amount) {
  if (typeof amount !== 'number') return '';
  return amount.toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });
}