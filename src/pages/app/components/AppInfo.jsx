import {FaAppStore, FaMoneyBillWave, FaRegCopy, FaUsers} from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import { wGet, wPost } from '../../../util/request.util.js'; // wPost để gửi yêu cầu API rút tiền
import { IoIosEye, IoIosEyeOff } from 'react-icons/io';
import { useState } from 'react';
import { CopyButton } from '@mantine/core';
import { queryClient } from "../../../modules/cache.js";
import {toast} from "react-toastify";

const AppInfo = ({ id }) => {
    const [isApiKeyVisible, setIsApiKeyVisible] = useState(false);
    const [isWithdrawFormVisible, setIsWithdrawFormVisible] = useState(false);
    const [withdrawAmount, setWithdrawAmount] = useState('');
    const [withdrawError, setWithdrawError] = useState('');
    const [withdrawSuccess, setWithdrawSuccess] = useState('');

    // Fetch dữ liệu từ API nếu có ID
    const { data, isLoading, isError } = useQuery({
        queryKey: ['applicationInfo', id],
        queryFn: () => wGet(`/v1/application/${id}`),
        staleTime: 5 * 60 * 1000,
        cacheTime: 30 * 60 * 1000,
        enabled: !!id,
    });

    const handleWithdraw = async () => {
        try {
            const amount = parseFloat(withdrawAmount.replace(/,/g, ''));

            // Kiểm tra giá trị nhập vào
            if (!amount || isNaN(amount) || amount <= 0) {
                setWithdrawError('Vui lòng nhập số tiền hợp lệ.');
                return;
            }

            // Kiểm tra số tiền rút lớn hơn số dư
            if (amount > data.balance) {
                setWithdrawError('Số tiền rút không được lớn hơn số dư hiện tại.');
                return;
            }

            // Gửi yêu cầu rút tiền
            const response = await wPost(`/v1/application/${id}/withdraw`, {
                amount,
            });

            // Làm mới dữ liệu
            queryClient.invalidateQueries(['applicationInfo', id]);

            // Hiển thị thông báo thành công
            toast.success('Rút tiền thành công!');
            setWithdrawError('');
            setWithdrawAmount('');

        } catch (error) {
            setWithdrawError('Có lỗi xảy ra khi thực hiện rút tiền.');
            setWithdrawSuccess('');
        }
    };

    const formatCurrency = (value) => {
        // Loại bỏ ký tự không phải số
        const cleanValue = value.replace(/[^0-9]/g, '');
        return cleanValue.replace(/\B(?=(\d{3})+(?!\d))/g, ','); // Thêm dấu phẩy vào nhóm 3 chữ số
    };

    if (isLoading) {
        return (
            <div className="bg-gradient-to-r from-blue-50 to-white shadow-lg rounded-lg p-6 mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <FaAppStore className="text-blue-600 mr-2" size={28} />
                    Thông Tin Ứng Dụng
                </h2>
                <p className="text-gray-600">Đang tải dữ liệu...</p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="bg-gradient-to-r from-blue-50 to-white shadow-lg rounded-lg p-6 mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <FaAppStore className="text-blue-600 mr-2" size={28} />
                    Thông Tin Ứng Dụng
                </h2>
                <p className="text-red-600">Đã xảy ra lỗi khi tải dữ liệu.</p>
            </div>
        );
    }

    const toggleApiKeyVisibility = () => {
        setIsApiKeyVisible((prev) => !prev);
    };

    return (
        <div className="bg-gradient-to-r from-blue-100 to-white shadow-lg rounded-lg p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                <FaAppStore className="text-blue-600 mr-3" size={32}/>
                Thông Tin Ứng Dụng
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                <div
                    className="flex items-center p-5 bg-white rounded-lg border-l-4 border-blue-600 shadow-md hover:shadow-lg transition duration-300">
                    <FaUsers className="text-blue-600 mr-4" size={32}/>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-700">Số Người Dùng</h3>
                        <p className="text-3xl font-bold text-gray-900">10,000</p>
                    </div>
                </div>
            </div>
            <div className="text-gray-800 space-y-4">
                <p><strong>Tên ứng dụng:</strong> {data.name}</p>
                <p><strong>Ngày tạo:</strong> {new Date(data.createdAt).toLocaleDateString()}</p>
            </div>

            <div className="flex items-center justify-between mt-6 bg-gray-100 p-5 rounded-lg shadow-md">
                <p className="text-sm font-medium text-gray-600">API Key:</p>
                <div className="flex items-center space-x-4">
                    <CopyButton value={data.secret}>
                        {({copied, copy}) => (
                            <FaRegCopy className="text-gray-600 cursor-pointer" size={20} onClick={copy}/>
                        )}
                    </CopyButton>
                    <p className="text-sm text-gray-700 font-mono">
                        {isApiKeyVisible ? data.secret : '*************************'}
                    </p>
                    <button
                        onClick={toggleApiKeyVisibility}
                        className="text-gray-500 hover:text-gray-700"
                        aria-label={isApiKeyVisible ? 'Ẩn API Key' : 'Hiện API Key'}
                    >
                        {isApiKeyVisible ? <IoIosEyeOff size={20}/> : <IoIosEye size={20}/>}
                    </button>
                </div>
            </div>

            <div className="mt-8 p-6 bg-gradient-to-b from-gray-100 to-white rounded-xl shadow-md">
                <div className="flex items-center gap-3 text-gray-700">
                    <div className="flex items-center">
                        <FaMoneyBillWave className="text-green-500 mr-2" size={30}/>
                        <p className="text-xl font-semibold">Số dư hiện tại:</p>
                    </div>
                    <p className="text-3xl font-bold text-green-600">{data.balance.toLocaleString()} VND</p>
                </div>
                <button
                    onClick={() => setIsWithdrawFormVisible((prev) => !prev)}
                    className="mt-4 inline-flex items-center justify-center px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
                >
                    <FaMoneyBillWave className="mr-2"/>
                    Rút tiền
                </button>

                {isWithdrawFormVisible && (
                    <div className="mt-6 bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-lg font-semibold text-gray-700">Nhập số tiền cần rút:</h3>
                        <input
                            type="text"
                            value={withdrawAmount}
                            onChange={(e) => setWithdrawAmount(formatCurrency(e.target.value))}
                            placeholder="Số tiền"
                            className="mt-2 px-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {withdrawError && <p className="text-red-600 mt-2">{withdrawError}</p>}
                        {withdrawSuccess && <p className="text-green-600 mt-2">{withdrawSuccess}</p>}
                        <button
                            onClick={handleWithdraw}
                            className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition duration-200"
                        >
                            Xác nhận
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AppInfo;
