import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

const slides = [
    { Color: 'bg-blue-400', bgImg: "/banner-01.png", content: '' },
    { Color: 'bg-red-400', bgImg: "/banner-02.png", content: '' },
    { Color: 'bg-green-400', bgImg: "/banner-03.png", content: '' },
    { Color: 'bg-yellow-400', bgImg: "/banner_04.png", content: '' },
];

// có thể truyền slides vào
const Slider = () => {
    return (
        <div className="relative w-full max-w-full mx-auto rounded-lg overflow-hidden shadow-lg">
            <Swiper
                spaceBetween={30}
                slidesPerView={1}
                navigation={{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }} // Dùng các class tùy chỉnh cho nút back và next
                pagination={{ clickable: true }}
                loop={true}
                autoplay={{ delay: 3500, disableOnInteraction: false }}
                modules={[Navigation, Pagination, Autoplay]}
                className="rounded-lg"
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <div className="cursor-pointer relative">
                            <div
                                className="bg-cover bg-center h-[500px] w-full flex items-center justify-center rounded-lg"
                                style={{ backgroundImage: `url(${slide.bgImg})` }}
                            >
                                <div className="absolute inset-0 rounded-xl flex items-center justify-center text-white">
                                    {slide.content}
                                </div>
                                <div className="absolute bottom-5 left-5">
                                    <button className={`px-6 py-2 rounded-full text-white font-semibold ${slide.Color} shadow-lg hover:bg-opacity-90 transition duration-300 ease-in-out`}>
                                        Xem Ngay
                                    </button>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
                <div className="swiper-button-prev" style={{ color: 'darkgreen' }}></div>
                <div className="swiper-button-next" style={{ color: 'darkgreen' }}></div>
            </Swiper>
        </div>
    );
};

export default Slider;
