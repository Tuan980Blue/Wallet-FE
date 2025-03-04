import { useState, useEffect } from 'react';
import { TiDeleteOutline } from 'react-icons/ti';

const Bdsd = ({ onFilter }) => {
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Call once to set initial state

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleFilter = () => {
        const currentYear = new Date().getFullYear();
        const monthInt = parseInt(month, 10);
        const yearInt = parseInt(year, 10);

        if (isNaN(monthInt) || monthInt < 1 || monthInt > 12) {
            return;
        }

        if (isNaN(yearInt) || yearInt > currentYear) {
            return;
        }

        // Simulate fetching filtered data (replace with actual API call)
        const filteredRecords = [
            { date: '01', startingBalance: '1000000', totalDeposits: '500000', numDepositTransactions: '2', totalWithdrawals: '200000', numWithdrawalTransactions: '1', endingBalance: '1300000', year: '2023' },
            { date: '02', startingBalance: '1300000', totalDeposits: '600000', numDepositTransactions: '3', totalWithdrawals: '250000', numWithdrawalTransactions: '2', endingBalance: '1600000', year: '2023' }
            // Add more records as needed
        ];

        // Filter records by selected year
        const filteredDataByYear = filteredRecords.filter(record => record.year === year);
        setFilteredData(filteredDataByYear);
    };

    const handleClearFilters = () => {
        setMonth('');
        setYear('');
        setFilteredData([]);
        onFilter('', ''); // Assuming your filter function clears all filters when passed empty strings
    };

    const renderFinancialData = () => {
        return filteredData.map((record, index) => (
            <tr key={index} className="bg-white">
                <td className="border px-4 py-2">{`${record.date}/${month}`}</td>
                <td className="border px-4 py-2">{record.startingBalance}</td>
                <td className="border px-4 py-2">{record.totalDeposits}</td>
                <td className="border px-4 py-2">{record.numDepositTransactions}</td>
                <td className="border px-4 py-2">{record.totalWithdrawals}</td>
                <td className="border px-4 py-2">{record.numWithdrawalTransactions}</td>
                <td className="border px-4 py-2">{record.endingBalance}</td>
            </tr>
        ));
    };

    const renderFinancialDataCards = () => {
        return filteredData.map((record, index) => (
            <div key={index} className="bg-white p-4 mb-4 rounded-2xl shadow border-1 border-green-500 ">
                <div className="flex items-center justify-between">
                   <strong>Ngày:</strong>
                    <span className="">{`${record.date}/${month}/${record.year}`}</span>
                </div>
                <div className="mt-2 mb-2 ">
                    <div className={"flex justify-between"}><strong>Số dư đầu kỳ:</strong> {record.startingBalance} VND</div>
                    <div className={"flex justify-between"}><strong>Tổng nạp:</strong> {record.totalDeposits} VND</div>
                    <div className={"flex justify-between"}><strong>Số GD nạp:</strong> {record.numDepositTransactions}</div>
                    <div className={"flex justify-between"}><strong>Tổng rút:</strong> {record.totalWithdrawals} VND</div>
                    <div className={"flex justify-between"}><strong>Số GD rút:</strong> {record.numWithdrawalTransactions}</div>
                    <div className={"flex justify-between"}><strong>Số dư cuối kỳ:</strong> {record.endingBalance} VND</div>
                </div>
            </div>
        ));
    };

    const renderMonthOptions = () => {
        return Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
            <option key={month} value={month}>
                {month}
            </option>
        ));
    };

    const renderYearOptions = () => {
        const currentYear = new Date().getFullYear();
        return Array.from({ length: 10 }, (_, i) => currentYear - i).map((year) => (
            <option key={year} value={year}>
                {year}
            </option>
        ));
    };

    return (
        <div className="w-full md:w-full md:p-6 flex items-center justify-center">
            <div className="w-full max-w-full my-auto mx-0 p-5 bg-white border-0 md:border-[1px] border-solid border-amber-500 rounded-3xl">
                <div className="flex flex-col md:flex-row md:justify-between space-y-4 md:space-y-0 md:space-x-4">
                    <div className="flex items-center flex-col sm:flex-row space-x-4">
                        <div className="flex w-auto items-center">
                            <p className="text-sm">Lọc theo:</p>
                        </div>
                        <div className="w-full">
                            <select
                                value={month}
                                onChange={(e) => setMonth(e.target.value)}
                                className="h-full w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            >
                                <option value="">Chọn tháng</option>
                                {renderMonthOptions()}
                            </select>
                        </div>
                        <div className="w-full mt-5 md:mt-0">
                            <select
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                                className="h-full w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            >
                                <option value="">Chọn năm</option>
                                {renderYearOptions()}
                            </select>
                        </div>
                        <button
                            type="button"
                            onClick={handleFilter}
                            className="h-full mt-3 md:mt-0 px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 md:w-auto"
                        >
                            Lọc
                        </button>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="text-2xl hover:cursor-pointer text-red-400">
                            <TiDeleteOutline onClick={handleClearFilters} />
                        </div>
                        <div className="text-gray-500">
                            <span className="hover:cursor-pointer" onClick={handleClearFilters}>Xóa bộ lọc</span>
                        </div>
                        <button className="h-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 md:w-auto">
                            Xuất Excel
                        </button>
                    </div>
                </div>
                {filteredData.length > 0 ? (
                    <div className="mt-5 overflow-x-auto">
                        {isMobile ? (
                            renderFinancialDataCards()
                        ) : (
                            <table className="min-w-full bg-white border-collapse border border-gray-300">
                                <thead>
                                <tr className="bg-gray-100">
                                    <th className="border px-4 py-2 text-left">Ngày</th>
                                    <th className="border px-4 py-2 text-left">Số dư đầu kỳ (VND)</th>
                                    <th className="border px-4 py-2 text-left">Tổng nạp (VND)</th>
                                    <th className="border px-4 py-2 text-left">Số GD nạp</th>
                                    <th className="border px-4 py-2 text-left">Tổng rút (VND)</th>
                                    <th className="border px-4 py-2 text-left">Số GD rút</th>
                                    <th className="border px-4 py-2 text-left">Số dư cuối kỳ (VND)</th>
                                </tr>
                                </thead>
                                <tbody>
                                {renderFinancialData()}
                                </tbody>
                            </table>
                        )}
                    </div>
                ) : (
                    <div className="mt-5 text-gray-500">Không có kết quả.</div>
                )}
            </div>
        </div>
    );
};

export default Bdsd;