import React from 'react';
import ReactDOM from 'react-dom';
import ManageHome from './ManageHome/index'
import Home from './Home/Index.jsx'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { createStore, applyMiddleware  } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

import ModuleFactory from 'Core/Modules/ModuleFactory'
import {RootRedux} from 'Core/IEReduxs/RootRedux'
import MiddlewareFactory from 'Core/MiddlewareFactory'

let moduleFactory = new ModuleFactory();
moduleFactory.init();

const loggerMiddleware = createLogger()
let store = createStore(
    RootRedux.getReducer(),
    applyMiddleware(
        thunkMiddleware, // 这里添加了一个thunk中间件，他会处理thunk action
        loggerMiddleware, // 一个很便捷的 middleware，用来打印 action 日志
        ...(new MiddlewareFactory().getMiddlewares())
  ));

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route path="/ManageHome" component={ManageHome} />
                <Route path="/" component={Home} />
            </Switch>
        </BrowserRouter>
    </Provider>,
    document.getElementById('Home'));