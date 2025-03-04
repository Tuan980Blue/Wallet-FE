// Component hiển thị thông tin lời mời
const InviteCard = ({ groupName, createdAt, senderEmail, avatar, onJoin, onDecline }) => (
    <div className="bg-white shadow-lg rounded-2xl p-4 w-56 md:w-72 mx-auto my-2 transition-transform transform hover:scale-105 duration-300 ease-in-out">
        <div className="relative mb-2">
            <img
                className="w-full h-32 rounded-xl object-cover border-2 border-green-500 shadow-md"
                src={avatar}
                alt={`${groupName} avatar`}
            />
        </div>
        <div className="px-2 flex flex-col space-y-3">
            <div className="bg-gray-100 p-2 rounded-lg text-center truncate" title={groupName}>
                <h3 className="text-lg font-bold text-gray-800">{groupName}</h3>
            </div>
            <div className="text-center">
                <p className="text-sm text-gray-600">{senderEmail}</p>
                <p className="text-xs text-gray-400">Gửi vào: {new Date(createdAt).toLocaleDateString()}</p>
            </div>
            <div className="flex justify-around mt-4 space-x-4">
                <button
                    className="bg-gray-200 text-gray-600 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 transition duration-200 ease-in-out"
                    onClick={onDecline}
                >
                    Từ chối
                </button>
                <button
                    className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200 ease-in-out shadow-lg"
                    onClick={onJoin}
                >
                    Tham gia
                </button>
            </div>
        </div>
    </div>
);
export default InviteCard;