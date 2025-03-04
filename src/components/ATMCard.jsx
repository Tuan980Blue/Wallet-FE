import {useState} from 'react';
import {creditCardFormat} from '../util/number.util.js';
import {SiVisa} from 'react-icons/si';

import ('../../public/css/ATMCard.jsx.css');

function ATMCard({
                   cardNumber,
                   cardHolder,
                   year, month,
                   bankName,
                   backgroundColor,
                   logo,
                   cvv,
                 })
{
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardFlip = () => {
    setIsFlipped(true);
    setTimeout(() => {
      setIsFlipped(false);
    }, 3000);
  };

  return (<div style={{
    backgroundImage: 'url(/galaxy.jpg)',
    backgroundSize: 'cover',
    transformStyle: 'preserve-3d',
    backgroundPosition: 'center',
  }} className={`relative transform-gpu rounded-lg p-4 min-h-[220px] h-full text-white ${!backgroundColor
                                                                                         ? 'bg-blue-300'
                                                                                         : backgroundColor} transition-transform ease-linear ${isFlipped &&
  'rotate-y-180 perspective'}`} onClick={handleCardFlip}>
    <div className={`${isFlipped &&
    'hidden'}  backface-visibility-hidden flex flex-col justify-between items-start h-full`}>
      <img src={logo} alt="Bank Logo" className={'w-12 h-auto'}/>
      <div className={'w-full'}>{bankName}</div>
      <img src={'/card-chip.png'} alt="Chip Icon" className={'w-12'}/>
      <div className={'text-xl text-center'} style={{
        letterSpacing: '0.5rem',
      }}>{creditCardFormat(cardNumber.slice(0, 16))}</div>
      <div className={'flex justify-between w-full'}>
        <div>
          <div className={'line-clamp-1 overflow-ellipsis overflow-hidden whitespace-nowrap max-w-80'}>{cardHolder.toUpperCase()}</div>
          <div>Expiry: {month}/{year}</div>
        </div>
        <div className={'flex justify-center items-end'}>
          <SiVisa className={'text-4xl'}/></div>
      </div>
    </div>

    <div
        className={`absolute flex flex-col p-4 backface-visibility-hidden justify-between items-start top-0 left-0 w-full h-full rotate-y-180`}>
      <div className={'h-10 bg-black rounded mt-2 w-full'}/>
      <div className={'flex justify-start gap-2 items-center mt-4'}>
        <div>CVV</div>
        <div className={'text-center w-12 bg-gray-200 text-gray-700 font-bold py-2 rounded'}>
          {cvv}
        </div>
      </div>
      <span style={{
        marginTop: 'auto',
        fontSize: '0.8rem',
      }}>Customer Service: 123-456-7890</span>
    </div>

  </div>);
}

export default ATMCard;
