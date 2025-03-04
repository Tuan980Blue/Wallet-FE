import { FaShield } from "react-icons/fa6";//shield-icon
import { FaPhoneAlt } from "react-icons/fa";//phone-icon
import { FaCheckCircle } from "react-icons/fa";//check-icon

const SettingAdmitTransaction = () => {
    //ManagementAccount <- SettingAdmitTransaction(Outlet)
    return(
        <div className="transaction-account grid grid-rows-10 gap-x-3 ml-2 bg-white w-auto h-auto rounded-lg p-2 pb-9">
            <div className="info-header row-span-1 ml-2 items-center mt-2 flex mb-1">
                <div className="text-primaryColor"><FaShield size={20}/></div>
                <div className="font-normal text-md ml-2">CẤU HÌNH XÁC THỰC GIAO DỊCH</div>
            </div>
            <div className="info-container row-span-9 ml-2 items-center mt-3">
                <div className="max-w-96 h-full items-center rounded-lg border-green-400 border-1">
                    <div className="grid grid-rows-4 items-center w-auto h-full ml-5"> 
                        <div className="row-span-1 flex items-center text-primaryColor">
                            <div className="mt-1 mr-3"><FaPhoneAlt /></div>
                            <p className="font-medium text-base">Số điện thoại</p>
                        </div>
                        <div className="row-span-1">
                            <p className="mr-3 text-sm text-textGray">
                                Khi thực hiện giao dịch hoặc thay đổi thông tin tài khoản, hệ thống sẽ gửi một mã ngẫu nhiên (OTP - One Time Password: Mật khẩu chỉ dùng một lần) vào số điện thoại bạn đã đăng ký.
                            </p>
                        </div>
                        <div className="row-span-1 grid grid-cols-9 mr-3 mt-4">
                            <div className="col-span-3">
                                <p className="text-sm font-bold">Ưu điểm</p>
                                <p className="text-xs text-textGray mt-0.7">An toàn tuyệt đối</p>
                            </div>
                                <div className="col-span-1 border-l-1 border-borderColor max-w-2"></div>
                            <div className="col-span-4">
                                <p className="text-sm font-bold">Hạn chế</p>
                                <p className="text-xs text-textGray mt-0.7">Phụ thuộc vào tình trạng nhà mạng cung cấp dịch vụ di động mà bạn đang sử dụng.</p>
                            </div>
                        </div>
                        <div className="row-span-1 items-center flex align-middle justify-center ">
                            <div className="text-green-400 mr-3 mt-0.5"><FaCheckCircle size={17}/></div>
                            <p className="text-green-400 font-bold">Đang sử dụng</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SettingAdmitTransaction;