import {Navigate, Outlet} from 'react-router-dom';
import {useAuth} from '../../hooks/useAuth.jsx';
import LoadingPageSkeleton from '../../../components/LoadingPageSkeleton.jsx';

const ProtectedLayout = () => {
  const {user, loading} = useAuth();
  const path = location.href;

  if (loading) {
    return <LoadingPageSkeleton/>;
  }

  if (!user) {
    return <Navigate to={`/sign-in?returnUrl=${path}`} replace={true}/>;
  }

  return <Outlet/>;
};

export default ProtectedLayout;