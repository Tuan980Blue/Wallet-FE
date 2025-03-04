import { Box, Button, Typography } from '@mui/material';
import { MdAccountBalanceWallet, MdAccountBalance, MdSupportAgent , MdReceiptLong } from "react-icons/md";
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const ServiceButton = ({ icon: Icon, text, path, onClick }) => (
    <Button
        onClick={() => onClick(path)}
        sx={{
            fontSize: '1rem',
            padding: '12px 20px',
            borderRadius: '15px',
            width: '250px',
            backgroundColor: '#4285F4',
            color: 'white',
            boxShadow: 4,
            '&:hover': {
                backgroundColor: '#357AE8',
                transform: 'scale(1.05)',
            },
            transition: 'all 0.3s ease',
            '&:active': {
                transform: 'scale(0.97)',
            },
        }}
    >
        <Icon style={{ marginRight: '10px', fontSize: '1.8rem' }} />
        {text}
    </Button>
);

ServiceButton.propTypes = {
    icon: PropTypes.elementType.isRequired,
    text: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired, 
};

export default function LayoutTransaction() {
    const navigate = useNavigate();

    const handleButtonClick = (path) => {
        navigate(path);
    };

    const buttonData = [
        { icon: MdReceiptLong, text: 'Giao dịch Khách hàng', path: '/admin1/user-transactions' },
        { icon: MdAccountBalanceWallet, text: 'Giao dịch ví', path: '/admin1/wallet-transaction' },
        { icon: MdAccountBalance, text: 'Giao dịch ngân hàng', path: '/admin1/bank-transaction' },
        { icon: MdSupportAgent , text: 'Giao dịch dịch vụ', path: '/admin1/service-transaction' },  
    ];

    return (
        <Box sx={{ width: '100%', padding: 4, backgroundColor: '#ffffff', borderRadius: '12px', boxShadow: 3 }}>
            <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 'bold', color: '#4285F4' }}>
                Quản lý Dịch vụ
            </Typography>
            <Box display="flex" justifyContent="center" flexWrap="wrap" gap={3} mt={3}>
                {buttonData.map((button, index) => (
                    <ServiceButton
                        key={index}
                        icon={button.icon}
                        text={button.text}
                        path={button.path}
                        onClick={handleButtonClick} 
                    />
                ))}
            </Box>
        </Box>
    );
}
