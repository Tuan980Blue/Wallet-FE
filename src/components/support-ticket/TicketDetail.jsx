import { Typography, Paper, Button, Box, Divider, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { MdFindReplace, MdContactSupport, MdOutlineErrorOutline } from "react-icons/md";
import { toast, ToastContainer } from 'react-toastify';
import { useState } from 'react';
import { FaCheck } from "react-icons/fa";
import { TbClockEdit } from "react-icons/tb";
import { wPost } from '../../util/request.util';
import TicketRequestSuccess from './TicketRequestSuccess';
import { useAuth } from '../../modules/hooks/useAuth';
import 'react-toastify/dist/ReactToastify.css';

const TicketDetail = ({ request }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { user } = useAuth();

  if (!request) {
    return <Typography variant="body1">Không có thông tin chi tiết yêu cầu.</Typography>;
  }

  let statusColor, backgroundColor, icon;

  switch (request.status) {
    case 'RESOLVED':
      statusColor = 'green';
      backgroundColor = '#d0f0c0'; 
      icon = <FaCheck style={{ marginRight: '8px', fontSize: '20px' }} />;
      break;
    case 'CLOSED':
      statusColor = 'red';
      backgroundColor = '#ffcccb'; 
      icon = <MdOutlineErrorOutline style={{ marginRight: '8px', fontSize: '20px' }} />;
      break;
    case 'OPEN':
      statusColor = 'orange';
      backgroundColor = '#ffe0b2'; 
      icon = <TbClockEdit style={{ marginRight: '8px', fontSize: '20px' }} />;
      break;
  }

  const handleSupportRequest = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const requetTicketAgain = async (ticketId) => {
    const userId = user?.id;
    const body = {
        title: request.title,  
        content: request.content, 
        customer: {
            id: userId,
        },
        status: "OPEN",
    };

    try {
        const response = await wPost(`/v1/ticket/${ticketId}/again`, body);
        if (typeof response === 'string') {
          return { success: true, message: response };  
        }
        if (response.data && response.data.success) {
            return response.data;
        } else {
            throw new Error("Phản hồi không hợp lệ từ API.");
        }
    } catch (error) {
        const errorMessage = error.response?.data || "Đã xảy ra lỗi từ phía server.";
        throw new Error(errorMessage);
    }
  };
  

  const handleDialogConfirm = async () => {
    try {
      const response = await requetTicketAgain(request.id);
      if (response.success) {
        setShowSuccessModal(true);
      } else {
        toast.error("Phản hồi không hợp lệ từ API.");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setOpenDialog(false);
    }
  };

  return (
    <Paper
      elevation={4}
      sx={{
        padding: '30px',
        marginTop: '20px',
        borderRadius: '12px',
        background: 'linear-gradient(to right, #e3f2fd, #bbdefb)',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)',
      }}
    >
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#0d47a1', textAlign: 'center' }}>
        Chi tiết yêu cầu
      </Typography>
      <Divider sx={{ marginY: '15px' }} />
      <Box sx={{ lineHeight: '1.8', padding: '10px 20px' }}>
        <Typography variant="body1">
          <strong>Mã tra cứu:</strong> {request.id}
        </Typography>
        <Typography variant="body1">
          <strong>Vấn đề:</strong> {request.title}
        </Typography>
        <Typography variant="body1">
          <strong>Chi tiết:</strong> {request.content}
        </Typography>
        <Box display="flex" alignItems="center" sx={{ marginTop: '10px' }}>
          <div style={{ color: statusColor, background: backgroundColor, padding: '5px 10px', borderRadius: '4px', display: 'flex', alignItems: 'center' }}>
            {icon}
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              {request.status === 'RESOLVED' ? 'Đã xử lý' : request.status === 'CLOSED' ? 'Không chấp thuận' : 'Đang chờ'}
            </Typography>
          </div>
        </Box>
      </Box>
      <Box display="flex" justifyContent="center" marginTop="30px" gap="20px">
        <Button
          variant="contained"
          startIcon={<MdFindReplace />}
          onClick={handleSupportRequest}
          sx={{
            backgroundColor: '#1976d2',
            color: 'white',
            ':hover': { backgroundColor: '#0d47a1', transform: 'scale(1.05)' },
            padding: '12px 24px',
            borderRadius: '10px',
            transition: 'transform 0.2s',
          }}
        >
          Yêu cầu hỗ trợ lại
        </Button>
        <Button
          variant="contained"
          startIcon={<MdContactSupport />}
          onClick={() => toast.info("Hỗ trợ trực tiếp đang trong quá trình phát triển!")} // Bạn có thể thay thế bằng hành động thực tế
          sx={{
            backgroundColor: '#388e3c',
            color: 'white',
            ':hover': { backgroundColor: '#1b5e20', transform: 'scale(1.05)' },
            padding: '12px 24px',
            borderRadius: '10px',
            transition: 'transform 0.2s',
          }}
        >
          Hỗ trợ trực tiếp
        </Button>
      </Box>

      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{ fontWeight: 'bold' }}>Xác nhận yêu cầu hỗ trợ lại</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có chắc chắn muốn gửi yêu cầu hỗ trợ lại không?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Hủy
          </Button>
          <Button onClick={handleDialogConfirm} color="primary" autoFocus>
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>

      {showSuccessModal && (
          <TicketRequestSuccess onClose={() => setShowSuccessModal(false)} />
      )}

      <ToastContainer />
    </Paper>
  );
};

export default TicketDetail;
