import React from 'react';
import ReactDOM from 'react-dom';
import { Route, NavLink, Link, Switch } from 'react-router-dom';

import './SideNav.css'
import MenuProvider from "../MenuProvider.js";

import DefaultAvatar from 'images/default_avatar.png';

import Weather from 'Weather/Weather.jsx';

export default class SideNav extends React.Component
{
    // props.selectTopMenu
    // props.sideMenuSelect()
	constructor(props){
		super(props);

        this.state = 
        {
            userName:null,              // 用户名称
        };

		this.getUserName();
	}

    // 获取用户名称
    getUserName(){
        $.get("/api/User/GetIdentity",function(data){
            if(data.isSuccess == true){
                this.setState({userName:data.value.identityUser.name});
            }
        }.bind(this));
    }

    createMenus()
    {
        let selectTopMenu = this.props.selectTopMenu;

        return this.createMenusIteration(selectTopMenu);
    }

    createMenusIteration(menu)
    {
        let lis = Array();
        
        let menuItems = menu.menuItems;
        for(let item in menuItems)
        {
            let navLink = null;
            let childMenus = null;
            if(menuItems[item].menuItems != undefined && menuItems[item].menuItems.length > 0)
            {
                navLink = 
                    <a href="javascript:void(0)" className="text-white" to={menuItems[item].url} onClick={
                        event=>{
                            $(event.target).parent().children("ul").slideToggle(1000);
                        }
                    }>
                        <span class="oi oi-chevron-right" title="icon name" aria-hidden="true"></span>
                        {" " + menuItems[item].text}
                    </a>;

                childMenus = this.createMenusIteration(menuItems[item]);
            }
            else{
                navLink = 
                    <NavLink activeClassName="leftmenu_css_li_active" className="text-white" to={menuItems[item].url}>
                        <span class="oi oi-chevron-right" title="icon name" aria-hidden="true"></span>
                        {" " + menuItems[item].text}
                    </NavLink>;
            }

            let li = 
                <li className="leftmenu_css_li">
                    {navLink}
                    {childMenus}
                </li>;

            lis.push(li);
        }

        return <ul className="list-group">
                    {lis}
                </ul>;
    }

    render()
    {
        let menus = this.createMenus();

        return(
            <div className="leftmenu_css">
                <div className="leftmenu-avatar">
                    <div className="d-flex justify-content-center">
                        <img className="rounded-circle img-thumbnail w-50 h-50" src={DefaultAvatar} alt="Card image" />
                    </div>
                    <p>你好，{this.state.userName}</p>
                </div>
                <div className="leftmenu-weather">
                    <Weather showWeatherCityandtext={true} />
                </div>
                {menus}
            </div>
        );
    }
}