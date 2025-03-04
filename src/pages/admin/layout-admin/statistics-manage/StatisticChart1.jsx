import { useState, useEffect } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, Filler, } from 'chart.js';

ChartJS.register(CategoryScale,LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
    Filler
);

const StatisticChart1 = () => {
    const [statistics, setStatistics] = useState({
        totalTransactions: 1200,
        totalUsers: 300,
        totalWallets: 150,
        totalMoneyTransactions: 50000,
        transactionData: [
            { date: "2023-01-01", count: 30 },
            { date: "2023-02-01", count: 45 },
            { date: "2023-03-01", count: 60 },
            { date: "2023-04-01", count: 80 },
            { date: "2023-05-01", count: 100 },
        ],
        moneyData: [
            { date: "2023-01-01", amount: 1000 },
            { date: "2023-02-01", amount: 1500 },
            { date: "2023-03-01", amount: 2000 },
            { date: "2023-04-01", amount: 2500 },
            { date: "2023-05-01", amount: 3000 },
        ],
    });


    useEffect(() => {
        const fetchData = async () => {
            setTimeout(() => {
                setStatistics({
                    totalTransactions: 1200,
                    totalUsers: 300,
                    totalWallets: 150,
                    totalMoneyTransactions: 50000,
                    transactionData: [
                        { date: "2023-01-01", count: 30 },
                        { date: "2023-02-01", count: 45 },
                        { date: "2023-03-01", count: 60 },
                        { date: "2023-04-01", count: 80 },
                        { date: "2023-05-01", count: 100 },
                    ],
                    moneyData: [
                        { date: "2023-01-01", amount: 1000 },
                        { date: "2023-02-01", amount: 1500 },
                        { date: "2023-03-01", amount: 2000 },
                        { date: "2023-04-01", amount: 2500 },
                        { date: "2023-05-01", amount: 3000 },
                    ],
                });
            }, 1000);
        };

        fetchData();
    }, []);

    const transactionChartData = {
        labels: statistics.transactionData.map(data => data.date),
        datasets: [
            {
                label: 'Transactions',
                data: statistics.transactionData.map(data => data.count),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const moneyChartData = {
        labels: statistics.moneyData.map(data => data.date),
        datasets: [
            {
                label: 'Money',
                data: statistics.moneyData.map(data => data.amount),
                fill: true,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
            },
        ],
    };

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-4 text-primaryColor">Thống Kê</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <div className="bg-white shadow-lg rounded-lg p-4">
                    <h2 className="text-lg font-medium">Total Transactions</h2>
                    <p className="text-xl lg:text-2xl font-bold">{statistics.totalTransactions}</p>
                </div>
                <div className="bg-white shadow-lg rounded-lg p-4">
                    <h2 className="text-lg font-medium">Total Users</h2>
                    <p className="text-xl lg:text-2xl font-bold">{statistics.totalUsers}</p>
                </div>
                <div className="bg-white shadow-lg rounded-lg p-4">
                    <h2 className="text-lg font-medium">Total Wallets</h2>
                    <p className="text-xl lg:text-2xl font-bold">{statistics.totalWallets}</p>
                </div>
                <div className="bg-white shadow-lg rounded-lg p-4">
                    <h2 className="text-lg font-medium">Total Money Transactions</h2>
                    <p className="text-xl lg:text-2xl font-bold">${statistics.totalMoneyTransactions}</p>
                </div>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-4 mb-6">
                <h2 className="text-lg font-medium mb-4">Transactions Over Time</h2>
                <Bar data={transactionChartData} />
            </div>
            <div className="bg-white shadow-lg rounded-lg p-4">
                <h2 className="text-lg font-medium mb-4">Monthly Money Over Time</h2>
                <Line data={moneyChartData} />
            </div>
        </div>
    );
}

export default StatisticChart1;
