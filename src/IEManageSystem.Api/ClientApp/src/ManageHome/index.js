import React from 'react';
import ReactDOM from 'react-dom';
import App from './Layout/ManageHome.jsx'
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { app } from './Layout/Reducers'

import Module from './Layout/Module'

let module = new Module();
module.preInitialize();
module.initialize();
module.postInitialize();

let store = createStore(app);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App></App>
        </BrowserRouter>
    </Provider>,
    document.getElementById('UserHome'));