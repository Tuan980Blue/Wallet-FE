import {useEffect, useState} from "react";
import {ScrollRestoration, useNavigate} from "react-router-dom";
import {wGet} from "../../util/request.util.js";

const banks = [
  {
    name: "Vietcombank",
    note: "Vietcombank - Ngoại thương",
    logo: "/logoVCB.png",
  },
  {
    name: "Vietinbank",
    note: "Vietinbank - Công thương",
    logo: "/logoVTB.png",
  },
  {
    name: "DongABank",
    note: "DongA Bank - Đông Á",
    logo: "/logoDongABank.png",
  },
  {
    name: "Techcombank",
    note: "Techcombank - Kỹ Thương Việt Nam",
    logo: "/logoTCB.png",
  },
  {
    name: "Vietinbank",
    note: "Vietinbank - Công thương",
    logo: "/logoVTB.png",
  },
  {
    name: "Eximbank",
    note: "Eximbank - Xuất nhập khẩu",
    logo: "/logoVCB.png",
  },
  {
    name: "ACB",
    note: "ACB - Á Châu",
    logo: "/logoVCB.png",
  },
  {
    name: "Sacombank",
    note: "Sacombank - Sài Gòn Thương Tín",
    logo: "/logoVCB.png",
  },
  {
    name: "BIDV",
    note: "BIDV - Đầu tư",
    logo: "/logoVCB.png",
  },
  {
    name: "Vietinbank",
    note: "Vietinbank - Công thương",
    logo: "/logoVTB.png",
  },
  {
    name: "Vietinbank",
    note: "Vietinbank - Công thương",
    logo: "/logoVTB.png",
  },
];

// eslint-disable-next-line react/prop-types
const BankSelect = ({show, onClose, amount, methodPay}) => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedBank, setSelectedBank] = useState(null);
    const [linkedBank, setLinkedBank] = useState([]);

    useEffect(() => {
        wGet("/v1/bank/linked").then(res  => {
            if (res.data){
                setLinkedBank(res.data);
            }
        });
    }, []);

    if (!show) return null;

    const handleBankSelect = (bank) => {
        setSelectedBank(bank);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSubmit = () => {
        if (selectedBank) {
            navigate('/topup/banktransfer', {state: {bank: selectedBank, amount: amount, methodPay: methodPay}});
        }
    };

    //Nhấn Đóng và Reset lại trạng thái selectedBank
    const handleClose = () => {
        setSelectedBank(null);
        onClose();
    };

    // Lọc danh sách banks dựa trên từ khóa tìm kiếm
    const filteredBanks = banks.filter((bank) =>
        bank.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-40">
            <div
                className="bg-gray-100 border-2 rounded-lg overflow-hidden shadow-xl w-full max-w-lg max-h-[85vh] flex flex-col">
                <div className="text-gray-950 p-6">
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Chọn ngân hàng</h2>
                        <div className="mb-4">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                placeholder="Bạn chuyển tiền từ thẻ/tài khoản ngân hàng nào?"
                                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 w-full"
                            />
                        </div>
                    </div>
                    {/* Danh sách ngân hàng */}
                    <div className="h-[400px] overflow-y-auto border-2 ">
                        <div className="grid grid-cols-1 gap-4">
                            {filteredBanks.map((bank) => (
                                <div
                                    key={bank.name}
                                    onClick={() => handleBankSelect(bank)}
                                    className={`border-2 border-b-cyan-800 flex items-center w-full py-2 px-4  text-slate-950 rounded-lg focus:outline-none focus:shadow-outline transition duration-300 cursor-pointer ${
                                        selectedBank?.name === bank.name ? 'bg-green-300' : ''
                                    }`}
                                >
                                    <img src={bank.logo} alt={bank.name} className="w-[85px] max-h-full mr-4"/>
                                    <div className="text-left">
                                        <p className="font-bold">{bank.name}</p>
                                        <p className="text-sm">{bank.note}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className={"flex items-center justify-end"}>
                    <div>
                        <button
                            onClick={handleSubmit}
                            disabled={!selectedBank}
                            className={`py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-300 ${
                                selectedBank ? 'bg-emerald-500 hover:bg-green-600 text-white' : 'cursor-not-allowed bg-gray-400 text-gray-200'
                            }`}
                        >
                            Xác Nhận
                        </button>
                    </div>
                    <div className="p-4 bg-gray-100 text-right">
                        <button
                            onClick={handleClose}
                            className="py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:shadow-outline transition duration-300"
                        >
                            Đóng
                        </button>
                    </div>
                </div>
            </div>
            <ScrollRestoration/>
        </div>
    );
};

export default BankSelect;
