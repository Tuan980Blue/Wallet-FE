import { useState } from "react";

const MemberList = ({ fundMembers }) => {
    const [showAll, setShowAll] = useState(false);

    // Chỉ hiển thị 3 thành viên nếu `showAll` là false
    const membersToShow = showAll ? (fundMembers || []) : (fundMembers || []).slice(0, 3);

    return (
        <div className="mt-2">
            <ul className="list-none pl-5 space-y-4">
                {fundMembers && fundMembers.length > 0 ? (
                    membersToShow.map((member, index) => (
                        <li key={index} className="flex items-center">
                            <img
                                src={member.avatar || "/avatarH.png"}
                                alt={`${member.username}'s Avatar`}
                                className="w-12 h-12 rounded-full mr-4 shadow"
                            />
                            <div>
                                <div className="font-medium text-sm">{member.username}</div>
                                <div className="text-gray-600">{member.email}</div>
                            </div>
                        </li>
                    ))
                ) : (
                    <li className="text-gray-500">Chưa có thành viên nào.</li>
                )}
            </ul>

            {fundMembers && fundMembers.length > 3 && (
                <div
                    onClick={() => setShowAll(!showAll)}
                    className="mt-4 px-4 text-blue-500 cursor-pointer font-semibold
                               hover:text-blue-700 transition duration-200"
                >
                    {showAll ? "Thu gọn" : "Xem tất cả"}
                </div>
            )}
        </div>
    );
};

export default MemberList;
