import React from 'react';
import ReactDOM from 'react-dom';
import { Route, NavLink, Link, Switch } from 'react-router-dom';

import MenuProvider from "../MenuProvider.js";

export default class SideNav extends React.Component
{
	constructor(props){
		super(props);

		this.menu = null;
	}

	componentWillMount(){
        this.getMenu(this.props);
    }

    componentWillUpdate(nextProps, nextState){
        this.getMenu(nextProps);
    }

    getMenu(props){
        let mainMenu = (new MenuProvider()).mainMenu;
        let menuId = props.match.params.menuId;

        for(let item in mainMenu.menuItems){
            if(mainMenu.menuItems[item].id == menuId){
                this.menu = mainMenu.menuItems[item];
            }
        }
    }

    render()
    {
        let lis = Array();
        if(this.menu != null){
            for(let item in this.menu.menuItems){
                let li = 
                    <li className="leftmenu_css_li">
                        <NavLink className="text-white" to={this.menu.menuItems[item].url}>{this.menu.menuItems[item].text}</NavLink>
                    </li>;

                lis.push(li);
            }
        }

        return(
            <div className="col-md-2 leftmenu_css">
                <ul className="list-group">
                    {lis}
                </ul>
            </div>
        );
    }
}