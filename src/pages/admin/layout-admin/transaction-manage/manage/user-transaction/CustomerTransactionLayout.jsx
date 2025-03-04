import { useState, useEffect } from 'react';
import SearchForm from "./components/SearchForm.jsx";
import CustomerInfo from "./components/CustomerInfo.jsx";
import TransactionList from "./components/TransactionList.jsx";
import { wGet } from "../../../../../../util/request.util.js";
import { useParams } from "react-router-dom";

const CustomerTransactionLayout = () => {
    const { email: emailFromParams } = useParams(); // Lấy email từ URL
    const [email, setEmail] = useState(emailFromParams || ''); // Nếu có email từ params, gán vào state
    const [customer, setCustomer] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchCustomerByEmail = async (emailToFetch) => {
        try {
            setLoading(true);
            setError('');
            const customerResponse = await wGet(`/v1/transfer/check/${emailToFetch}`);
            setCustomer(customerResponse);
        } catch (error) {
            setError('Không tìm thấy Khách Hàng! Vui lòng thử lại.');
            setCustomer(null);
        } finally {
            setLoading(false);
        }
    };

    // Tự động fetch nếu có email từ URL
    useEffect(() => {
        if (emailFromParams) {
            fetchCustomerByEmail(emailFromParams);
        }
    }, [emailFromParams]);

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-md overflow-hidden space-y-6">
            <h1 className="text-3xl font-bold text-center text-gray-800">Xem Giao Dịch Của Khách Hàng</h1>
            <SearchForm onSearch={fetchCustomerByEmail} loading={loading} initialEmail={email} setEmail={setEmail} />
            {error && <p className="text-red-500 text-center">{error}</p>}
            {loading ? (
                <div className="text-center">Đang tải dữ liệu...</div>
            ) : customer ? (
                <>
                    <CustomerInfo customer={customer} />
                    <TransactionList partner={customer} />
                </>
            ) : (
                <p className="text-center text-gray-500">Nhập email để tìm kiếm khách hàng.</p>
            )}
        </div>
    );
};

export default CustomerTransactionLayout;