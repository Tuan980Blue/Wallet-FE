import { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, TablePagination, TextField, MenuItem } from "@mui/material";
import { FaCaretRight } from "react-icons/fa6";
import { FaCheckCircle, FaTimesCircle, FaExchangeAlt, FaCalendarDay } from "react-icons/fa";

const transactions = [
    { id: "TXN001", senderId: "USER1234567890ABC", receiverId: "USER0987654321XYZ", amount: 500000, status: "Thành công", date: "2024-11-08" },
    { id: "TXN002", senderId: "USER9876543210LMN", receiverId: "USER8765432109OPQ", amount: 2000000, status: "Đang chờ", date: "2024-11-07" },
    { id: "TXN003", senderId: "USER2345678901DEF", receiverId: "USER7654321098GHI", amount: 750000, status: "Thất bại", date: "2024-11-06" },
    { id: "TXN004", senderId: "USER3456789012JKL", receiverId: "USER6543210987MNO", amount: 1000000, status: "Thành công", date: "2024-11-05" },
    { id: "TXN005", senderId: "USER4567890123PQR", receiverId: "USER5432109876STU", amount: 250000, status: "Thành công", date: "2024-11-04" },
    { id: "TXN006", senderId: "USER6789012345VWX", receiverId: "USER4321098765YZA", amount: 1250000, status: "Thất bại", date: "2024-11-03" },
];

