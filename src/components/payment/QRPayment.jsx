import {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCircleExclamation} from '@fortawesome/free-solid-svg-icons';
import {MdOutlinePayments} from 'react-icons/md';
import {WalletSection} from '../account/WalletSection.jsx';
import {BiBarcode, BiBarcodeReader} from 'react-icons/bi';
import {ScrollRestoration} from 'react-router-dom';
import {QRCodeSVG} from 'qrcode.react';

function QRPayment() {
  const [showQRCode, setShowQRCode] = useState(true);
  const [qrContent, setQrContent] = useState('');

  return (<div className="flex justify-center items-center min-h-screen">
        <div className="rounded-lg shadow-xl w-full max-w-[1200px] overflow-hidden">
          <div className="flex items-center p-6 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-t-lg">
            <MdOutlinePayments size={40} className="text-white"/>
            <h1 className="text-2xl font-bold ml-3">Thanh Toán Dịch Vụ</h1>
          </div>
          <div className="p-6 bg-gray-100">
            <div className="container mx-auto flex flex-col md:flex-row gap-6">
              <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-full mx-auto md:mx-0">
                <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800">Thanh toán qua mã QR</h2>
                <div className="flex flex-col items-center">
                  {showQRCode ? (<div className="mb-4">
                        <QRCodeSVG value={qrContent} imageSettings={{
                          src: '/e-wallet.png',
                        }}/>
                      </div>) : (<div className="flex flex-col items-center mb-4 text-center">
                        <FontAwesomeIcon icon={faCircleExclamation} bounce size="3x" className="text-red-500 mb-2"/>
                        <div className="text-sm text-gray-600 mb-2">Xin lỗi quý khách hàng, tính năng chưa cập nhật.</div>
                        <p className="text-lg font-medium text-gray-800">Sử dụng ứng dụng quét mã QR trên thiết bị của
                          bạn</p>
                      </div>)}
                  <div className="flex space-x-4 mt-4">
                    <button
                        className={`px-4 py-2 rounded-lg transition duration-300 ${showQRCode
                                                                                   ? 'bg-indigo-500 text-white hover:bg-indigo-600'
                                                                                   : 'bg-gray-300 text-gray-600 hover:bg-gray-400'}`}
                        onClick={() => setShowQRCode(true)}
                    >
                      Hiển thị mã QR
                      <BiBarcode/>
                    </button>
                    <button
                        className={`px-4 py-2 rounded-lg transition duration-300 ${!showQRCode
                                                                                   ? 'bg-indigo-500 text-white hover:bg-indigo-600'
                                                                                   : 'bg-gray-300 text-gray-600 hover:bg-gray-400'}`}
                        onClick={() => setShowQRCode(false)}
                    >
                      Quét QR
                      <BiBarcodeReader/>
                    </button>
                  </div>
                </div>
              </div>
              <div className="max-w-full order-first md:order-last md:mb-0">
                <WalletSection/>
              </div>
            </div>
          </div>
        </div>
        <ScrollRestoration/>
      </div>);
}

export default QRPayment;
