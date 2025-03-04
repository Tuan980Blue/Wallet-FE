import { useState } from "react";
import { wGet } from "../../../util/request.util.js";
import { useQuery } from "@tanstack/react-query";
import ActivityItem from "./ActivityItem.jsx";
import { GrNext } from "react-icons/gr";

const RecentActivities = ({ id }) => {
    const [showAll, setShowAll] = useState(false);
    const [page, setPage] = useState(0);
    const pageSize = 10;

    // Fetch transactions using useQuery
    const { data: transactions = [], isLoading, isError } = useQuery({
        queryKey: ['transactions', id, page],
        queryFn: () => wGet(`/v1/group-fund/${id}/transactions?offset=${pageSize}&page=${page}`),
        staleTime: 5 * 60 * 1000,
        cacheTime: 30 * 60 * 1000,
    });

    // Sort transactions by created date in descending order
    const sortedTransactions = transactions.sort((a, b) => new Date(b.created) - new Date(a.created));
    const activitiesToShow = showAll ? sortedTransactions : sortedTransactions.slice(0, 3);

    // Handle loading and error states
    if (isLoading) return <div className="text-center text-gray-500">Loading activities...</div>;

    return (
        <div className="mb-6 bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200">
            {/* Header */}
            <div className="flex items-center justify-between bg-gradient-to-r from-indigo-100 via-indigo-200 to-green-300 p-5 rounded-t-xl shadow-md">
                <h3 className="text-2xl font-semibold text-gray-800">Hoạt động gần đây</h3>
                <button
                    onClick={() => setShowAll(!showAll)}
                    className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors duration-200 ease-in-out"
                >
                    {showAll ? "Thu gọn" : "Xem tất cả"}
                </button>
            </div>

            {/* Activities List */}
            <ul className="divide-y divide-gray-300 p-4">
                {activitiesToShow.map((activity, index) => (
                    <ActivityItem key={index} activity={activity} />
                ))}
            </ul>

            {/* Optional Empty State Message */}
            {activitiesToShow.length === 0 && (
                <div className="p-4 text-center text-gray-500">
                    Không có hoạt động nào để hiển thị.
                </div>
            )}

            {/* Pagination Controls */}
            {activitiesToShow.length > 0 && (
                <div className="mb-2 flex justify-center items-center space-x-6">
                    <button
                        onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
                        disabled={page === 0}
                        className={`px-5 py-3 rounded-full text-white transition-colors duration-300 transform hover:scale-105 ${
                            page === 0
                                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                : "bg-indigo-600 hover:bg-indigo-700"
                        } flex items-center justify-center`}
                    >
                        <GrNext className="rotate-180 text-lg" />
                    </button>

                    <p className="text-gray-700 font-semibold text-lg">
                        Trang {page + 1}
                    </p>

                    <button
                        onClick={() => setPage((prev) => prev + 1)}
                        disabled={transactions.length < pageSize}
                        className={`px-5 py-3 rounded-full text-white transition-colors duration-300 transform hover:scale-105 ${
                            transactions.length < pageSize
                                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                : "bg-indigo-600 hover:bg-indigo-700"
                        } flex items-center justify-center`}
                    >
                        <GrNext className="text-lg" />
                    </button>
                </div>
            )}
        </div>
    );
};

export default RecentActivities;
