import * as React from 'react';
import ReactDOM from 'react-dom';
import { StoreProvider } from 'easy-peasy';
import { ThemeProvider } from 'styled-components';
import { ToastContainer, Slide } from 'react-toastify';
import { QueryClientProvider } from 'react-query';
import 'styles/react-toastify.css';

import { AuthenticationProvider, DateProvider } from 'hooks';
import client from 'client';
import theme from 'styles/theme';

import store from './store/storeSetup';
import AppRouter from './routers/AppRouter';
import './styles/styles.scss';

ReactDOM.render(
  <StoreProvider store={store}>
    <QueryClientProvider client={client}>
      <AuthenticationProvider>
        <ThemeProvider theme={theme}>
          <DateProvider>
            <ToastContainer
              position="bottom-center"
              autoClose={5000}
              hideProgressBar
              pauseOnHover
              draggable={false}
              transition={Slide}
            />
            <AppRouter />
          </DateProvider>
        </ThemeProvider>
      </AuthenticationProvider>
    </QueryClientProvider>
  </StoreProvider>,
  document.getElementById('root'),
);

