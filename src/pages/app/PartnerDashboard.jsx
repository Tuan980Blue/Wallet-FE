import AppInfo from './components/AppInfo.jsx';
import WalletList from './components/WalletList.jsx';
import {useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import Footer from '../../modules/core/system-component/Footer.jsx';
import {FaSignOutAlt} from 'react-icons/fa';
import {wGet} from '../../util/request.util.js';
import {useQuery} from '@tanstack/react-query';
import WalletDetails from "./components/WalletDetails.jsx";
import OrderList from "./components/OrderList.jsx";
import OrderAppStatistics from "./components/OrderAppStatistics.jsx"; // Import icon cho nút đăng xuất

function fetchApplication(id) {
    return wGet(`/v1/application/${id}/wallet`);
}

const PartnerDashboard = () => {
    const [selectedWallet, setSelectedWallet] = useState(null);
    const {id} = useParams();
    //use useQuery để fetch data từ API
    const {data: wallets, isLoading, error} = useQuery({
        queryKey: [`application-${id}`],
        queryFn: () => fetchApplication(id),
    });

    return (
        <div>
            <div className="p-4 bg-gradient-to-br from-blue-100 to-gray-100 min-h-screen">
                {/* Header */}
                <header className="flex items-center justify-between bg-white shadow-lg rounded-lg p-8 mb-6">
                    <div className="flex items-center gap-4">
                        <img src={'/logoTCB.png'} alt="Logo" className="w-32 h-auto"/>
                        <h1 className="text-3xl font-bold text-gray-800">Quản Lý Ví Của Ứng Dụng</h1>
                    </div>
                    <Link to={'/sign-in'}>
                        <button
                            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300">
                            <FaSignOutAlt className="mr-2"/>
                            Đăng xuất
                        </button>
                    </Link>
                </header>

                {/* App Info */}
                <AppInfo id={id}/>


                {/* Wallets Section */}
                <section className="bg-white shadow-md rounded-lg p-6">
                    <OrderAppStatistics id={id}/>

                    {!selectedWallet ? (
                        <WalletList wallets={wallets} onSelectWallet={setSelectedWallet}/>
                    ) : (
                        <WalletDetails wallet={selectedWallet} onBack={() => setSelectedWallet(null)}/>
                    )}

                    <OrderList partnerId={id}/>
                </section>

            </div>
            {/* Footer */}
            <footer className="text-center text-gray-500 mt-12">
                <Footer/>
            </footer>
        </div>
    );
};

export default PartnerDashboard;