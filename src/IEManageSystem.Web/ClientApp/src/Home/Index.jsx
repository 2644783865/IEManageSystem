import 'bootstrap';
import 'bootstrapcss';
import 'bootstrapcssicon';

import 'commoncss';

import 'cookie';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';

import LoginIcon from './login-icon.png';
import Icon1 from './Icon-1.jpg';
import managehomeicon from './manage-home-icon.png';

import Logo from 'Logo/Logo.jsx';

require('./Index.css');

class Home extends React.Component{
    constructor(props) {
        super(props);
    }

    componentDidMount(){
    }

    componentDidUpdate(){
        this.state.operationState = operationState.none;
    }

    render()
    {
        return (
        <div className="w-100 h-100">
            <nav className="navbar navbar-expand-sm navbar-dark fixed-top home-nav">
                <div className="logo-top">
                    <Logo />
                </div>
                <a className="navbar-brand" href="#">冰纹IceEmblem</a>
                <div className="input-group mb-3 col-md-3 ml-auto">
                    <input type="text" className="form-control" placeholder="Search" />
                    <div className="input-group-append">
                        <button className="btn btn-info" type="submit">搜索一下</button>  
                    </div>
                </div>
            </nav>
            <div className="h-100 d-flex">
                <div className="container-fluid content mt-auto mb-auto">
                    <div className="col-md-4 float-left h-100">
                        <div className="icon-lg">
                            <div className="">
                                <div className="codecss">
                                    <code>{"1 while(true)"}</code>
                                    <br />
                                    <code>{"2 {"}</code>
                                    <br />
                                    <code>{"3     try"}</code>
                                    <br />
                                    <code>{"4     {"}</code>
                                    <br />
                                    <code>{"5         ActAs(“Programmer”);"}</code>
                                    <br />
                                    <code>{"6     }"}</code>
                                    <br />
                                    <code>{"7     catch(KneeTilledException e)"}</code>
                                    <br />
                                    <code>{"8     {"}</code>
                                    <br />
                                    <code>{"9         if (e.Weapon is Arror) "}</code>
                                    <br />
                                    <code>{"10             break;"}</code>
                                    <br />
                                    <code>{"11     }"}</code>
                                    <br />
                                    <code>{"12 }"}</code>
                                    <br />
                                    <br />
                                    <p>
                                        一直在做程序员，直到膝盖中了一箭
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="icon-md">
                            <div></div>
                        </div>
                    </div>
                    <div className="col-md-4 float-left h-100">
                        <div className="icon-md">
                            <div>
                                <img src={"/"+Icon1} className="w-100 h-100" />
                            </div>
                        </div>
                        <div className="icon-sm">
                            <div>
                            </div>
                        </div>
                        <div className="icon-sm">
                            <div className="d-flex">
                                <Logo className="mt-auto mb-auto" />
                            </div>
                        </div>
                        <div className="icon-md">
                            <div></div>
                        </div>
                    </div>
                    <div className="col-md-4 float-left h-100">
                        <div className="icon-sm">
                            <div>
                            </div>
                        </div>
                        <div className="icon-sm">
                            <div className="d-flex">
                                <a className="home-managehome-icon" href="/ManageHome">
                                    <img src={"/"+managehomeicon} className="rounded w-100 h-100" />
                                </a>
                            </div>
                        </div>
                        <div className="icon-md">
                            <div className="d-flex">
                                <a className="home-icon-login" href="/Account/Login">
                                    <img className="w-100" src={LoginIcon} />
                                </a>
                            </div>
                        </div>
                        <div className="icon-md">
                            <div></div>
                        </div>
                    </div>
                </div>
            </div>
            <nav className="navbar navbar-expand-sm bg-dark navbar-dark fixed-bottom">
                <small className="text-white">
                    Copyright © 2019 by IceEmblem. All rights reserved.
                </small>
                <span className="text-white ml-auto">
                    由冰纹工作室开发开发
                </span>
            </nav>
        </div>
        );
    }
}

ReactDOM.render( 
    <Home /> , 
    document.getElementById('Home') );