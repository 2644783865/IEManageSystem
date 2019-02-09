import React from 'react';
import ReactDOM from 'react-dom';
import { Route, NavLink, Link, Switch } from 'react-router-dom';

import './SideNav.css'

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
        let postData = {};

        $.ajax({
            url: "/api/User/GetIdentity",
            type: 'post',
            data: JSON.stringify(postData),
            contentType: 'application/json',
            dataType: 'json',
            success: function (data) {
                if (data.isSuccess == true) {
                    this.setState({userName:data.value.identityUser.name});
                }
            }.bind(this),
        });
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
            let icon = <span className={
                                "oi padding-right-10 " + 
                                (menuItems[item].icon == undefined ? "oi-tags leftmenu-icon-hide":menuItems[item].icon)
                            } title="icon name" aria-hidden="true">
                        </span>
            let text = <span>{" " + menuItems[item].text}</span>;

            let navLink = null;
            let childMenus = null;
            if(menuItems[item].menuItems != undefined && menuItems[item].menuItems.length > 0)
            {
                navLink = 
                    <a href="javascript:void(0)" className="text-white" onClick={
                        event=>{
                            // 隐藏所有子菜单
                            let lis = $(event.target).parents("ul").eq(0).children("li");
                            lis.children("div").hide(500);
                            lis.children("a").find("span.oi-chevron-right").removeClass("rotate90");

                            let div = $(event.target).parents("li").eq(0).children("div");
                            if(div.css("display") == "none"){
                                div.show(500);
                                $(event.target).find("span.oi-chevron-right").addClass("rotate90");
                            }
                            else{
                                div.hide(500);
                                $(event.target).find("span.oi-chevron-right").removeClass("rotate90");
                            }
                        }
                    }>
                        {icon}
                        {text}
                        <span className="oi oi-chevron-right ml-auto" title="icon name" aria-hidden="true"></span>
                    </a>;

                childMenus = this.createMenusIteration(menuItems[item]);
            }
            else{
                navLink = 
                    <NavLink activeClassName="leftmenu_css_li_active" className="text-white" to={menuItems[item].url}>
                        {icon}
                        {text}
                    </NavLink>;
            }

            let li = 
                <li key={item} className="leftmenu_css_li">
                    {navLink}
                    <div className="w-100 hide">
                        {childMenus}
                    </div>
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