import {Skeleton} from '@mantine/core';

const FullBlockLoading = () => {
  return (
     <div className={'min-h-screen w-full'}>
       <Skeleton  height={'100%'} width={'100%'}/>
     </div>
  );
};

export default FullBlockLoading;