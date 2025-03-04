import {ClipLoader} from 'react-spinners';

const LoadingPageSkeleton = () => {

  return (
      <div
            className={'h-screen w-full flex justify-center items-center max-h-screen'}
      >
        <ClipLoader
            color={'blue'}
            loading={true}
            size={100}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
      </div>
  );
};

export default LoadingPageSkeleton;