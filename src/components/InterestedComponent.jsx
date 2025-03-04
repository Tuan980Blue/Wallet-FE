import { Link } from 'react-router-dom';
import { BsFillStarFill } from 'react-icons/bs';

const InterestedComponent = () => {
    const items = [
        {
            id: 1,
            title: "Nhanh chóng, An toàn, Tiện lợi!",
            description: "Chỉ với một chạm, mọi giao dịch trong tầm tay.",
            link: "/",
            image: "/uudai1.png"
        },
        {
            id: 2,
            title: "Đăng ký ngay, nhận ưu đãi",
            description: "Những ưu đãi hấp dẫn chỉ dành cho bạn.",
            link: "/sign-in",
            image: "/uudai2.png"
        },
        {
            id: 3,
            title: "Hợp tác cùng chúng tôi",
            description: "Cơ hội hợp tác với chúng tôi, cùng phát triển.",
            link: "/application",
            image: "/uudai3.png"
        },
    ];

    return (
        <div className="py-8 px-6 rounded-lg shadow-xl bg-gradient-to-r from-green-200 via-purple-200 to-gray-200 transform transition-all">
            <div className="text-center mb-6">
                <div className="flex justify-center items-center">
                    <BsFillStarFill className="text-yellow-400 animate-spin mr-2" size={28} />
                    <h2 className="text-3xl font-bold drop-shadow-lg">
                        Có thể bạn quan tâm
                    </h2>
                </div>
                <p className="text-gray-800 mt-2 font-medium">
                    Khám phá những điều thú vị mà bạn không nên bỏ lỡ.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {items.map(item => (
                    <Link to={item.link} key={item.id} className="group hover:no-underline">
                        <div className="p-5 bg-white rounded-lg shadow-md transform hover:scale-105 hover:shadow-2xl transition duration-500 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-50 transition duration-500"></div>
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-40 object-cover rounded-t-lg group-hover:scale-110 transition duration-500"
                            />
                            <h3 className="text-xl font-bold text-gray-800 group-hover:text-white mt-4 z-10 relative">
                                {item.title}
                            </h3>
                            <p className="text-gray-600 group-hover:text-gray-200 mt-2 z-10 relative">
                                {item.description}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default InterestedComponent;