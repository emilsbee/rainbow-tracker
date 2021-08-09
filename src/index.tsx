// External imports
import React from 'react';
import ReactDOM from 'react-dom';
import { StoreProvider } from 'easy-peasy'

//Internal imports
import store from "./store/storeSetup"
import AppRouter from './routers/AppRouter'
import './styles/styles.scss'


ReactDOM.render(
    <StoreProvider store={store}>
        <AppRouter/>
    </StoreProvider>,
    document.getElementById('root')
)



