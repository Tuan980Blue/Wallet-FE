import { FaIdCard } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const IdentityAuth = () => {
    const navigate = useNavigate();

    const handleManual = () => {
        navigate('/management-personal/manual-auth');
    };

    const handleBack = () => {
        navigate('/management-personal');
    };


    return (
        <div className="transaction-account grid grid-rows-10 gap-x-3 ml-2 bg-white w-auto h-auto rounded-lg p-2 pb-9">
            <div className="info-header row-span-1 ml-2 items-center mt-2 flex mb-1">
                <div className="text-primaryColor"><FaIdCard size={20} /></div>
                <div className="font-normal text-md ml-2">XÁC THỰC DANH TÍNH</div>
            </div>

            <div className="info-container row-span-9 w-auto lg:w-auto mx-3 mt-3 flex flex-col h-auto">
                <div className="border-1 border-borderColor xl:w-1/2 w-auto h-auto lg:h-auto rounded-xl">
                    <div className="mx-5 mt-5">
                        <p className="text-primaryColor font-semibold text-base">Tự chứng thực</p>
                        <p className="text-textGray font-normal mt-6 mb-5">
                            Điền đầy đủ thông tin cá nhân và tải lên hình chụp CCCD/Hộ chiếu còn hiệu lực pháp lý & hình chụp chân dung chủ sở hữu {`>`} Nhấn hoàn tất, chờ duyệt trong vòng 02 giờ làm việc.
                        </p>
                        <div className="w-full h-auto border border-primaryColor mb-4 xl:mb-4 rounded-md items-center flex align-middle justify-center mt-4 hover:bg-primaryColor hover:text-white cursor-pointer text-primaryColor"
                             onClick={handleManual}
                        >
                            <p className="my-2">Chọn</p>
                        </div>
                    </div>
                </div>

                <div className="w-full h-auto bg-gray-100 rounded-md mt-9">
                    <div className="mx-5 my-3">
                        <p className="text-primaryColor font-semibold text-base">Thông báo:</p>
                        <p className="text-black font-normal text-base">
                            Tài khoản của bạn chưa được xác nhận. Xin vui lòng thực hiện các bước xác nhận để được sử dụng đầy đủ các dịch vụ của Ngân Lượng. Xin trân trọng cảm ơn!
                        </p>
                    </div>
                </div>

                <div className="flex items-center mt-6 justify-end">
                    <button
                        className="hover:bg-primaryColor hover:text-white rounded-md border mb-3 lg:mb-0 border-primaryColor py-2 px-4 font-medium"
                        onClick={handleBack}
                    >
                        Quay Lại
                    </button>
                </div>
            </div>
        </div>
    );
};

export default IdentityAuth;
