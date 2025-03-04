import {wGet} from '../../util/request.util.js';
import {useQuery} from '@tanstack/react-query';
import {Pagination, Select, TextInput} from '@mantine/core';
import {MdOutlineSearch} from 'react-icons/md';
import {DatePickerInput} from '@mantine/dates';
import '@mantine/dates/styles.css';
import TransactionTable from '../../components/history/TransactionTable.jsx';
import {useForm} from '@mantine/form';
import {useSearchParams} from 'react-router-dom';
import {useEffect} from 'react';

const options = [
  {
    value: 'TẤT CẢ',
    label: 'TẤT CẢ CÁC GIAO DỊCH',
  }, {
    value: 'THANH TOÁN',
    label: 'THANH TOÁN',
  }, {
    value: 'NẠP TIỀN',
    label: 'NẠP TIỀN',
  }, {
    value: 'RÚT TIỀN',
    label: 'RÚT TIỀN',
  }, {
    value: 'CHUYỂN TIỀN',
    label: 'CHUYỂN TIỀN',
  }, {
    value: 'HOÀN TIỀN',
    label: 'HOÀN TIỀN',
  },
];
//Tạo Thành Phần Button:
const FilterButton = ({
                        label,
                        filterValue,
                        currentFilter,
                        onClick,
                      }) => {
  const isActive = currentFilter === filterValue;
  const buttonClass = `px-4 py-2 rounded border-1 hover:bg-green-300 ${isActive
                                                                       ? 'bg-green-500 text-white'
                                                                       : 'bg-slate-100'}`;
  return (
      <button className={buttonClass} onClick={() => {
      }}>
        {label}
      </button>
  );
};

const TransactionHistory = () => {

  return (
      <div className={'mb-4 flex'}>
        <div className={'w-full mt-10'}>
          <HistorySection/>
        </div>
      </div>
  );
};

function HistorySection() {
  let [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page') || 0;
  const filterForm = useForm({
    initialValues: {
      'filter': 'TẤT CẢ',
      'fromDate': new Date(),
      'toDate': new Date(),
    },
  });

  useEffect(() => {
    if (page < 0) {
      setSearchParams({page: 0});
    }
  }, [page, setSearchParams]);

  const {data} = useQuery({
    queryKey: [`transactions-history-${page}`],
    queryFn: async () => await wGet(`/v1/transaction/history?offset=10&page=${page < 0 ? 0 : page}`),
    staleTime: 1000 * 60 * 5,
  });

  const transactions = data?.data || [];
  const totalPage = Math.max(1, Math.ceil(data?.total / 10));

  return (
      <div className="flex flex-col items-center min-h-screen">
        <div>
          <h2 className="text-3xl font-semibold text-center text-gray-800 p-2">
            Lịch Sử Giao Dịch
          </h2>
        </div>
        <div className="bg-white mt-2 p-6 rounded-lg w-full max-w-6xl">
          <div className="mb-4 flex items-center justify-between">
            <TextInput
                {...filterForm.getInputProps('search')}
                type="text"
                size={'md'}
                placeholder="Tìm giao dịch"
                className="w-full"
            />
            <button className="ml-2 p-2 bg-gray-200 hover:bg-gray-300 rounded">
              <MdOutlineSearch className={'text-2xl'}/>
            </button>
          </div>
          <div className={'md:flex flex-col md:flex-row justify-between mb-4'}>
            <div className="md:flex space-x-2  hidden">
              {options.map((option) => (
                  <FilterButton key={option.value} label={option.value} filterValue={option.value}/>
              ))}
            </div>

            <Select
                className="w-full block md:hidden"
                size={'md'}
                data={options.map((option) => option.label)}
            />

          </div>
          <div className="flex flex-col lg:flex-row justify-between  gap-3">
            <div className="flex w-full">
              <div className="flex flex-col md:flex-row gap-2 w-full justify-start">
                <div className={'flex items-center'}>
                  <label className={'min-w-20'}>Lọc Theo:</label>
                  <Select className={'w-full'} size={'md'}
                  />
                </div>
                <div className="flex flex-col tm:flex-row items-center w-full gap-2">
                  <div className={'flex items-center w-full'}>
                    <div className={'min-w-20'}><label>Thời gian:</label></div>
                    <DatePickerInput size={'md'}
                                     {...filterForm.getInputProps('fromDate')}
                                     type="date"
                                     className="w-full"
                    />
                  </div>
                  <div className={'flex items-center w-full'}>
                    <label className={'mr-2'}>Đến:</label>
                    <DatePickerInput size={'md'}
                                     color={'rgb(26,180,74)'}
                                     maxDate={new Date()}
                                     value={filterForm.values.toDate}
                                     {...filterForm.getInputProps('toDate')}
                                     type="date"
                                     className=" w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div
                className="cursor-pointer text-blue-500 hover:text-red-600 flex justify-items-center min-w-20 items-center">
              <button>Xóa Bộ Lọc</button>
            </div>
          </div>

          <div className="mb-4 flex flex-col sm:flex-row gap-1 mt-3">
            <p>Có {data?.total} giao dịch.</p>
          </div>
          <>
            <TransactionTable list={transactions}/>
            <div className={'flex justify-center items-center mt-2'}>
              <Pagination
                  page={page}
                  total={totalPage}
                  className={'mt-2'}
                  onChange={(page) => {
                    setSearchParams({page: (page - 1).toString()});
                  }}
                  color={'rgb(26,180,74)'}
              />
            </div>
          </>
        </div>
      </div>
  );
}

export default TransactionHistory;