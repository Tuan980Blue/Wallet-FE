import {useEffect, useRef, useState} from "react";
import {GiMoneyStack} from "react-icons/gi";
import {wPost} from "../../../util/request.util.js";
import {useQueryClient} from "@tanstack/react-query";
import {toast} from "react-toastify";
import {SyncLoader} from "react-spinners";

const WithdrawForm = ({onClose, fundId, balance}) => {
    const [amount, setAmount] = useState("");
    const [note, setNote] = useState("");
    const [fundBalance, setFundBalance] = useState(balance);
    const [isAmountFocused, setIsAmountFocused] = useState(false);
    const [error, setError] = useState("");
    const [error1, setError1] = useState("");
    const queryClient = useQueryClient();
    const [loading, setLoading] = useState(false);

    const suggestionAmounts = [20000, 50000, 100000];
    const formRef = useRef(null); // Ref for the form modal

    const handleSuggestionClick = (suggestedAmount) => {
        setAmount(suggestedAmount.toLocaleString("en-US", {
            style: 'decimal',
            minimumFractionDigits: 0
        }).replace(/,/g, '.'));
        setError(""); // Reset error when a suggestion is clicked
    };

    //sự kiện đóng form
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (formRef.current && !formRef.current.contains(event.target)) {
                onClose(); // Call the onClose function if clicked outside
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const numericAmount = parseInt(amount.replace(/\./g, ''), 10);
        if (!amount) {
            setError("Vui lòng nhập số tiền.");
        } else if (numericAmount < 10000) {
            setError("Số tiền rút ít nhất 10.000 VNĐ.");
        } else if (numericAmount > fundBalance) {
            setError("Số dư quỹ không đủ.");
        }
        else if (numericAmount > 99999999) {
            setError("Hạn mức rút nhỏ hơn 100.000.000 VND");
        }else if (note.length < 1) {
            setError(false);
            setError1("Vui lòng nhập lý do.");
        } else {
            setError(false);
            setError1(false);
            setLoading(true);
            try {
                const transferData = {
                    groupId: fundId,
                    amount: numericAmount,
                    message: note
                };

                const response = await wPost('/v1/group-fund/withdraw', transferData);

                setTimeout(() => {
                    queryClient.invalidateQueries({queryKey: ['groupFund', fundId]});
                    queryClient.invalidateQueries({queryKey: ['groupFunds']});
                    queryClient.invalidateQueries({queryKey: ['transactions', fundId]});
                    queryClient.invalidateQueries({queryKey: ['wallet']});

                    setFundBalance(prevBalance => prevBalance - numericAmount);

                    setLoading(false);
                    toast.success('Rút quỹ thành công');
                    onClose();
                }, 2000);

            } catch (error) {
                console.error("Lỗi:", error);
                setLoading(false);
                setError(error.response.data.message);
            }
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
            <div ref={formRef} className="w-[500px] sm:max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
                <div className="flex justify-center text-red-500 mb-4">
                    <div className="text-6xl">
                        <GiMoneyStack/>
                    </div>
                </div>
                <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">Rút Quỹ</h2>
                <div className="mb-6 flex justify-between items-center">
                    <p className="text-lg font-medium text-gray-700">Số dư quỹ hiện tại:</p>
                    <span className="font-semibold text-lg text-green-500">
                        {fundBalance?.toLocaleString("en-US", {
                            style: 'decimal',
                            minimumFractionDigits: 0
                        }).replace(/,/g, '.')} VNĐ
                    </span>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="relative mb-4">
                        <label
                            className={`absolute transition-all ${
                                isAmountFocused || amount
                                    ? "-top-5 text-xs text-green-500"
                                    : "top-2 left-3 text-gray-700"
                            }`}
                            htmlFor="amount"
                        >
                            Số Tiền Rút (VND)
                        </label>
                        <input
                            type="text"
                            id="amount"
                            value={amount}
                            onFocus={() => setIsAmountFocused(true)}
                            onBlur={() => {
                                setIsAmountFocused(false);
                                if (!amount) {
                                    setAmount("");
                                    setError("");
                                }
                            }}
                            onChange={(e) => {
                                let value = e.target.value.replace(/\./g, ''); // Remove dot
                                if (/^\d*$/.test(value) || value === "") {
                                    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Format number with dot
                                    setAmount(value);
                                }
                            }}
                            className={`w-full px-3 py-2 border ${
                                error ? "border-red-500" : "border-gray-300"
                            } rounded-md focus:outline-none focus:ring focus:border-blue-500`}
                            placeholder={isAmountFocused ? "0đ" : ""}
                            required
                        />
                        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                    </div>

                    {/* Suggested amounts buttons */}
                    <div className="grid grid-cols-2 gap-2 md:gap-4 justify-center md:grid-cols-3 mb-4">
                        {suggestionAmounts.map((val) => (
                            <button
                                key={val}
                                type="button"
                                onClick={() => handleSuggestionClick(val)}
                                className="h-10 bg-gradient-to-r from-red-400 to-red-500 text-white py-2 px-1 rounded-lg hover:from-red-500 hover:to-red-400 focus:outline-none focus:shadow-outline transition duration-300"
                            >
                                {val.toLocaleString("en-US", {
                                    style: 'decimal',
                                    minimumFractionDigits: 0
                                }).replace(/,/g, '.')} VNĐ
                            </button>
                        ))}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="note">
                            Lý do
                        </label>
                        <textarea
                            id="note"
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            maxLength={200}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                            placeholder="Nhập lý do để các thành viên cùng biết"
                        />
                        <p className="text-right text-gray-500 text-sm">{note.length}/200 ký tự</p>
                        {note.length < 1 && <p className="text-red-500 text-sm mt-1">{error1}</p>}
                    </div>

                    {loading ?
                        <div className={"flex justify-center items-center"}>
                            <SyncLoader
                                color="#00ff16"
                                margin={5}
                                size={15}
                            />
                        </div>
                        :
                        <button
                            type="submit"
                            className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            Rút Quỹ
                        </button>
                    }
                </form>
                <div className={"flex justify-center"}>
                    <button
                        onClick={onClose}
                        className="mt-4 text-gray-700 hover:text-red-600"
                    >
                        Đóng
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WithdrawForm;
