import {useState} from 'react';
import {ScrollRestoration} from 'react-router-dom';
import {Button, PinInput} from '@mantine/core';
import {useDisclosure} from '@mantine/hooks';

const OTPForm = ({
                   sendTo,
                   onSubmit,
                   onResendOtp,
                 }) => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState(undefined);
  const [resendTime, setResendTime] = useState();
  const [loading, {close, open}] = useDisclosure();

  function onPinInputChange(value) {
    setError(null);
    setOtp(value);
  }

  async function onSubmitOtp(e) {
    setError(null);
    e.preventDefault();
    if (otp.length < 6) {
      setError('Mã OTP phải có 6 chữ số');
      return;
    }
    open();
    onSubmit(otp).then(() => {
      close();
    }).catch((e) => {
      setError(e.response.data.message);
      close();
    });
  }

  return (
      <div className={''}>
        <div className="flex flex-col items-center">
          <div className="bg-white rounded-lg overflow-hidden shadow-md w-full max-w-md p-4 border-1">
            <div className="flex flex-col items-center">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Xác thực OTP
              </h2>
              <p className="text-gray-600 text-center">
                Nhập mã OTP được gửi đến Email:
              </p>
              <div className="font-medium text-md text-gray-800 mb-4">
                {sendTo}
              </div>
            </div>
            <form onSubmit={onSubmitOtp} className="space-y-6">
              <div className="flex flex-col justify-center items-center">
                <PinInput
                    length={6}
                    type={/^[0-9]*$/}
                    inputMode="numeric"
                    value={otp}
                    oneTimeCode
                    onChange={onPinInputChange}
                />
                {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
              </div>

              <div className="flex justify-between items-center gap-6">
                <Button
                    loading={loading}
                    type="submit"
                    className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2"
                >
                  Xác nhận
                </Button>
              </div>
            </form>
            <div className="mt-6 text-center">
              {resendTime > 0 ? (
                  <p className="text-gray-600">
                    Mã OTP hết hiệu lực sau:{' '}
                    <span className="font-medium text-red-600">{resendTime}s</span>
                  </p>
              ) : (
                   <button
                       onClick={onResendOtp}
                       disabled={false}
                       className="text-blue-500 hover:underline"
                   >
                     {'Gửi lại OTP'}
                   </button>
               )}
            </div>
          </div>
        </div>
        <ScrollRestoration/>
      </div>
  );
};

export default OTPForm;
