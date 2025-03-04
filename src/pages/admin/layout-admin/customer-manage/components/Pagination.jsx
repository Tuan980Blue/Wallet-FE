const Pagination = ({ totalCustomers, customersPerPage, currentPage, setCurrentPage }) => {
    const totalPages = Math.ceil(totalCustomers / customersPerPage);

    const changePage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    // Generate page numbers to display
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="mt-4 flex justify-center items-center">
            {/* Previous Button */}
            <button
                onClick={() => changePage(currentPage - 1)}
                className={`px-4 py-2 mx-1 rounded-lg ${currentPage === 1 ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
                disabled={currentPage === 1}
            >
                Prev
            </button>

            {/* Page Numbers */}
            {pageNumbers.map((page) => (
                <button
                    key={page}
                    onClick={() => changePage(page)}
                    className={`px-3 py-1 mx-1 rounded-lg ${
                        currentPage === page ? 'bg-blue-700 text-white' : 'bg-gray-200'
                    }`}
                >
                    {page}
                </button>
            ))}

            {/* Next Button */}
            <button
                onClick={() => changePage(currentPage + 1)}
                className={`px-4 py-2 mx-1 rounded-lg ${currentPage === totalPages ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
                disabled={currentPage === totalPages}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