const AllWalletTransaction = () => {
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage] = useState(6);
    const [searchId, setSearchId] = useState("");
    const [searchUserId, setSearchUserId] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const totalTransactions = transactions.length;
    const successfulTransactions = transactions.filter(t => t.status === "Thành công").length;
    const failedTransactions = transactions.filter(t => t.status === "Thất bại").length;
    const today = new Date().toISOString().split('T')[0];
    const todayTransactions = transactions.filter(t => t.date === today).length;

    const handleViewDetails = (transaction) => {
        setSelectedTransaction(transaction);
    };

    const handleCloseDetails = () => {
        setSelectedTransaction(null);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const shortenId = (id) => (id.length > 10 ? `${id.substring(0, 10)}...` : id);

    const handleFilterTransactions = () => {
        return transactions.filter((transaction) => {
            const matchesId = transaction.id.includes(searchId);
            const matchesUserId = transaction.senderId.includes(searchUserId) || transaction.receiverId.includes(searchUserId);
            const matchesStatus = statusFilter ? transaction.status === statusFilter : true;

            const transactionDate = new Date(transaction.date);
            const start = startDate ? new Date(startDate) : null;
            const end = endDate ? new Date(endDate) : null;

            const matchesDateRange = (!start || transactionDate >= start) &&
                                     (!end || transactionDate <= end);
                                     
            return matchesId && matchesUserId && matchesStatus && matchesDateRange;
        });
    };

    const displayedTransactions = handleFilterTransactions().slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <div className="px-6 pb-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
                <div className="flex flex-col items-center justify-center bg-gradient-to-r from-blue-300 to-blue-300 p-4 rounded-lg shadow-lg space-y-1">
                    <FaExchangeAlt className="text-blue-600 text-2xl" />
                    <span className="text-gray-700 font-semibold">Tổng giao dịch</span>
                    <span className="text-xl font-bold text-blue-800">{totalTransactions}</span>
                </div>
                <div className="flex flex-col items-center justify-center bg-gradient-to-r from-green-300 to-green-300 p-4 rounded-lg shadow-lg space-y-1">
                    <FaCheckCircle className="text-green-600 text-2xl" />
                    <span className="text-gray-700 font-semibold">Giao dịch thành công</span>
                    <span className="text-xl font-bold text-green-800">{successfulTransactions}</span>
                </div>
                <div className="flex flex-col items-center justify-center bg-gradient-to-r from-red-300 to-red-300 p-4 rounded-lg shadow-lg space-y-1">
                    <FaTimesCircle className="text-red-600 text-2xl" />
                    <span className="text-gray-700 font-semibold">Giao dịch thất bại</span>
                    <span className="text-xl font-bold text-red-800">{failedTransactions}</span>
                </div>
                <div className="flex flex-col items-center justify-center bg-gradient-to-r from-yellow-200 to-yellow-200 p-4 rounded-lg shadow-lg space-y-1">
                    <FaCalendarDay className="text-yellow-600 text-2xl" />
                    <span className="text-gray-700 font-semibold">Giao dịch hôm nay</span>
                    <span className="text-xl font-bold text-yellow-800">{todayTransactions}</span>
                </div>
            </div>

            <div className="flex space-x-4 mb-4">
                <TextField
                    label="ID Giao dịch"
                    variant="outlined"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                    className="flex-grow"
                    style={{ minWidth: 120 }}
                />
                <TextField
                    label="ID Người dùng"
                    variant="outlined"
                    value={searchUserId}
                    onChange={(e) => setSearchUserId(e.target.value)}
                    className="flex-grow"
                    style={{ minWidth: 120 }}
                />
                <TextField
                    label="Trạng thái"
                    variant="outlined"
                    select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="flex-grow"
                    style={{ minWidth: 120 }}
                >
                    <MenuItem value="">Tất cả</MenuItem>
                    <MenuItem value="Thành công">Thành công</MenuItem>
                    <MenuItem value="Đang chờ">Đang chờ</MenuItem>
                    <MenuItem value="Thất bại">Thất bại</MenuItem>
                </TextField>
                <TextField
                    label="Từ ngày"
                    variant="outlined"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="flex-grow"
                    style={{ minWidth: 120 }}
                />
                <TextField
                    label="Đến ngày"
                    variant="outlined"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="flex-grow"
                    style={{ minWidth: 120 }}
                />
            </div>
            <TableContainer component={Paper} className="shadow-md">
                <Table aria-label="Transaction Table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID Giao dịch</TableCell>
                            <TableCell>ID Người gửi</TableCell>
                            <TableCell>ID Người nhận</TableCell>
                            <TableCell>Số tiền (VND)</TableCell>
                            <TableCell>Trạng thái</TableCell>
                            <TableCell>Ngày giao dịch</TableCell>
                            <TableCell>Chi tiết</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {displayedTransactions.map((transaction) => (
                            <TableRow key={transaction.id}>
                                <TableCell>{transaction.id}</TableCell>
                                <TableCell>{shortenId(transaction.senderId)}</TableCell>
                                <TableCell>{shortenId(transaction.receiverId)}</TableCell>
                                <TableCell>{transaction.amount.toLocaleString("vi-VN")}</TableCell>
                                <TableCell>
                                    <span
                                        className={`px-2 py-1 rounded-full text-white ${
                                            transaction.status === "Thành công" ? "bg-green-500" :
                                            transaction.status === "Đang chờ" ? "bg-yellow-500" : 
                                            "bg-red-500"
                                        }`}
                                    >
                                        {transaction.status}
                                    </span>
                                </TableCell>
                                <TableCell>{transaction.date}</TableCell>
                                <TableCell>
                                    <Button
                                        onClick={() => handleViewDetails(transaction)}
                                        style={{ minWidth: 0, padding: 0 }} 
                                    >
                                        <FaCaretRight style={{ fontSize: "1.25rem", color: "#3B82F6" }} />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    component="div"
                    count={handleFilterTransactions().length}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    rowsPerPageOptions={[6]}
                    labelDisplayedRows={({ from, to, count }) => `${from}-${to} trên ${count}`}
                />
            </TableContainer>

            {selectedTransaction && (
                <Dialog
                    open={Boolean(selectedTransaction)}
                    onClose={handleCloseDetails}
                    aria-labelledby="transaction-details-title"
                >
                    <DialogTitle id="transaction-details-title">Chi tiết giao dịch</DialogTitle>
                    <DialogContent>
                        <p><strong>ID Giao dịch:</strong> {selectedTransaction.id}</p>
                        <p><strong>ID Người gửi:</strong> {selectedTransaction.senderId}</p>
                        <p><strong>ID Người nhận:</strong> {selectedTransaction.receiverId}</p>
                        <p><strong>Số tiền:</strong> {selectedTransaction.amount.toLocaleString("vi-VN")} VND</p>
                        <p><strong>Trạng thái:</strong> {selectedTransaction.status}</p>
                        <p><strong>Ngày giao dịch:</strong> {selectedTransaction.date}</p>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDetails} color="secondary">
                            Đóng
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </div>
    );
};

export default AllWalletTransaction;
