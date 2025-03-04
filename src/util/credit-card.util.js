export function monthValidator(month, values) {

  if (!month || month?.length === 0) return 'Tháng không hợp lệ';

  if (month < 1 || month > 12) {
    return 'Tháng không hợp lệ';
  }

  const year = values?.year;
  const currentYear = new Date().getFullYear() % 100;

  if (parseInt(year) === currentYear) {
    const currentMonth = new Date().getMonth() + 1;
    if (parseInt(month) < currentMonth) {
      return 'Thẻ đã hết hạn!';
    }
  }

}

export function yearValidator(value) {
  if (!value || value?.length !== 2) return 'Năm không hợp lệ';

  const currentYear = new Date().getFullYear() % 100;

  if (parseInt(value) < currentYear) return 'Năm không hợp lệ';
}

export function cardNumberValidator(value) {
  const onlyNumberPattern = /\D/g;
  if (onlyNumberPattern.test(value)) return 'Số thẻ không hợp lệ';
  if (!value || value?.toString().length !== 16) return 'Số thẻ phải chứa 16 ký tự';
}

export function holderNameValidator(value) {
  if (!value) return 'Tên chủ thẻ không hợp lệ';
  if (value.toString().length > 60) return 'Tên chủ thẻ không thể quá 60 ký tự';
  if (value.toString().length < 3) return 'Tên chủ thẻ không thể ít hơn 3 ký tự';
  const containNumberOrderSpecialCharactor = /[^ a-zA-Z]/g;
  if (containNumberOrderSpecialCharactor.test(value)) return 'Tên chủ thẻ không thể chứa số hoặc ký tự đặc biệt';
}
