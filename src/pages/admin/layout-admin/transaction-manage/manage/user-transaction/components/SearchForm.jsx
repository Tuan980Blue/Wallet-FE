import { IoSearch } from 'react-icons/io5';
import { ClipLoader } from 'react-spinners';

const SearchForm = ({ onSearch, loading, initialEmail, setEmail }) => {
    const handleSearch = (e) => {
        e.preventDefault();
        if (initialEmail) {
            onSearch(initialEmail);
        }
    };

    return (
        <form onSubmit={handleSearch} className="flex items-center space-x-4">
            <input
                type="email"
                value={initialEmail}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Nhập email khách hàng"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 disabled:bg-gray-400"
            >
                {loading ? (
                    <ClipLoader color="#ffffff" size={20} />
                ) : (
                    <>
                        <IoSearch className="mr-2" />
                        Tìm
                    </>
                )}
            </button>
        </form>
    );
};

export default SearchForm;