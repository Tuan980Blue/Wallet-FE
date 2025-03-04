import Slider from '../../components/library component/Slider.jsx';
import {FaComputer} from 'react-icons/fa6';
import {FaCreditCard, FaMobileAlt, FaMoneyBillWave} from 'react-icons/fa';
import {MdOutlineAccountBalanceWallet, MdOutlineSyncLock, MdQrCodeScanner} from 'react-icons/md';
import {GiBank} from 'react-icons/gi';

const IntroPage = () => {

  const services = [
    {
      icon: FaComputer,
      title: 'NHẬN THANH TOÁN TRỰC TUYẾN',
      description: 'Ngân Lượng hỗ trợ nhiều kênh thanh toán nhất Việt Nam. Bạn chỉ việc bán hàng, việc thu tiền đã có chúng tôi lo!',
    },
    {
      icon: FaCreditCard,
      title: 'NHẬN THANH TOÁN TRẢ GÓP',
      description: 'Tăng trưởng doanh số bằng chấp nhận thanh toán trả góp 0% lãi suất bằng thẻ tín dụng của 20 ngân hàng.',
    },
    {
      icon: FaMoneyBillWave,
      title: 'CHI HỘ (ONLINE)',
      description: 'Trả lương, thưởng, hoa hồng... cho đối tác của bạn thông qua API chuyển khoản 24/7 về thẻ ATM và tài khoản ngân hàng.',
    },
    {
      icon: MdOutlineSyncLock,
      title: 'LIÊN KẾT THẺ TOKENIZATION',
      description: 'Thanh toán sành điệu như Uber, Grab: liên kết thẻ quốc tế với tài khoản khách hàng trên ứng dụng của bạn.',
    },
  ];

  const channels = [
    {
      icon: FaCreditCard,
      title: 'Chuyển khoản NH (báo có NGAY)',
      description: 'Qua Mobile Banking, Internet Banking hoặc tại quầy giao dịch',
    },
    {
      icon: MdOutlineSyncLock,
      title: 'Thẻ quốc tế',
      description: 'Sử dụng thẻ tín dụng và thẻ ghi nợ (Visa, Mastercard, JCB, Amex)',
    },
    {
      icon: GiBank,
      title: 'Thẻ ATM nội địa & Internet Banking',
      description: 'Nhập số thẻ ATM hoặc đăng nhập vào tài khoản internet Banking của hơn 30 ngân hàng nội địa',
    },
    {
      icon: MdQrCodeScanner,
      title: 'VietQR NAPAS247',
      description: 'Sử dụng App Mobile Banking quét mã VietQR để thanh toán',
    },
    {
      icon: MdOutlineAccountBalanceWallet,
      title: 'Ví điện tử',
      description: 'Sử dụng App Ví điện tử trong nước (Ngân Lượng, VIMO, ViettelPay)',
    },
    {
      icon: FaMobileAlt,
      title: 'App Mobile Banking (VNQR)',
      description: 'Dùng App Mobile Banking quét mã VNQR để thanh toán',
    },
  ];

  return (
      <div className="mx-16 mb-10">
        <Slider/>

        <div className="mt-7">
          <h2 className="text-3xl font-bold text-center mb-6">Đa dạng dịch vụ thanh toán</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                  <div key={index}
                       className="flex flex-col items-center p-6 border rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-lg">
                    <div className="bg-white p-4 rounded-full border-4 border-orange-500 mb-4">
                      <Icon className="w-16 h-16 text-green-500"/>
                    </div>
                    <h3 className="text-xl font-semibold text-green-500 mb-2 text-center">{service.title}</h3>
                    <p className="text-center text-gray-700">{service.description}</p>
                  </div>
              );
            })}
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-3xl font-bold text-center mb-6">Nhiều kênh thanh toán nhất Việt Nam</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {channels.map((channel, index) => {
              const Icon = channel.icon;
              return (
                  <div key={index} className="flex items-start p-4 border rounded-lg shadow-md">
                    <div className="bg-white p-2 rounded-full border-4 border-orange-500 mr-4">
                      <Icon className="w-12 h-12 text-green-500"/>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-green-500 mb-2">{channel.title}</h3>
                      <p className="text-gray-700">{channel.description}</p>
                    </div>
                  </div>
              );
            })}
          </div>
        </div>

        <div className="mt-10 flex justify-center items-center">
          <div className="border-2 border-orange-500 rounded-lg p-6 flex justify-between items-center w-full max-w-4xl">
            <p className="text-xl font-bold text-center">
              <span className="text-green-500 text-2xl">10</span> NĂM ĐỒNG HÀNH CÙNG <span
                className="text-green-500 text-2xl">60.000</span> ĐỐI TÁC BÁN HÀNG VÀ THANH TOÁN TRÊN TOÀN QUỐC
            </p>
            <button
                className="bg-orange-500 text-white px-9 py-1 rounded-full ml-4 hover:bg-orange-600 transition duration-300 ease-in-out">
              Nhận tư vấn
            </button>
          </div>
        </div>
      </div>
  );
};

export default IntroPage;
