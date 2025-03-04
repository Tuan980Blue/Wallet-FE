import {useNavigate, useParams} from 'react-router-dom';
import {wGet} from '../../util/request.util.js';
import {useQuery} from '@tanstack/react-query';
import {Avatar, Button, Card, Skeleton, Tooltip} from '@mantine/core';
import {IoIosCheckmarkCircle} from 'react-icons/io';
import {statusStrings, transactionStatusColor, transactionType} from '../../util/status.util.js';
import {MdArrowOutward} from 'react-icons/md';
import {useEffect, useState} from 'react';

function getType(type) {
  switch (type) {
    case 'TRANSFER_MONEY':
      return 'OUT';
    case 'RECEIVE_MONEY':
      return 'IN';
    case 'TOP_UP':
      return 'IN';
    case 'WITHDRAW':
      return 'OUT';
    case 'TOP_UP_GROUP_FUND':
      return 'OUT';
    case 'WITHDRAW_GROUP_FUND':
      return 'IN';
  }
}

const TransactionDetailPage = () => {
  const {id} = useParams();
  const [other, setOther] = useState();
  const {isLoading, data: transaction} = useQuery({
    queryKey: ['transaction', id],
    queryFn: () => wGet(`/v1/transaction/${id}`),
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (transaction) {
      if (getType(transaction.flowType) === 'IN') {
        setOther(transaction.senderName);
      }
      else {
        setOther(transaction.receiverName);
      }
    }
  }, [transaction]);

  return (
      <Card className="max-w-2xl mx-auto bg-white shadow-lg p-6 my-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            {isLoading ? (
                <Skeleton height={20} width={20}/>
            ) : (
                 // {transactionIcon[transaction.variant]}
                 <div></div>
             )}
            <h2 className="text-xl font-semibold">
              {isLoading ? <Skeleton width="120px"/> : 'Chi tiết giao dịch'}
            </h2>
          </div>
          <span className={`flex items-center ${transactionStatusColor[transaction?.status]}`}>
          <IoIosCheckmarkCircle/>
            {isLoading ? <Skeleton width="80px"/> : statusStrings[transaction.status]}
        </span>
        </div>

        {/* Transaction ID */}
        <div className="mb-6">
          <p className="text-sm text-gray-500">Mã giao dịch</p>
          <p className="font-medium">
            {isLoading ? <Skeleton width="100%" height="20px"/> : transaction.id}
          </p>
        </div>

        {/* Amount */}
        <div className="mb-6">
          <p className="text-sm text-gray-500">Số tiền</p>
          <p className="text-2xl font-bold text-green-600">
            {isLoading ? <Skeleton width="150px" height="32px"/> : `${transaction.amount.toLocaleString('vi-VN')} VND`}
          </p>
        </div>
        {/* Transfer Details */}
        <div className="bg-gray-100 p-4 rounded-lg mb-6">
          <div className="flex items-center justify-between">
            <div>
              {isLoading ? (<Skeleton height={'32px'} width={'32px'}/>) : (
                  <p className="text-sm text-gray-500 mt-1">{getType(transaction.flowType) === 'IN'
                                                             ? 'Bên gửi'
                                                             : 'Bên nhận'}</p>
              )}
              <div className="flex items-center space-x-2 mt-1">
                {isLoading ? (
                    <Skeleton circle width="32px" height="32px"/>
                ) : (
                     <Avatar
                         src={null}
                         alt={other}
                         name={other}
                         className="w-12 h-12 rounded-full"
                     />
                 )}
                <div>
                  <p className="font-medium">
                    {isLoading ? <Skeleton width="80px"/> : other}
                  </p>

                  {/* <p className="text-sm text-gray-500">
                   {isLoading ? <Skeleton width="120px"/> : other}
                   </p>*/}

                </div>
              </div>
            </div>
            <MdArrowOutward/>
          </div>
        </div>

        {/* Additional Info */}
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">Nội dung chuyển khoản</p>
            <p className="font-medium">
              {isLoading ? <Skeleton width="100%" height="20px"/> : transaction.message || 'Không có nội dung'}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Thời gian giao dịch</p>
            <p className="font-medium">
              {isLoading ? <Skeleton width="150px"/> : new Date(transaction.created).toLocaleString('vi-VN')}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Loại giao dịch</p>
            <p className="font-medium">
              {isLoading ? <Skeleton width="150px"/> : transactionType[transaction.flowType]}
            </p>
          </div>
        </div>
        <div className={'flex justify-end items-center'}>
          <Tooltip label={'Tính năng đang phát triển'}>
            <Button variant={'outline'} color={'orange'} disabled>Khiếu nại</Button>
          </Tooltip>
        </div>
      </Card>
  );
};

export default TransactionDetailPage;