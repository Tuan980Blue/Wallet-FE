import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ searchTerm, setSearchTerm }) => {
    return (
        <div className="mb-4 flex items-center border border-emerald-400 rounded-lg shadow-lg focus-within:ring-2 focus-within:ring-cyan-500 transition-all duration-300">
            {/* Search Icon */}
            <div className="pl-4 text-gray-500">
                <FaSearch size={20} />
            </div>

            {/* Input Field */}
            <input
                type="text"
                placeholder="Tìm kiếm theo Tên..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-4 pl-10 pr-4 border-0 focus:outline-none focus:ring-0"
            />
        </div>
    );
};

export default SearchBar;
