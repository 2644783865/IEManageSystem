import React from "react";

import Logo from 'Logo/Logo.jsx';
import './Nav.css';

export default class Nav extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="fixed-top">
                <nav className="navbar navbar-expand-sm navbar-dark home-nav">
                    <div className="logo-top">
                        <Logo />
                    </div>
                    <a className="navbar-brand sitename" href="#">冰纹IceEmblem</a>
                    <div className="ml-auto d-flex">
                        <div className="padding-right-10">
                            <a href="/Account" className="btn btn-outline-info">
                                <span className="oi oi-account-login padding-right-10" title="icon name" aria-hidden="true"></span>
                                <span>登录</span>
                            </a>
                        </div>
                        <div className="padding-right-10">
                            <a href="/Account" className="btn btn-outline-info">
                                <span className="oi oi-person" title="icon name" aria-hidden="true"></span>
                                <span>注册</span>
                            </a>
                        </div>
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Search" />
                            <div className="input-group-append">
                                <button className="btn btn-info" type="submit">搜索一下</button>  
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}