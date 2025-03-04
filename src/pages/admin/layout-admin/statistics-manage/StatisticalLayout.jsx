import TransactionStatistics from "./components/TransactionStatistics.jsx";
import UserStatistics from "./components/UserStatistics.jsx";

const StatisticalLayout = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-cyan-400 to-cyan-100 p-8 text-gray-100 flex items-center justify-center">
            <div className="max-w-7xl w-full">
                {/* Tiêu đề chính */}
                <header className="text-center mb-12">
                    <h1 className="text-5xl font-extrabold tracking-tight">
                        Thống Kê Ví Điện Tử
                    </h1>
                    <p className="text-xl mt-3 text-gray-200">
                        Tổng quan về người dùng và giao dịch
                    </p>
                </header>

                {/* Nội dung thống kê */}
                <div className="flex flex-col gap-8">
                    {/* Thống kê giao dịch */}
                    <section className="flex-1 bg-white rounded-lg shadow-lg p-8 transition-transform transform ">
                        <TransactionStatistics />
                    </section>
                    {/* Thống kê người dùng */}
                    <section className="flex-1 bg-white rounded-lg shadow-lg p-8 transition-transform transform ">
                        <UserStatistics />
                    </section>

                </div>
            </div>
        </div>
    );
}

export default StatisticalLayout;