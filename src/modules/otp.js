import {wPost} from '../util/request.util.js';

export async function sendTransferMoneyOtp() {
  return (await wPost('v1/transfer/send-otp', {
    type: 'EMAIL',
  }));
}

export async function verifyTransferMoneyOtp(otp) {
  return (await wPost('v1/transfer/verify-otp', {otp: otp}));
}