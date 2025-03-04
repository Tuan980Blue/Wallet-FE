import TransactionChart from '../TransactionChart.jsx';
import {useQuery} from '@tanstack/react-query';
import {wGet} from '../../util/request.util.js';

const Statistical = () => {
  const {data, isLoading} = useQuery({
    queryKey: ['userAnalysis'],
    queryFn: () => wGet('/v1/user/analysis'),
  });

  return (
      <div className="p-6 rounded-lg">
        <TransactionChart data={data} isLoading={isLoading}/>
      </div>
  );
};

export default Statistical;