import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import {FaCreditCard, FaMobileAlt, FaCode, FaLink, FaChartLine, FaAppStoreIos} from 'react-icons/fa';
import { MdTravelExplore } from "react-icons/md";
import { TbCreditCardPay } from "react-icons/tb";
import { BiSolidMoviePlay } from "react-icons/bi";
import { BiSupport } from "react-icons/bi";
import { FaAnchorLock, FaGroupArrowsRotate } from "react-icons/fa6";
import {Link} from 'react-router-dom'; // Import các icon từ thư viện React Icons

const items = [
    { link: "/invoices", icon: <TbCreditCardPay size={35} className="text-green-500" />, title: "Thanh toán hóa đơn" },
    { link: "/bank", icon: <FaLink size={30} className="text-indigo-500" />, title: "Liên kết thẻ" },
    { link: "/bdsd", icon: <FaChartLine size={30} className="text-yellow-400" />, title: "Biến động số dư" },
    { link: "/group-fund", icon: <FaGroupArrowsRotate size={30} className="text-red-500" />, title: "Quỹ nhóm" },
    { link: "/application", icon: <FaAppStoreIos  size={45} className="text-blue-500" />, title: "App Partner" },
    { link: "/", icon: <FaCreditCard size={30} className="text-red-500" />, title: "Thẻ tín dụng" },
    { link: "/", icon: <MdTravelExplore size={30} className="text-teal-500" />, title: "Du lịch-Đi lại" },
    { link: "/", icon: <FaMobileAlt size={30} className="text-yellow-500" />, title: "Nạp tiền Điện thoại" },
    { link: "/", icon: <BiSolidMoviePlay size={30} className="text-indigo-500" />, title: "Mua vé xem phim" },
    { link: "/", icon: <FaCode size={30} className="text-green-500" />, title: "Ví trả sau" },
    { link: "/outcome", icon: <FaAnchorLock size={30} className="text-fuchsia-600" />, title: "Quản lý chi tiêu" },
    { link: "/support-ticket", icon: <BiSupport size={30} className="text-blue-500" />, title: "Hỗ trợ giao dịch" },
];

const ScrollableCardList = () => {
    return (
        <div>
            <div className="rs-text-medium text-sm sm:text-lg sm:mb-1 mb-2">
                Các dịch vụ đề xuất
            </div>
            <div className="px-2">
                <div className="relative overflow-hidden">
                    <Swiper
                        spaceBetween={10}
                        slidesPerView={5}
                        navigation={false}
                        autoHeight={true}
                        pagination={{ clickable: true }}
                        breakpoints={{
                            320: { slidesPerView: 2, spaceBetween: 16 },
                            375: { slidesPerView: 3, spaceBetween: 12 },
                            500: { slidesPerView: 4, spaceBetween: 12 },
                            768: { slidesPerView: 5, spaceBetween: 12 },
                        }}
                        modules={[Navigation, Pagination, Autoplay]}
                    >
                        {items.map((item) => (
                            <SwiperSlide key={item.title}>
                                <Link to={item.link} className="flex p-2">
                                    <div className="w-full h-32 sm:w-32 sm:h-40 bg-white shadow-md rounded-lg overflow-hidden flex flex-col items-center">
                                        <div className="h-16 w-full flex items-center justify-center">
                                            {item.icon}
                                        </div>
                                        <div className="p-2 text-center">
                                            <div className="font-semibold mb-1">{item.title}</div>
                                        </div>
                                    </div>
                                </Link>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default ScrollableCardList;
