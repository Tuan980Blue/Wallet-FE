import {WalletSection} from '../account/WalletSection.jsx';
import {ScrollRestoration} from 'react-router-dom';
import TopUpForm from './TopUpForm.jsx';

const TopUp = () => {
  return (
      <div className="min-h-screen">
        <div className="w-full p-6 md:px-32 lg:px-40 flex flex-col md:flex-row">
          <div className="w-full md:w-2/3 ml-auto shrink">
            <TopUpForm/>
          </div>
          <div className="order-first  md:order-last w-full md:w-1/3 mb-6 md:mb-0 md:ml-9">
            <div className={'border rounded-lg bg-white'}>
              <WalletSection/>
            </div>
          </div>
        </div>
        <ScrollRestoration/>
      </div>
  );
};

export default TopUp;
