import React from 'react';
import ReactDOM from 'react-dom';
import { StoreProvider } from 'easy-peasy';
import { ToastContainer, Slide } from 'react-toastify';
import 'styles/react-toastify.css';


import store from './store/storeSetup';
import AppRouter from './routers/AppRouter';
import './styles/styles.scss';

ReactDOM.render(
  <StoreProvider store={store}>
    <ToastContainer
      position="bottom-center"
      autoClose={5000}
      hideProgressBar
      pauseOnHover
      draggable={false}
      transition={Slide}
    />
    <AppRouter />
  </StoreProvider>,
  document.getElementById('root'),
);

