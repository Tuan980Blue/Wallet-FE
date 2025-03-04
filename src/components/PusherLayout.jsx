import {useEffect} from 'react';
import {useAuth} from '../modules/hooks/useAuth.jsx';
import pusher from '../services/pusher.js';
import {toast} from 'react-toastify';

const PusherLayout = ({children}) => {
  const {user} = useAuth();

  useEffect(() => {
    const channel = pusher.subscribe(user?.id ?? 'public');
    channel.bind('notification', (data) => {
      toast.success(data.message);
    });

    return () => {
      pusher.unsubscribe(user?.id ?? 'public');
    };
  }, [user?.id]);

  return (
      <div>
        {children}
      </div>
  );
};

export default PusherLayout;