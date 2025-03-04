import {GrTransaction} from 'react-icons/gr';
import {useEffect, useState} from 'react';
import {wDelete, wGet} from '../../util/request.util.js';
import AddCardHolder from '../../components/atm/AddCardHolder.jsx';
import ATMCard from '../../components/ATMCard.jsx';
import {Modal} from '@mantine/core';
import AddAtmForm from '../../components/atm/AddAtmForm.jsx';
import {useQuery} from '@tanstack/react-query';
import {revalidateCache} from '../../modules/cache.js';
import {toast} from 'react-toastify';

const AtmPage = () => {
  const [bankList, setBankList] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);

  useEffect(() => {
    wGet('/v1/banks').then((res) => {
      setBankList(res);
    });
  }, []);

  const {data: cardList} =
      useQuery({
        queryKey: ['card-list'],
        queryFn: async () => await wGet('/v1/card'),
        staleTime: 1000 * 60 * 10,
      });

  const openModal = (event) => {
    event.preventDefault();
    setIsOpenModal(true);
  };

  const handleDelete = (cardNumber) => {
    wDelete(`/v1/card/${cardNumber}`).then(() => {
      revalidateCache('card-list').then();
    });
  };

  // Tìm ngân hàng dựa vào id
  const findBankById = (id) => {
    return bankList.find(bank => bank.id + '' === id) || {};
  };

  return (
      <div className="md:p-6 flex items-center justify-center">
        <Modal size={'75%'}
               centered opened={isOpenModal} onClose={() => {
          setIsOpenModal(false);
        }}>
          <div className={'text-center text-3xl'}><h3>Thêm thẻ liên kết</h3></div>
          <AddAtmForm onSubmit={() => {
            revalidateCache('card-list').then(() => {
              toast.success('Thêm thẻ liên kết thành công')
              setIsOpenModal(false);
            })
          }}/>
        </Modal>
        <div
            className="w-full max-w-[900px] my-auto mx-0 p-5 bg-white border border-dashed border-green-500 rounded-lg">
          <form>
            <div className="head-form flex items-center mb-5">
              <div className="icons mr-2 text-green-500">
                <GrTransaction/>
              </div>
              <div className="head-title text-green-500">
                <p>Thẻ/Tài khoản ngân hàng</p>
              </div>
            </div>
            <div className="body-title mb-2 font-semibold text-green-500 flex items-start border-b-[1px] border-black">
              <p>Thẻ/tài khoản nội địa(rút)</p>
            </div>
            <div className="body-section">
              <div
                  className="atm-container mt-5 grid min-w-[781px]:grid grid-cols-1 md:grid-cols-2 gap-3 mb-6 ">
                {cardList?.map((card) => {
                  const bank = findBankById(card.atmId); // Tìm ngân hàng dựa vào id
                  return (
                      <div key={card.id} className={'w-full h-[230px]'}>
                        <ATMCard
                            cardNumber={card.cardNumber}
                            cardHolder={card.holderName}
                            month={card.month}
                            year={card.year}
                            cvv={999}
                            bankName={bank.shortName}
                            backgroundColor="bg-blue-500"
                            chipIcon={bank.logo}
                            logo={bank.logo}
                        />
                      </div>
                  );
                })}
                <AddCardHolder
                    title="Thêm thẻ ATM"
                    text="Bạn có thể thêm thẻ ATM vào đây"
                    link="#"
                    onClick={openModal}
                />

              </div>
            </div>
          </form>
        </div>
      </div>
  );
};

export default AtmPage;

