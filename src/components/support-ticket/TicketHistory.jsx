import  { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  Paper,
  Dialog,
  DialogContent,
  DialogActions,
} from '@mui/material';
import TicketDetail from './TicketDetail';
import { FaAngleRight } from 'react-icons/fa';

const TicketHistory = ({ displayedHistoryData, currentPage, totalPages, handlePageChange }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);

  const handleRowClick = (item) => {
    setSelectedTicket(item);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedTicket(null);
  };

  return (
    <div style={{ marginTop: '20px', backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', color: 'black' }}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#3f51b5' }}>
        Lịch sử yêu cầu
      </Typography>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Mã yêu cầu</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Trạng thái</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Chi tiết</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedHistoryData.map((item, index) => (
              <TableRow key={index} style={{ cursor: 'pointer' }}>
                <TableCell>{item.id}</TableCell>
                <TableCell>
                  {item.status === 'RESOLVED' ? (
                    <Typography sx={{ color: 'green' }}>Đã xử lý</Typography>
                  ) : item.status === 'CLOSED' ? (
                    <Typography sx={{ color: 'red' }}>Không chấp thuận</Typography>
                  ) : (
                    <Typography sx={{ color: 'orange' }}>Đang chờ</Typography>
                  )}
                </TableCell>
                <TableCell onClick={() => handleRowClick(item)}>
                  <FaAngleRight />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="contained" onClick={() => handlePageChange('prev')} disabled={currentPage === 1}>
          Trước
        </Button>
        <Typography variant="body1">Trang {currentPage} / {totalPages}</Typography>
        <Button variant="contained" onClick={() => handlePageChange('next')} disabled={currentPage === totalPages}>
          Tiếp theo
        </Button>
      </div>

      <Dialog 
        open={dialogOpen} 
        onClose={handleCloseDialog} 
        sx={{ 
            '& .MuiDialog-container': {
            borderRadius: '10px',
            },
            '& .MuiPaper-root': {
            borderRadius: '10px',
            }
        }}
        >
        <DialogContent sx={{ background: 'linear-gradient(to right, #06b6d4, #3b82f6)', color: 'white' }}>
            {selectedTicket && <TicketDetail request={selectedTicket} />}
        </DialogContent>
        <DialogActions sx={{ background: 'linear-gradient(to right, #06b6d4, #3b82f6)', borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px' }}>
            <Button onClick={handleCloseDialog} sx={{ color: 'white' }}>
            Đóng
            </Button>
        </DialogActions>
        </Dialog>


    </div>
  );
};

export default TicketHistory;
