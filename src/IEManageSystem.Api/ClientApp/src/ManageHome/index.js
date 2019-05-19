import React from 'react';
import ReactDOM from 'react-dom';
import App from './Layout/ManageHome.jsx'
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware  } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'


import Module from './Layout/Module'
import {RootRedux} from 'Core/IEReduxs/RootRedux'

let module = new Module();
module.preInitialize();
module.initialize();
module.postInitialize();

const loggerMiddleware = createLogger()
let store = createStore(
    RootRedux.getReducer(),
    applyMiddleware(
        thunkMiddleware, // 这里添加了一个thunk中间件，他会处理thunk action
        loggerMiddleware // 一个很便捷的 middleware，用来打印 action 日志
  ));

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App></App>
        </BrowserRouter>
    </Provider>,
    document.getElementById('UserHome'));