import React from 'react';
import ReactDOM from 'react-dom';
import { StoreProvider } from 'easy-peasy';
import { ToastContainer, Slide } from 'react-toastify';
import { QueryClientProvider } from 'react-query';
import 'styles/react-toastify.css';

import { AuthenticationProvider } from 'hooks/useAuthentication';
import client from 'client';

import store from './store/storeSetup';
import AppRouter from './routers/AppRouter';
import './styles/styles.scss';

ReactDOM.render(
  <StoreProvider store={store}>
    <QueryClientProvider client={client}>
      <AuthenticationProvider>
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar
          pauseOnHover
          draggable={false}
          transition={Slide}
        />
        <AppRouter />
      </AuthenticationProvider>
    </QueryClientProvider>
  </StoreProvider>,
  document.getElementById('root'),
);

