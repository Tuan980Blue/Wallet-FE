import 'react-toastify/dist/ReactToastify.css';
import {ScrollRestoration, useNavigate, useParams} from 'react-router-dom';
import {wGet} from '../../util/request.util.js';
import {ToastContainer} from 'react-toastify';
import MyWallet from '../account/WalletSection.jsx';
import {useQuery} from '@tanstack/react-query';
import OrderDetails from '../OrderDetails.jsx';

const ServicePayment = () => {
  //lấy thông tin thanh toán
  const {id} = useParams();
  const navigate = useNavigate();

  const {isLoading, data: order, error} = useQuery({
    queryKey: [`order-${id}`, id],
    queryFn: () => wGet(`/v1/orders/${id}`),
    staleTime: 5 * 1000 * 60,
  });

  if (error) {
    navigate('/404');
  }

  return (<div className={'md:flex justify-around w-full md:gap-3 md:px-10 py-5'}>
    <div className={'w-full hidden md:flex'}>
      <MyWallet/>
    </div>
    <div className="flex justify-center w-full items-start bg-gray-100">
      <OrderDetails order={order} isLoading={isLoading}/>

      <ToastContainer stacked/>
      <ScrollRestoration/>
    </div>
  </div>);
};

export default ServicePayment;
