import { useState, useMemo, useEffect } from 'react';
import { Button, Container, FormControlLabel, Checkbox, TextField, MenuItem, Typography } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TicketHistory from './TicketHistory';
import { wGet, wPost } from '../../util/request.util';
import { useAuth } from '../../modules/hooks/useAuth';
import TicketRequestSuccess from './TicketRequestSuccess';
import { useQuery } from '@tanstack/react-query';
import LoadingPageSkeleton from '../LoadingPageSkeleton';

const TicketPage = () => {

    const { user } = useAuth()
    const [activeSection, setActiveSection] = useState('createRequest');
    const [requestType, setRequestType] = useState('');
    const [reasonList, setReasonList] = useState([]);
    const [selectedReason, setSelectedReason] = useState('');
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [canClick, setCanClick] = useState(true);

    const reasons = useMemo(() => ({
        "Hỗ trợ hoàn trả giao dịch chuyển tiền": ["Giao dịch bị lỗi", "Người hưởng chưa nhận được tiền", "Sai thông tin người nhận"],
        "Hỗ trợ chỉnh thông tin giao dịch chuyển tiền": ["Chỉnh sửa số tài khoản", "Chỉnh sửa tên người nhận"],
        "Kiểm tra trạng thái giao dịch": ["Người hưởng chưa nhận được tiền", "Giao dịch đang xử lý lâu"]
    }), []);
    
    const fetchHistoryList = async () => {
        const userId = user?.id; 
        if (!userId) throw new Error("Không tìm thấy người dùng.");
        
        try {
            const response = await wGet(`/v1/ticket/user/${userId}`);
            if (response.length > 0) { 
                handleRefetchHistory();
                return response; 
            } else {
                throw new Error("Không có dữ liệu trong lịch sử.");
            }
        } catch (error) {
            throw new Error("Lỗi khi tải dữ liệu lịch sử.");
        }
    };
    
    const { data: historyList, isLoading: isLoadingHistory, error: historyError, refetch } = useQuery({
        queryKey: ['ticketHistory', user?.id],
        queryFn: fetchHistoryList,
        staleTime: 5 * 60 * 1000,
        cacheTime: 30 * 60 * 1000,
        enabled: activeSection === 'searchHistory' && !! user?.id,
    });
    
    const totalPages = Math.ceil(historyList?.length / itemsPerPage);
    const displayedHistoryData = historyList?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) || [];

    const handleCreateRequest = () => setActiveSection('createRequest');
    const handleSearchHistory = () => setActiveSection('searchHistory');

    const handleRequestTypeChange = (event) => {
        const type = event.target.value;
        if (reasons[type]) {
            setRequestType(type);
        } else {
            showToast("Loại yêu cầu không hợp lệ.");
        }
    };

    const handleReasonChange = (event) => {
        setSelectedReason(event.target.value);
    };

    const handleCheckboxChange = (event) => {
        setAgreeTerms(event.target.checked);
    };

    const showToast = (message) => {
        toast.dismiss(); 
        toast.error(message);
    };


    useEffect(() => {
        if (requestType) {
            setReasonList(reasons[requestType] || []);
            setSelectedReason('');
        } else {
            setReasonList([]);
            setSelectedReason('');
        }
    }, [reasons, requestType]);

    const validateForm = (requestType, selectedReason, agreeTerms) => {
        if (!requestType) {
            showToast("Vui lòng chọn loại yêu cầu.");
            return false; 
        }
        if (!selectedReason) {
            showToast("Vui lòng chọn lý do tra soát.");
            return false; 
        }
        if (!agreeTerms) {
            showToast("Bạn cần đồng ý với các điều khoản dịch vụ.");
            return false; 
        }
        return true; 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm(requestType, selectedReason, agreeTerms)) {
            return;
        }

        if (!canClick) return;

        setIsSubmitting(true);
        setCanClick(false);

        try {
            const response = await debouncedCreateTicket(requestType, selectedReason);
            if (response.success) {
                handleRefetchHistory();
                setShowSuccessModal(true);
                setRequestType('');
                setSelectedReason('');
                setAgreeTerms(false);
            } else {
                showToast(response.message || "Đã xảy ra lỗi khi gửi yêu cầu.");
            }
        } catch (error) {
            showToast(error.message);
        } finally {
            setIsSubmitting(false);
            setTimeout(() => {
                setCanClick(true);
            }, 2000);
        }
    };

    const handleRefetchHistory = () => {
        refetch(); 
    };

    const createTicket = async (requestType, selectedReason) => {
        if (!requestType || !selectedReason) {
            throw new Error("Thông tin yêu cầu không hợp lệ."); 
        }
        const userId = user?.id;
        const body = {
            customer: {
                id: userId
            },
            title: requestType,
            content: selectedReason,
            status: "OPEN"
        };
        try {
            const response = await wPost(`/v1/ticket/create`, body);           
            if (typeof response === 'string') {
                return { success: true, message: response };  
            }
            if (response.data && response.data.success) {
                return response.data;
            } else {
                throw new Error("Phản hồi không hợp lệ từ API.");
            }
        } catch (error) {

            if (error.response) {
                const errorMessage = error.response.data || "Đã xảy ra lỗi từ phía server."; 
                throw new Error(errorMessage);
            } else if (error.request) {
                throw new Error("Không thể kết nối đến server. Vui lòng kiểm tra mạng.");
            } else {
                throw new Error(`Unexpected Error: ${error.message}`);
            }
        }
    };

    const debounce = (func, delay) => {
        let timeoutId;
        return (...args) => {
            return new Promise((resolve, reject) => {
                if (timeoutId) {
                    clearTimeout(timeoutId);
                }
                timeoutId = setTimeout(async () => {
                    try {
                        const result = await func(...args); 
                        resolve(result); 
                    } catch (error) {
                        reject(error);
                    }
                }, delay);
            });
        };
    };

    const debouncedCreateTicket = useMemo(() => debounce(createTicket, 300), []);

    const handlePageChange = (direction) => {
        if (direction === 'next' && currentPage < totalPages) {
            setCurrentPage(prevPage => prevPage + 1);
        } else if (direction === 'prev' && currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    return (
        <Container
            maxWidth="sm" 
            sx={{
                textAlign: 'center',
                padding: '20px',
                background: 'linear-gradient(to right, #06b6d4, #3b82f6)',
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                color: 'white',
                marginBottom: '20px'
            }}
        >
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: 'white' }}>
                HỖ TRỢ YÊU CẦU
            </Typography>
            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0' }}>
                <Button
                    variant="contained"
                    sx={{
                        flex: '0 0 48%',
                        padding: '10px 20px',
                        fontSize: '16px',
                        borderRadius: '10px',
                        background: 'linear-gradient(to right, #06b6d4, #3b82f6)',
                        color: 'white',
                    }}
                    onClick={handleCreateRequest}
                >
                    Lập yêu cầu
                </Button>
                <Button
                    variant="contained"
                    sx={{
                        flex: '0 0 48%',
                        padding: '10px 20px',
                        fontSize: '16px',
                        borderRadius: '10px',
                        background: 'linear-gradient(to right, #06b6d4, #3b82f6)',
                        color: 'white',
                    }}
                    onClick={handleSearchHistory}
                >
                    Lịch sử yêu cầu
                </Button>
            </div>

            {activeSection === 'createRequest' && (
                <div style={{ marginTop: '20px', backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', color: 'black' }}>
                    <TextField
                        label="Loại yêu cầu"
                        select
                        value={requestType}
                        onChange={handleRequestTypeChange}
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        <MenuItem value="" disabled>Chọn loại yêu cầu</MenuItem>
                        {Object.keys(reasons).map((type) => (
                            <MenuItem key={type} value={type}>{type}</MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        label="Lý do"
                        select
                        value={selectedReason}
                        onChange={handleReasonChange}
                        disabled={!requestType}
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        <MenuItem value="" disabled>Chọn lý do tra soát</MenuItem>
                        {reasonList.map((reason, index) => (
                            <MenuItem key={index} value={reason}>{reason}</MenuItem>
                        ))}
                    </TextField>

                    <FormControlLabel 
                        style={{ marginTop: '20px' }}
                        control={
                            <Checkbox checked={agreeTerms} onChange={handleCheckboxChange} />
                        }
                        label={
                            <Typography variant="body2">
                                Bạn đồng ý với các <u className='text-green-500'>điều khoản và dịch vụ</u> của trang thanh toán của chúng tôi.
                            </Typography>
                        }
                    />
                    
                    <Button
                        variant="contained"
                        fullWidth 
                        sx={{
                            margin: '20px 0',
                            padding: '10px 20px',
                            fontSize: '16px',
                            borderRadius: '10px',
                            background: 'linear-gradient(to right, #06b6d4, #3b82f6)',
                            color: 'white',
                        }}
                        onClick={handleSubmit}
                        disabled={isSubmitting || !canClick}
                    >
                        {isSubmitting ? "Đang gửi..." : "Gửi yêu cầu"}
                    </Button>
                </div>
            )}
            {activeSection === 'searchHistory' && (
                <>
                    {isLoadingHistory ? (
                        <LoadingPageSkeleton /> 
                    ) : historyError ? (
                        <Typography color="error">
                            {historyError.message} 
                        </Typography>
                    ) : (
                        <TicketHistory displayedHistoryData={displayedHistoryData} currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange}/>
                    )}
                </>
            )}
            {showSuccessModal && (
                <TicketRequestSuccess onClose={() => setShowSuccessModal(false)} />
            )}
        </Container>
    );
};

export default TicketPage;
