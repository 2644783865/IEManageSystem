import 'bootstrap';
import 'bootstrapcss';
import 'bootstrapcssicon';

import 'commoncss';

import 'cookie';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Redirect, Link, Switch } from 'react-router-dom';

import MenuProvider from "./MenuProvider.js";
import Nav from './Nav/Nav.jsx';
import SideNav from "./SideNav/SideNav.jsx";
import BodyDiv from './BodyDiv/BodyDiv.jsx';
import NavTag from './NavTag/NavTag.jsx';

require('./ManageHome.css');

class UserHome extends React.Component
{
    constructor(props) {
        super(props);

        this.menuProvider = new MenuProvider();

        this.topLevelMenus = this.menuProvider.getTopLevelMenus();
        
        this.state = {
            selectTopMenu:this.menuProvider.getDefaultTopLevelMenu(),
            selectSideMenu:null,
        };

        this.topLevelMenusSelect = this.topLevelMenusSelect.bind(this);
        this.sideMenuSelect = this.sideMenuSelect.bind(this);
    }

    componentDidMount(){
    }

    topLevelMenusSelect(menu)
    {
        this.setState({
            selectTopMenu:menu
        });
    }

    sideMenuSelect(menu){
        this.setState({
            selectSideMenu:menu
        });
    }

    render()
    {
        return (
        <div className="manage-home d-flex flex-column h-100">
            <Redirect path="/ManageHome" to={{pathname: '/ManageHome/Index'}} />
            <Nav topLevelMenus={this.topLevelMenus} selectTopMenu={this.state.selectTopMenu} topLevelMenusSelect={this.topLevelMenusSelect} />
            <div className="d-flex flex-grow-1 w-100">
                <div className="d-flex w-100">
                    <div className="col-md-2 h-100 padding-0">
                        <SideNav selectTopMenu={this.state.selectTopMenu} sideMenuSelect={this.sideMenuSelect} />
                    </div>
                    <div className="col-md-10 h-100 padding-0 d-flex flex-column">
                        <div className="flex-shrink-0">
                            <Route path="/ManageHome/:menuId?/:menuItemId?" component={NavTag} />
                        </div>
                        <div className="bodydiv-parent d-flex flex-grow-1 w-100">
                            <Route path="/ManageHome/:menuId/:menuItemId?" component={BodyDiv} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

ReactDOM.render( 
    <BrowserRouter>
        <UserHome></UserHome>
    </BrowserRouter> , 
    document.getElementById('UserHome') );