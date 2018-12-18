import React from 'react';
import ReactDOM from 'react-dom';
import { Route, NavLink, Link, Switch } from 'react-router-dom';

import MenuProvider from "../MenuProvider.js";

export default class Nav extends React.Component
{
    constructor(props)
    {
        super(props);

        this.menu = (new MenuProvider()).mainMenu;
    }

    // 退出登录单击
    logoutClick(e){
        var url = $(e.target).attr("data-url");

        $.get(url,
            function(data)
            {
                if(data.isSuccess==true){
                    window.location.href=data.redirectHref;
                }
            }
        );
    }
    
    render()
    {
        let menuItemLis = new Array();
        for(let item in this.menu.menuItems){
            let menuItemLi = 
                <li className="nav-item">
                    <NavLink activeClassName="navbar_css_li_click" className="nav-link" to={this.menu.menuItems[item].url}>{this.menu.menuItems[item].text}</NavLink>
                </li>;
            menuItemLis.push(menuItemLi);
        }

        return(
            <nav className="navbar navbar-expand-md bg-dark navbar-dark fixed-top navbar_css">
                <div className="float-left navbar_logo_css">
                    <div className="logo">
                        <div className="w-75">
                            <img src="/images/logo.png" alt="" className="w-100" />
                        </div>
                    </div>
                </div>
                <a className="navbar-brand" href="#">冰纹管理系统</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="collapsibleNavbar">
                    <ul className="navbar-nav">
                        {menuItemLis}
                    </ul>
                    <span className="text-info float-right">你好，{this.props.userName}</span>
                    <input id="outLogin" data-url="/api/Account/Logout" onClick={this.logoutClick} type="button" value="退出登录" className="btn btn-info float-right" />
                </div> 
            </nav>
        );
    }
}