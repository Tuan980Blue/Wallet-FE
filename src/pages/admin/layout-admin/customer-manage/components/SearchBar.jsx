import { FaSearch } from 'react-icons/fa'; // Importing a search icon from react-icons

const SearchBar = ({ setSearchQuery }) => {
    return (
        <div className="">
            <div className="relative">
                {/* Search Icon */}
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />

                {/* Input field */}
                <input
                    type="text"
                    placeholder="Tìm kiếm khách hàng qua Email..."
                    className="w-full p-3 pl-12 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
        </div>
    );
}

export default SearchBar;
