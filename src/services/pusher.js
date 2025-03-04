import Pusher from 'pusher-js';

const APP_KEY = import.meta.env.VITE_APP_KEY;
const APP_CLUSTER = import.meta.env.VITE_APP_CLUSTER;

const pusher = new Pusher(APP_KEY, {
  cluster: APP_CLUSTER,
});

pusher.connection.bind('error', function(err) {
  if (err.data.code === 4004) {
    console.log('>>> detected limit error');
  }
});

export default pusher;