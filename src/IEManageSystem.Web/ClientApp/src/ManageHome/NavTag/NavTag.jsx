import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, NavLink, Link, Switch } from 'react-router-dom';

import './NavTag.css'
import MenuProvider from "../MenuProvider.js";

export default class NavTag extends React.Component{
    constructor(props) {
        super(props);

        this.menuItems = new Array();

        this.mainMenu = (new MenuProvider()).mainMenu;
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
        let menu = null;
        for(let item in this.mainMenu.menuItems){
            if(this.mainMenu.menuItems[item].id == menuId){
                menu = this.mainMenu.menuItems[item];
            }
        }

        if(menu == null){
            return;
        }

        let menuItemId = props.match.params.menuItemId;
        let menuItem = null;
        for(let item in menu.menuItems){
            if(menu.menuItems[item].id == menuItemId){
                menuItem = menu.menuItems[item];
            }
        }

        if(menuItem == null){
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
        let lis = this.menuItems.map(item=>{
            return (<li class="nav-item">
                        <NavLink className="nav-link nav-tag-noactive" to={item.url} activeClassName="active">
                            {item.text}
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