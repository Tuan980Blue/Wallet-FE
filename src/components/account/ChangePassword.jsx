import { useState } from 'react';
import { FaLock } from "react-icons/fa"; // lock-icon
import ReCAPTCHA from "react-google-recaptcha"; // reCAPTCHA
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { wPost } from '../../util/request.util.js';
import ManagementPersonalInfo from './ManagementPersonalInfo.jsx';

const ChangePassword = () => {
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showReNewPassword, setShowReNewPassword] = useState(false);
    const [oldPasswordInput, setOldPasswordInput] = useState('');
    const [newPasswordInput, setNewPasswordInput] = useState('');
    const [reNewPasswordInput, setReNewPasswordInput] = useState('');
    const [error, setError] = useState('');
    const [oldPasswordTouched, setOldPasswordTouched] = useState(false);
    const [newPasswordTouched, setNewPasswordTouched] = useState(false);
    const [reNewPasswordTouched, setReNewPasswordTouched] = useState(false);
    const [recaptchaVerified, setRecaptchaVerified] = useState(false);
    const [changePasswordCompleted, setChangePasswordCompleted] = useState(false); 

    const toggleOldPasswordVisibility = () => {
        setShowOldPassword(!showOldPassword);
    };

    const toggleNewPasswordVisibility = () => {
        setShowNewPassword(!showNewPassword);
    };

    const toggleReNewPasswordVisibility = () => {
        setShowReNewPassword(!showReNewPassword);
    };

    const handleRecaptchaChange = (value) => {
        console.log("Captcha value:", value);
        if (value) {
            setRecaptchaVerified(true);
        } else {
            setRecaptchaVerified(false);
        }
    };


    async function handleSubmit() {
        if (!recaptchaVerified) {
            toast.error('Vui lòng xác nhận bạn không phải là robot');
        }  
        else if (newPasswordInput !== reNewPasswordInput) {
            toast.error('Mật khẩu mới không khớp');
        } 
        else if (newPasswordInput.length < 7 || newPasswordInput.length > 20 || !/[A-Z]/.test(newPasswordInput) || !/[a-z]/.test(newPasswordInput) || !/[!@#$%^&*()_+{}[\]:;<>,.?~]/.test(newPasswordInput)) {
            toast.error('Mật khẩu mới không hợp lệ !');
        } 
        else {
            setError('');
            wPost("/v1/user/password",{
                oldPassword: oldPasswordInput,
                newPassword: newPasswordInput
            })
            .then((res) => {
                if(res.data.user){
                    setChangePasswordCompleted(true);
                } else{
                    toast.error(res.data.message);
                }
            })
            .catch((res) => {
                if (res.data && res.data.message) {
                    toast.error(res.data.message);
                }
            });
        }
    }

    const handleOldPasswordChange = (e) => {
        setOldPasswordInput(e.target.value);
        setOldPasswordTouched(true);
        if (e.target.value === '') {
            setError('Mật khẩu cũ không được để trống');
        } else {
            setError('');
        }
    };

    const handleOldPasswordBlur = () => {
        setOldPasswordTouched(true);
        if (oldPasswordInput === '') {
            setError('Mật khẩu cũ không được để trống');
        }
    };

    const handleNewPasswordChange = (e) => {
        setNewPasswordInput(e.target.value);
        setNewPasswordTouched(true);
    };

    const handleReNewPasswordChange = (e) => {
        setReNewPasswordInput(e.target.value);
        setReNewPasswordTouched(true);
    };

    if (changePasswordCompleted) {
        return <ManagementPersonalInfo/>;
    }

    return (
        <div className="transaction-account grid grid-rows-10 gap-x-3 ml-2 bg-white w-auto h-auto rounded-lg p-2 pb-9">
            <div className="info-header row-span-1 ml-2 items-center mt-2 flex mb-1">
                <div className="text-primaryColor"><FaLock size={20} /></div>
                <div className="font-normal text-md ml-2">ĐỔI MẬT KHẨU</div>
                <div className="ml-auto font-normal text-md mr-5 text-primaryColor">BƯỚC 1/2</div>
            </div>
            <div className="info-container row-span-9 ml-2 mt-3 flex flex-col space-y-9">
                <div className="lg:flex items-center">
                    <p className="w-48 flex-none text-left lg:text-right ml-20 lg:ml-0 mr-3 text-textGray0 font-medium text-base">Mật khẩu cũ</p>
                    <div className="relative lg:w-1/2 w-1/2 ml-20 lg:ml-0 mt-2 lg:mt-0">
                        <input
                            type={showOldPassword ? "text" : "password"}
                            className={`border rounded p-2 sm:w-full ${oldPasswordTouched && (oldPasswordInput === '' ? 'border-red-500' : 'border-green-500')}`}
                            placeholder="Nhập mật khẩu cũ"
                            value={oldPasswordInput}
                            onChange={handleOldPasswordChange}
                            onBlur={handleOldPasswordBlur}
                        />
                        <div
                            className="absolute top-1/2 transform -translate-y-1/2 right-2 cursor-pointer"
                            onClick={toggleOldPasswordVisibility}
                        >
                        </div>
                        {error && oldPasswordTouched && oldPasswordInput === '' && (
                            <p className="absolute mt-1 text-xs text-red-500">
                                {error}
                            </p>
                        )}
                    </div>
                </div>
                <div className="lg:flex items-center">
                    <p className="w-48 flex-none text-left lg:text-right ml-20 lg:ml-0 mr-3 text-textGray0 font-medium text-base">Mật khẩu mới</p>
                    <div className="relative lg:w-1/2 w-1/2 ml-20 lg:ml-0 mt-2 lg:mt-0">
                        <input
                            type={showNewPassword ? "text" : "password"}
                            className={`border rounded p-2 sm:w-full ${newPasswordTouched && (newPasswordInput === '' || !(/[A-Z]/.test(newPasswordInput) && /[a-z]/.test(newPasswordInput) && /[!@#$%^&*()_+{}[\]:;<>,.?~]/.test(newPasswordInput))) ? 'border-red-500' : 'border-green-500'}`}
                            placeholder="Nhập mật khẩu mới"
                            value={newPasswordInput}
                            onChange={handleNewPasswordChange}
                        />
                        <div
                            className="absolute top-1/2 transform -translate-y-1/2 right-2 cursor-pointer"
                            onClick={toggleNewPasswordVisibility}
                        >
                        </div>
                        {newPasswordInput !== '' && !(/[A-Z]/.test(newPasswordInput) && /[a-z]/.test(newPasswordInput) && /[!@#$%^&*()_+{}[\]:;<>,.?~]/.test(newPasswordInput)) && (
                            <p className="absolute mt-1 text-xs text-red-500">
                                Mật khẩu phải từ 7-20 ký tự, bao gồm chữ cái hoa, thường và ký tự đặc biệt
                            </p>
                        )}
                    </div>
                </div>
                <div className="lg:flex items-center">
                    <p className="w-48 flex-none text-left lg:text-right ml-20 lg:ml-0 mr-3 text-textGray0 font-medium text-base">Xác nhận mật khẩu mới</p>
                    <div className="relative lg:w-1/2 w-1/2 ml-20 lg:ml-0 mt-2 lg:mt-0">
                        <input
                            type={showReNewPassword ? "text" : "password"}
                            className={`border rounded p-2 sm:w-full ${reNewPasswordTouched && (reNewPasswordInput !== newPasswordInput || reNewPasswordInput === '') ? 'border-red-500' : 'border-green-500'}`}
                            placeholder="Nhập lại mật khẩu mới"
                            value={reNewPasswordInput}
                            onChange={handleReNewPasswordChange}
                        />
                        <div
                            className="absolute top-1/2 transform -translate-y-1/2 right-2 cursor-pointer"
                            onClick={toggleReNewPasswordVisibility}
                        >
                        </div>
                        {reNewPasswordInput !== newPasswordInput && reNewPasswordInput !== '' && (
                            <p className="absolute mt-1 text-xs text-red-500">
                                Mật khẩu không khớp
                            </p>
                        )}
                    </div>
                </div>
                <div className="lg:flex items-center">
                    <p className="w-48 flex-none text-left lg:text-right mr-3 ml-20 lg:ml-0 text-textGray0 font-medium text-base">Xác nhận bảo mật</p>
                    <div className="relative mt-2 lg:mt-0">
                        <ReCAPTCHA 
                            sitekey="6LesSQ8qAAAAAKqx5VBJpBKKrbX_M4t4cEeHsa-e"
                            onChange={handleRecaptchaChange}
                        />
                        {error && !recaptchaVerified && (
                            <p className="absolute mt-1 text-xs text-red-500">
                                Vui lòng xác nhận bạn không phải là robot
                            </p>
                        )}
                    </div>
                </div>
                <div className="flex items-center mt-auto justify-end mr-5">
                    <button
                        className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        onClick={handleSubmit}
                    >
                        Tiếp tục
                        <ToastContainer />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;
