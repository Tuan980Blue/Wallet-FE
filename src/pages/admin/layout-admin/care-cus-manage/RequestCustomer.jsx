import { useState, useEffect } from "react";
import { FaRegCheckCircle, FaRegClock, FaRegTimesCircle } from "react-icons/fa";
import { wGet, wPut } from "../../../../util/request.util";

const ITEMS_PER_PAGE = 5;

const RequestCustomer = () => {
  const [openRequests, setOpenRequests] = useState([]);
  const [closedRequests, setClosedRequests] = useState([]);
  const [resolvedRequests, setResolvedRequests] = useState([]);
  const [setError] = useState(null);
  const [revealedIds, setRevealedIds] = useState({});
  const [searchTerm, setSearchTerm] = useState(""); // State for search term

  const [openPage, setOpenPage] = useState(1);
  const [closedPage, setClosedPage] = useState(1);
  const [resolvedPage, setResolvedPage] = useState(1);

  useEffect(() => {
    const fetchListRequest = async () => {
      try {
        const response = await wGet('/v1/ticket/all');
        if (response && response.length > 0) {
          setOpenRequests(response.filter((req) => req.status === "OPEN"));
          setClosedRequests(response.filter((req) => req.status === "CLOSED"));
          setResolvedRequests(response.filter((req) => req.status === "RESOLVED"));
        } else {
          setError("Không có dữ liệu trong lịch sử.");
        }
      } catch (error) {
        setError("Lỗi khi tải dữ liệu lịch sử.");
      }
    };

    fetchListRequest();
  }, []);

  const handleChangeStatus = async (id, newStatus) => {
    try {
      const response = await wPut(`/v1/ticket/${id}/status?status=${newStatus}`);
  
      if (!response) {
        throw new Error("Không thể cập nhật trạng thái");
      }
  
      const updateRequests = (requests) =>
        requests.map((request) =>
          request.id === id ? { ...request, status: newStatus } : request
        );
  
      setOpenRequests((prev) => updateRequests(prev));
      setClosedRequests((prev) => updateRequests(prev));
      setResolvedRequests((prev) => updateRequests(prev));
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái:", error);
      setError("Không thể cập nhật trạng thái yêu cầu.");
    }
  };

  const getMaskedId = (id) => id.replace(/.(?=.{4})/g, "*");

  const toggleUserIdVisibility = (id) => {
    setRevealedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const paginate = (items, page) => {
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    return items.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  };

  const filterRequests = (requests) =>
    requests.filter((request) => {
      const idString = typeof request.id === "string" ? request.id.toLowerCase() : "";
      const customerIdString = request.customer?.id
        ? request.customer.id.toString().toLowerCase()
        : ""; 
      const titleString = request.title ? request.title.toLowerCase() : "";
      const statusString = request.status ? request.status.toLowerCase() : "";
      const searchLower = searchTerm.toLowerCase();
  
      return (
        idString.includes(searchLower) ||
        customerIdString.includes(searchLower) || 
        titleString.includes(searchLower) ||
        statusString.includes(searchLower)
      );
    });

  const getStatusIcon = (status) => {
    switch (status) {
      case "OPEN":
        return <FaRegClock className="text-yellow-500" />;
      case "CLOSED":
        return <FaRegTimesCircle className="text-red-500" />;
      case "RESOLVED":
        return <FaRegCheckCircle className="text-green-500" />;
      default:
        return null;
    }
  };

  const renderRequestTable = (title, requests, page, setPage, colorClass) => {
    const filteredRequests = filterRequests(requests);
    const totalPages = Math.ceil(filteredRequests.length / ITEMS_PER_PAGE);
    const paginatedRequests = paginate(filteredRequests, page);

    return (
      <div className={`p-4 mb-6 rounded-lg shadow-lg ${colorClass}`}>
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <table className="table-auto w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2 text-gray-700">User ID</th>
              <th className="border px-4 py-2 text-gray-700">ID</th>
              <th className="border px-4 py-2 text-gray-700">Tiêu đề</th>
              <th className="border px-4 py-2 text-gray-700">Lý do</th>
              <th className="border px-4 py-2 text-gray-700">Trạng thái</th>
              <th className="border px-4 py-2 text-gray-700">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {paginatedRequests.length > 0 ? (
              paginatedRequests.map((request) => (
                <tr key={request.id} className="hover:bg-gray-50 transition duration-200">
                  <td
                    className="border px-4 py-2 text-gray-600 cursor-pointer"
                    onClick={() => toggleUserIdVisibility(request.id)}
                    style={{ width: "160px" }}
                  >
                    <span className="inline-block w-full text-center font-mono">
                      {revealedIds[request.id]
                        ? request.customer?.id
                        : getMaskedId(request.customer?.id || "")}
                    </span>
                  </td>
                  <td className="border px-4 py-2 text-gray-600">{request.id}</td>
                  <td className="border px-4 py-2 text-gray-600">{request.title}</td>
                  <td className="border px-4 py-2 text-gray-600">{request.content}</td>
                  <td className="border px-4 py-2">
                    <span className="font-semibold">
                      {getStatusIcon(request.status)}
                      {request.status}
                    </span>
                  </td>
                  <td className="border px-4 py-2">
                    <select
                      onChange={(e) => handleChangeStatus(request.id, e.target.value)}
                      value={request.status}
                      className="block appearance-none w-full bg-gray-100 text-gray-800 border border-gray-300 rounded p-2 hover:bg-gray-200 focus:outline-none"
                      disabled={request.status !== "OPEN"}
                    >
                      <option value="OPEN">🟡 Chưa xử lý</option>
                      <option value="CLOSED">🔴 Đã hủy yêu cầu</option>
                      <option value="RESOLVED">🟢 Đã xử lý</option>
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">Không có yêu cầu</td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className={`px-4 py-2 rounded ${page === 1 ? "bg-gray-300" : "bg-blue-500 text-white"}`}
          >
            Trang trước
          </button>
          <span className="text-gray-600">
            Trang {page} / {totalPages}
          </span>
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className={`px-4 py-2 rounded ${page === totalPages ? "bg-gray-300" : "bg-blue-500 text-white"}`}
          >
            Trang sau
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Yêu cầu của khách hàng</h1>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Tìm kiếm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      {renderRequestTable("Yêu cầu chưa xử lý", openRequests, openPage, setOpenPage, "bg-yellow-100")}
      {renderRequestTable("Yêu cầu đã xử lý", resolvedRequests, resolvedPage, setResolvedPage, "bg-green-100")}
      {renderRequestTable("Yêu cầu đã hủy", closedRequests, closedPage, setClosedPage, "bg-red-100")}
    </div>
  );
};

export default RequestCustomer;
