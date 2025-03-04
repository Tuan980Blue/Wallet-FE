import {ScrollRestoration, useLocation, useNavigate} from 'react-router-dom';
import {FaMoneyBillTransfer} from 'react-icons/fa6';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSpinner} from '@fortawesome/free-solid-svg-icons';
import {useEffect, useState} from "react";

const BankTransferModal = () => {
    const location = useLocation();
    const {bank, amount, methodPay} = location.state;

    //back trang truoc
    const navigate = useNavigate();

    //xét thòi gian
    const [countdown, setCountdown] = useState(900);
    const [showProcessing, setShowProcessing] = useState(true);
    const [transactionSuccess, setTransactionSuccess] = useState(false);
    const [transactionFailed, setTransactionFailed] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (countdown > 0) {
                setCountdown(countdown - 1);
            } else {
                setShowProcessing(false);
                setTransactionFailed(true);
                // Thực hiện hành động khi đếm ngược hoàn thành (giao dịch thất bại)
            }
        }, 1000); // Cập nhật đếm ngược mỗi giây

        return () => clearTimeout(timer); // Dọn dẹp timer khi unmount component
    }, [countdown]);

    // Mô phỏng giao dịch thành công sau 20 giây
    useEffect(() => {
        const successTimer = setTimeout(() => {
            handleTransactionSuccess();
        }, 30000);

        return () => clearTimeout(successTimer); // Dọn dẹp timer khi unmount component
    }, []);

    // Hàm xử lý khi giao dịch thành công
    const handleTransactionSuccess = () => {
        setShowProcessing(false);
        setTransactionSuccess(true);
        // Thực hiện hành động khi giao dịch thành công
    };

    // Hàm xử lý khi đóng trang
    const handleClosePage = () => {
        navigate(-1); // Điều hướng về trang trước đó
    };

    const user = {
        name: "NGUYỄN ANH TUẤN",
        email: "tuanmeo980provip@gmail.com",
    };

    return (
        <div>
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                {bank ? (
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl">
                        <div
                            className="flex items-center p-6 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-t-lg">
                            <FaMoneyBillTransfer size={30}/>
                            <h2 className="text-2xl font-bold ml-3">{methodPay}</h2>
                        </div>
                        <div className="p-6 space-y-5">
                            <div className="text-gray-900">
                                <p className="mb-4">Bạn đã chọn ngân hàng: <strong>{bank.name}</strong></p>
                                <p className="mb-4">
                                    Vui lòng chuyển khoản Online LUÔN & NGAY cho E-Wallet.vn bằng 1 trong 2 phương tiện
                                    dưới
                                    đây để hoàn tất giao dịch thanh toán:
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex flex-col items-center p-4 border border-gray-200 rounded-lg">
                                        <img src="/MSB_Mobile.png" alt="Mobile App" className="max-w-full h-auto mb-2"/>
                                        <p className="text-center">PHƯƠNG THỨC 1: Mở ứng dụng (Mobile App) Mobile
                                            Banking
                                            trên điện thoại</p>
                                    </div>
                                    <div className="flex flex-col items-center p-4 border border-gray-200 rounded-lg">
                                        <img src="/MSB_Web.png" alt="Internet Banking"
                                             className="max-w-full h-auto mb-2"/>
                                        <p className="text-center">PHƯƠNG THỨC 2: Đăng nhập vào Website Internet Banking
                                            của
                                            ngân hàng</p>
                                    </div>
                                </div>
                                <p className="mt-4">
                                    Hãy copy chính xác số tài khoản, nội dung chuyển khoản để Oggy E-Wallet ghi nhận
                                    giao dịch
                                    chính xác và nhanh nhất.
                                </p>
                            </div>
                            <div className="border p-4 rounded-lg bg-gray-50">
                                <h3 className="text-xl font-semibold mb-2">CHUYỂN KHOẢN NHẬN NGAY 24/7</h3>
                                <div className="space-y-2">
                                    <div className={"flex flex-row items-center gap-2"}>
                                        <p className={"font-semibold"}>Email:</p>
                                        <h3>{user.email}</h3>
                                    </div>
                                    <div className={"flex flex-row items-center gap-2"}>
                                        <p className={"font-semibold"}>Số tài khoản:</p>
                                        <h3>9686686660000000001</h3>
                                    </div>
                                    <div className={"flex flex-row items-center gap-2"}>
                                        <p className={"font-semibold"}>Tên chủ tài khoản:</p>
                                        <h3>Công ty CP công trung gian thanh toán Ngân Lượng</h3>
                                    </div>
                                    <div className={"flex flex-row items-center gap-2"}>
                                        <p className={"font-semibold"}>Ngân hàng:</p>
                                        <h3>MSB - Ngân hàng TMCP Hàng Hải Việt Nam</h3>
                                    </div>
                                    <div className="flex flex-row items-center gap-2">
                                        <p className="font-semibold">Số tiền:</p>
                                        <h3>{new Intl.NumberFormat('vi-VN', {
                                            style: 'currency',
                                            currency: 'VND'
                                        }).format(amount)}</h3>
                                    </div>
                                    <div className={"flex flex-row items-center gap-2"}>
                                        <p className={"font-semibold"}>Nội dung:</p>
                                        <h3>NL43145206TF</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="border p-4 rounded-lg bg-gray-50">
                                <h3 className="text-xl font-semibold mb-2">HOẶC QUÉT QR ĐỂ NẠP TIỀN</h3>
                                <div className="space-y-2 flex flex-col items-center">
                                    <img src="/qrCode.png" alt="QR Code"
                                         className="max-w-full h-auto w-auto mx-auto mb-2"/>
                                    <p className="text-sm text-gray-500">Lưu ý: Mã QRcode trên chỉ sử dụng 1 lần</p>
                                </div>
                            </div>
                        </div>
                        {showProcessing && (
                            <div className="p-6 bg-gray-100 rounded-b-lg text-center">
                                <div className="mb-4">
                                    <FontAwesomeIcon icon={faSpinner} spin pulse size="3x" className="text-red-500"/>
                                </div>
                                <p className="text-red-600 font-bold mb-2">Giao dịch đang được xử lý</p>
                                <p className="text-gray-600 max-w-md mx-auto">
                                    Ngay khi nhận xác thực thành công từ phía Ngân hàng, chúng tôi sẽ gửi thông báo tới
                                    bạn!
                                </p>
                                <div className="flex flex-row items-center justify-center p-1 text-center">
                                    <div className="font-semibold mr-2">Hiệu lực còn:</div>
                                    <p className="text-gray-600 max-w-md p-1">
                                        {Math.floor(countdown / 60)} phút {countdown % 60} giây
                                    </p>
                                </div>
                            </div>
                        )}
                        {transactionSuccess && (
                            <div className="p-6 bg-green-100 rounded-b-lg text-center">
                                <p className="text-green-600 font-bold mb-2">Nạp tiền thành công!</p>
                                <p className="text-gray-600 max-w-md mx-auto">
                                    Chúng tôi đã nhận được xác thực thành công từ phía Ngân hàng.
                                </p>
                                <button onClick={handleClosePage}
                                        className="mt-4 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg">
                                    Đóng trang
                                </button>
                            </div>
                        )}
                        {transactionFailed && (
                            <div className="p-6 bg-red-100 rounded-b-lg text-center">
                                <p className="text-red-600 font-bold mb-2">Giao dịch thất bại!</p>
                                <p className="text-gray-600 max-w-md mx-auto">
                                    Chúng tôi không nhận được xác thực thành công từ phía Ngân hàng.
                                </p>
                                <button onClick={handleClosePage}
                                        className="mt-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg">
                                    Đóng trang
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <p className="text-center text-gray-700">Không có thông tin ngân hàng được chọn.</p>
                )}
            </div>
            <ScrollRestoration/>
        </div>
    );
};

export default BankTransferModal;