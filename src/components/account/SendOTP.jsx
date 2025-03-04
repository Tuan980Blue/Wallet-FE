import {useState} from 'react';
import OTPInput, {ResendOTP} from 'otp-input-react';
import {MdOutlineSendToMobile} from 'react-icons/md';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SendOTP = () => {
    const [OTP, setOTP] = useState("");

    const handleSubmit = () => {
        if (OTP !== correctOTP) {
            toast.error('Mã OTP không chính xác, vui lòng nhập lại !');
        } else {
            toast.success('Bạn đã đổi mật khẩu thành công');
        }
    };

    const handleBack = () =>{
        window.history.back();
    };

    return (
        <div className="transaction-account grid grid-rows-10 gap-x-3 ml-2 bg-white w-auto h-auto rounded-lg p-2 pb-9">
            <div className="info-header row-span-1 ml-2 items-center mt-2 flex mb-1">
                <div className="text-primaryColor"><MdOutlineSendToMobile size={20} /></div>
                <div className="font-normal text-md ml-2">ĐỔI MẬT KHẨU</div>
                <div className="ml-auto font-normal text-md mr-5 text-primaryColor">BƯỚC 2/2</div>
            </div>

            <div className="info-container row-span-9 mx-3 mt-3 flex flex-col border border-borderColor items-center h-128">
                <div className="text-primaryColor mt-9"><MdOutlineSendToMobile size={80} /></div>
                <p className="mt-4">Xác thực OTP</p>

                <div className="flex mt-4">
                    <p className="font-normal mr-2 mt-2">Nhập mã OTP được gửi đến số điện thoại</p>
                    <p className="font-semibold">0123456789</p>
                </div>

                <div className="mt-11">
                    <OTPInput
                        value={OTP}
                        onChange={setOTP}
                        autoFocus
                        OTPLength={4}
                        otpType="number"
                        disabled={false}
                        secure={true} //input dot
                        style={{
                            width: '500px',
                            height: '75px',
                            background: '#f7f7f7',
                            border: '1px solid #0f8be8',
                            borderRadius: '10px',
                            display: 'flex',
                            textAlign: 'center',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        inputStyles={{
                            height: '45px',
                            width: '35px',
                            background: '#f7f7f7',
                            border: 'none',
                            borderBottom: '2px solid #0f8be8',
                            margin: '0 5px',
                            transition: 'none',
                            outline: 'none',
                            boxShadow: 'none',
                        }}
                    />
                    <div className="mt-3">
                        <ResendOTP
                            style={{ fontSize: '14px', fontWeight: '500' }}
                            onResendClick={() => console.log("Resend clicked")}
                        />
                    </div>
                </div>

                <div className="flex gap-7 mt-7">
                    <div className="py-2 min-w-5 px-4 rounded-lg border-primaryColor border-2 cursor-pointer hover:bg-dimPrimaryColor" onClick={handleBack}>
                        <p>Hủy</p>
                    </div>
                    <div className="py-2 min-w-5 px-4 bg-primaryColor rounded-lg cursor-pointer hover:bg-blue-500" onClick={handleSubmit}>
                        <p className="text-white">Xác nhận</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SendOTP;
