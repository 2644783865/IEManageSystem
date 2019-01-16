import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, NavLink, Link, Switch } from 'react-router-dom';

import './NavTag.css'
import MenuProvider from "../MenuProvider.js";

export default class NavTag extends React.Component{
    constructor(props) {
        super(props);

        this.menuItems = new Array();
    }

    componentWillMount(){
        this.updateTag(this.props);
    }

    componentWillUpdate(nextProps, nextState){
        this.updateTag(nextProps);
    }

    updateTag(props)
    {
        if(props.match.params.menuId == undefined){
            return;
        }

        if(props.match.params.menuItemId == undefined){
            return;
        }

        let menuId = props.match.params.menuId;
        let menuItemId = props.match.params.menuItemId;

        let menuProvider = new MenuProvider();
        let menuPaths = menuProvider.getMenuPath([menuId, menuItemId]);
        let menuItem = menuProvider.getMenuItem(menuPaths);

        if(menuItem == null){
            return;
        }

        if(menuItem.menuItems.length > 0){
            return;
        }
        
        for(let item in this.menuItems){
            if(this.menuItems[item].id == menuItem.id){
                return;
            }
        }

        this.menuItems.push(menuItem);
    }

    render()
    {
        let lis = new Array();
        lis.push(<li class="nav-item">
                        <NavLink className="nav-link nav-tag-noactive" to="/ManageHome/Index" activeClassName="active">
                            后台首页
                        </NavLink>
                    </li>);
        this.menuItems.map(item=>{
            lis.push(<li class="nav-item">
                        <NavLink className="nav-link nav-tag-noactive" to={item.url} activeClassName="active">
                            {item.text}
                            <span class="oi oi-delete nav-tag-deleteicon" title="icon name" aria-hidden="true"></span>
                        </NavLink>
                    </li>);
        });

        return (
            <div class="w-100 nav-tag">
                <ul class="nav nav-tabs">
                    {lis}
                </ul> 
            </div>
        );
    }
}