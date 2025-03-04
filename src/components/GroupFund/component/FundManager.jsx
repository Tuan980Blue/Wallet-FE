const FundManager = ({ ownerEmail, avatar, createdDate }) => {
    // Chuyển đổi createdDate thành dạng dd/mm/yyyy
    const formattedDate = new Date(createdDate).toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    });

    return (
        <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Quản Lý Quỹ</h3>
            <div className="flex flex-col sm:flex-row sm:justify-start items-center gap-1">
                <img
                    src={avatar || "/avatarH.png"}
                    alt="Avatar"
                    className="w-12 h-12 rounded-full object-cover mr-2"
                />
                <div>
                    <div className="flex-1">
                        <p className="text-primary">{ownerEmail}</p>
                    </div>
                    <div className="flex-1">
                        <p className="text-gray-500">Ngày tạo: {formattedDate}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FundManager;
