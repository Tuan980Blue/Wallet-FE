export function creditCardFormat(number) {
  return number.replace(/\d{4}(?=.)/g, '$& ');
}

export function getRevealFormat(number) {
  return number.replace(/\d{4}(?=.)/g, '•••• ');
}