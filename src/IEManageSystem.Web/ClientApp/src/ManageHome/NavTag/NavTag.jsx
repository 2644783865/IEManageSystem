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
        lis.push(<li key={0} className="nav-item">
                        <NavLink className="nav-link nav-tag-noactive" to="/ManageHome/Index" activeClassName="active">
                            <span className="oi oi-home" title="icon name" aria-hidden="true"></span>
                            后台首页
                        </NavLink>
                    </li>);
        this.menuItems.map((item, index)=>{
            lis.push(<li key={index+1} className="nav-item">
                        <NavLink className="nav-link nav-tag-noactive" to={item.url} activeClassName="active">
                            {item.text}
                            <span className="oi oi-delete nav-tag-deleteicon" title="icon name" aria-hidden="true"></span>
                        </NavLink>
                    </li>);
        });

        return (
            <div className="w-100 nav-tag">
                <ul className="nav nav-tabs">
                    {lis}
                </ul> 
            </div>
        );
    }
}