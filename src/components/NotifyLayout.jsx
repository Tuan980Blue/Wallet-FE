import {useEffect} from 'react';
import pusher from '../services/pusher.js';
import {useAuth} from '../modules/hooks/useAuth.jsx';

function NotifyLayout() {
  const {user} = useAuth();

  useEffect(() => {
    pusher.subscribe(`private-${user.id}`);

    return () => {
      pusher.unsubscribe(`private-${user.id}`);
    };
  }, [user.id]);

  return (
      <div></div>
  );
}

export default NotifyLayout;