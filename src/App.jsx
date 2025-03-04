import {RouterProvider} from 'react-router-dom';
import {router} from './modules/core/router.jsx';
import '@mantine/core/styles.css';
import {MantineProvider} from '@mantine/core';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import {QueryClientProvider} from '@tanstack/react-query';
import {queryClient} from './modules/cache.js';
import {AuthProvider} from './modules/hooks/useAuth.jsx';
import {Suspense, useEffect} from 'react';
import LoadingPageSkeleton from './components/LoadingPageSkeleton.jsx';
import 'react-toastify/dist/ReactToastify.css';
import pusher from './services/pusher.js';
import PusherLayout from './components/PusherLayout.jsx';
import {ToastContainer} from 'react-toastify';

function App() {
  const mode = import.meta.env.MODE;

  useEffect(() => {
    pusher.subscribe('');
  }, []);

  return (
      <>
        <Suspense fallback={<LoadingPageSkeleton/>}>
          <MantineProvider>
            <AuthProvider>
              <PusherLayout>
                <QueryClientProvider client={queryClient}>
                  {mode === 'development' && <ReactQueryDevtools initialIsOpen={false}/>}
                  <RouterProvider router={router}/>
                </QueryClientProvider>
              </PusherLayout>
            </AuthProvider>
            <ToastContainer/>
          </MantineProvider>
        </Suspense>
      </>
  );
}

export default App;
