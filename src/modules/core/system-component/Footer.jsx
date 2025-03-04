import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";

const Footer = () => {
  return (
    <footer className="bg-gray-800 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap flex-col md:flex-row justify-between items-start w-full">
          <div className="text-white flex flex-col gap-2 w-full md:w-1/2 lg:w-1/4 p-2">
            <div className="flex items-center mb-2">
              <img src="#" alt="Liên hệ" className="w-6 h-6 mr-2" />
              <span className="text-lg font-semibold">OggyE-Wallet.vn</span>
            </div>
            <p>Công ty Cổ phần Cổng trung gian thanh toán OggyEwallet</p>
            <p>
              Giấy Phép cung ứng dịch vụ Trung gian Thanh toán số 22/GP-NHNN của
              Ngân hàng Nhà nước Việt Nam
            </p>
            <div className="flex items-center">
              <a href="#" className="block mr-4">
                <img src="#" alt="" className="w-20 h-10" />
              </a>
              <a href="#" className="block">
                <img src="#" alt="" className="w-20 h-10" />
              </a>
            </div>
          </div>
          <div className="text-white flex flex-col gap-2 w-full md:w-1/2 lg:w-1/4 p-2">
            <h3 className="text-lg font-semibold mb-2">Điều khoản</h3>
            <div>
              <a href="#" className="flex items-start">
                <IoIosArrowForward size={20} />
                <p className="ml-2">Thỏa thuận người dùng</p>
              </a>
            </div>
            <div>
              <a href="#" className="flex items-start">
                <IoIosArrowForward size={20} />
                <p className="ml-2"> Quyền riêng tư</p>
              </a>
            </div>
            <div>
              <a href="#" className="flex items-start">
                <IoIosArrowForward size={20} />
                <p className="ml-2">Quy định - chính sách</p>
              </a>
            </div>
          </div>

          <div className="text-white flex flex-col gap-2 w-full md:w-1/2 lg:w-1/4 p-2">
            <h3 className="text-lg font-semibold mb-2">Hotline</h3>
            <p>Email: contact@example.com</p>
            <p>Điện thoại: +84 123 456 789</p>
            <p>Địa chỉ: Số 123 Đường ABC, Quận XYZ, TP HCM</p>
          </div>
          <div className="text-white flex flex-col gap-2 w-full md:w-1/2 lg:w-1/4 p-2 ">
            <h3 className="text-lg font-semibold mb-2">Địa chỉ</h3>
            <p>Email: contact@example.com</p>
            <p>Điện thoại: +84 123 456 789</p>
            <p>Địa chỉ: Số 123 Đường ABC, Quận XYZ, TP HCM</p>
          </div>
        </div>

        <div className="text-white flex flex-col w-full gap-2 md:flex-col mt-4">
          <h3 className="text-lg font-semibold mb-2">Giới thiệu</h3>
          <div>
            <a href="#" className="flex items-center">
              <IoIosArrowForward size={20} />
              <p className="ml-2">Về chúng tôi</p>
            </a>
          </div>
          <div>
            <a href="#" className="flex items-center">
              <IoIosArrowForward size={20} />
              <p className="ml-2">Tin tức</p>
            </a>
          </div>
          <div>
            <a href="#" className="flex items-center">
              <IoIosArrowForward size={20} />
              <p className="ml-2">Liên hệ</p>
            </a>
          </div>
        </div>

        <div className="mt-6 text-center text-white">
          <h3 className="text-lg font-semibold mb-2">Theo dõi chúng tôi</h3>
          <div className="flex justify-center space-x-4">
            <a href="#" className="text-gray-400 hover:text-white mx-2">
              <FaFacebook size={24} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white mx-2">
              <FaTwitter size={24} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white mx-2">
              <FaLinkedin size={24} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white mx-2">
              <FaInstagram size={24} />
            </a>
          </div>
        </div>
        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm">
            Bản quyền © 2024-2025 oggyEwallet.vn. Hệ thống thanh toán trực
            tuyến bảo vệ người mua hàng đầu Việt Nam.
          </p>
        </div>
      </div>
    </footer>
  );
};


export default Footer;
