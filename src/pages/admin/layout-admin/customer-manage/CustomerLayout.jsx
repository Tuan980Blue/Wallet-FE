import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import SearchBar from "./components/SearchBar.jsx";
import CustomerList from "./components/CustomerList.jsx";
import Pagination from "./components/Pagination.jsx";
import {wGet} from "../../../../util/request.util.js";

const fetchCustomers = async (page, pageSize) => {
    try {
        const response = await wGet(`/v1/user/all?page=${page}&pageSize=${pageSize}`);
        return response;
    } catch (error) {
        throw new Error('Error fetching customers: ' + error.message);
    }
};

const CustomerLayout = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const customersPerPage = 10;

    const { data, error, isLoading } = useQuery(
        {
            queryKey: ['customers-admin', currentPage],
            queryFn: () => fetchCustomers(currentPage - 1, customersPerPage),
            staleTime: 5 * 60 * 1000,
            cacheTime: 30 * 60 * 1000,
            keepPreviousData: true,
        }
    );

    const customers = data?.content;
    const totalCustomers = data?.totalElements;

    // Filter customers based on search query
    const filteredCustomers = customers?.filter(customer =>
        customer.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // UI for loading state
    if (isLoading) return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="text-2xl font-semibold text-gray-700">Loading...</div>
        </div>
    );

    // UI for error state
    if (error) return (
        <div className="flex justify-center items-center min-h-screen text-red-500 text-lg">
            <span>Error loading customers: {error.message}</span>
        </div>
    );

    return (
        <div className="bg-gray-100 min-h-screen w-full">
            <header className="bg-gradient-to-r from-gray-800 to-cyan-600 text-white py-6 shadow-lg">
                <h1 className="text-center text-3xl font-bold">Quản Lý Khách Hàng</h1>
            </header>

            <main className="p-6 w-full">
                <div className="bg-cyan-100 rounded-lg shadow-md p-6">
                    <SearchBar setSearchQuery={setSearchQuery} />
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                    {filteredCustomers?.length > 0 ? (
                        <CustomerList customers={filteredCustomers} />
                    ) : (
                        <div className="text-center text-gray-500 py-10">
                            <p className="text-lg">No customers found</p>
                        </div>
                    )}
                </div>

                <div className="mt-6">
                    <Pagination
                        totalCustomers={totalCustomers}
                        customersPerPage={customersPerPage}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </div>
            </main>
        </div>
    );
};

export default CustomerLayout;
