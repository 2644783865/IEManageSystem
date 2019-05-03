import React from 'react';
import ReactDOM from 'react-dom';
import App from './Layout/ManageHome.jsx'
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import Module from './Layout/Module'
import ReducerProvider from 'Core/Reducers/ReducerProvider'

let module = new Module();
module.preInitialize();
module.initialize();
module.postInitialize();

let store = createStore(new ReducerProvider().getRootReducer());

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App></App>
        </BrowserRouter>
    </Provider>,
    document.getElementById('UserHome'));