import { useState, useRef, useEffect } from "react";
import { FaUserCircle, FaPaperPlane, FaSearch, FaEllipsisH, FaRegSmile } from "react-icons/fa";
import { BsFillFileEarmarkTextFill } from "react-icons/bs";

const mockData = [
  { id: 1, username: "Người dùng 1", messages: ["Xin chào", "Bạn có thể giúp tôi không?"], unread: 1 },
  { id: 2, username: "Người dùng 2", messages: ["Chào bạn, có thể hỗ trợ gì?"], unread: 0 },
  { id: 3, username: "Người dùng 3", messages: ["Tôi cần giúp đỡ về sản phẩm"], unread: 2 },
  { id: 4, username: "Người dùng 4", messages: ["Cần hỗ trợ ngay!"], unread: 0 },
  { id: 5, username: "Người dùng 5", messages: ["Chào bạn!"], unread: 1 },
];

const ChatCus = () => {
  const [activeUser, setActiveUser] = useState(null);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(mockData);
  const [showMenu, setShowMenu] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const menuRef = useRef(null);

  const handleSelectUser = (user) => {
    setActiveUser(user);
    setChat(user.messages);
    setFilteredUsers((prev) =>
      prev.map((u) => (u.id === user.id ? { ...u, unread: 0 } : u))
    );
  };

  const toggleMenu = (userId) => {
    setShowMenu((prev) => (prev === userId ? null : userId));
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setFilteredUsers(
      mockData.filter((user) =>
        user.username.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  const handleEmojiSelect = (emoji) => {
    setMessage((prev) => prev + emoji);
    setShowEmojiPicker(false);
  };

  const handleSendMessage = () => {
    setChat((prevChat) => [...prevChat, `Admin: ${message}`]);
    setMessage("");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* User List */}
      <div className="w-1/4 bg-white p-4 border-r">
        <div className="mb-4 flex items-center">
          <FaSearch className="text-gray-500" />
          <input
            type="text"
            className="ml-2 p-2 border rounded-md w-full"
            placeholder="Tìm kiếm người dùng"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <h2 className="text-xl font-semibold mb-4">Người dùng</h2>
        <ul className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto"> {/* Giới hạn chiều cao và thêm thanh cuộn */}
          {filteredUsers.map((user) => (
            <li
              key={user.id}
              onClick={() => handleSelectUser(user)}
              className={`flex items-center p-2 cursor-pointer hover:bg-gray-200 rounded-md ${
                activeUser?.id === user.id ? "bg-gray-300" : ""
              }`}
            >
              <FaUserCircle className="text-4xl text-gray-600 mr-4" />
              <div className="flex-1">
                <span className="font-semibold">{user.username}</span>
                <p className="text-sm text-gray-500 truncate">
                  {user.messages[user.messages.length - 1]}
                </p>
              </div>
              {user.unread > 0 && (
                <span className="bg-red-500 text-white text-xs rounded-full px-2 ml-2">
                  {user.unread}
                </span>
              )}
              <div
                ref={menuRef}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMenu(user.id);
                }}
                className="relative ml-2"
              >
                <FaEllipsisH className="text-gray-500 cursor-pointer" />
                {showMenu === user.id && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-50">
                    <ul className="space-y-2 p-2 text-sm">
                      <li className="cursor-pointer hover:bg-gray-100 p-2">Lưu tin nhắn</li>
                      <li className="cursor-pointer hover:bg-gray-100 p-2">Xóa tin nhắn</li>
                      <li className="cursor-pointer hover:bg-gray-100 p-2">Chặn tin nhắn</li>
                    </ul>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col p-4">
        <div className="flex-1 bg-white p-4 border rounded-md mb-4 max-h-[700px] overflow-y-auto">
          <h2 className="font-semibold mb-4">
            Trò chuyện với {activeUser ? activeUser.username : "Người dùng"}
          </h2>
          <div className="space-y-4">
            {chat.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.startsWith("Admin") ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`p-2 rounded-lg max-w-xs ${
                    msg.startsWith("Admin") ? "bg-blue-100" : "bg-gray-200"
                  }`}
                >
                  <span>{msg}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Message Input */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="p-2 bg-gray-200 rounded-md"
          >
            <FaRegSmile className="text-gray-600" />
          </button>

          <input
            type="text"
            className="flex-1 p-2 border rounded-md"
            placeholder="Nhập tin nhắn..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            onClick={handleSendMessage}
            className="p-2 bg-blue-500 text-white rounded-md"
            disabled={message.length === 0}
          >
            <FaPaperPlane />
          </button>
          <button className="p-2 bg-gray-200 rounded-md">
            <BsFillFileEarmarkTextFill className="text-gray-600" />
          </button>
        </div>

        {/* Emoji Picker */}
        {showEmojiPicker && (
          <div className="absolute bottom-1 bg-white border rounded-md shadow-lg z-50 p-2">
            <div className="grid grid-cols-4 gap-2">
              <span
                className="cursor-pointer text-xl"
                onClick={() => handleEmojiSelect("😊")}
              >
                😊
              </span>
              <span
                className="cursor-pointer text-xl"
                onClick={() => handleEmojiSelect("😂")}
              >
                😂
              </span>
              <span
                className="cursor-pointer text-xl"
                onClick={() => handleEmojiSelect("❤️")}
              >
                ❤️
              </span>
              <span
                className="cursor-pointer text-xl"
                onClick={() => handleEmojiSelect("👍")}
              >
                👍
              </span>
            </div>
          </div>
        )}

        {message.length > 500 && (
          <div className="text-red-500 text-xs mt-2">
            Tin nhắn không được vượt quá 500 ký tự.
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatCus;
