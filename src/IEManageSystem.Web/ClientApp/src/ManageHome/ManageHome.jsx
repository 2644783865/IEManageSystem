import 'bootstrap';
import 'bootstrapcss';
import 'bootstrapcssicon';

import 'commoncss';

import 'cookie';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';

import MenuProvider from "./MenuProvider.js";
import Nav from './Nav/Nav.jsx';
import SideNav from "./SideNav/SideNav.jsx";
import BodyDiv from './BodyDiv/BodyDiv.jsx';

require('./ManageHome.css');

class UserHome extends React.Component{
    constructor(props) {
        super(props);

        this.getUserNameBackCall = this.getUserNameBackCall.bind(this);
        
        this.state = 
        {
            userName:null,              // 用户名称
        };

        this.getUserName();
    }

    // 获取用户名称回调
    getUserNameBackCall(data){
        if(data.isSuccess == true){
            this.setState({userName:data.value.identityUser.name});
        }
    }

    // 获取用户名称
    getUserName(){
        $.get("/api/User/GetIdentity",this.getUserNameBackCall);
    }
    

    render()
    {
        return (
        <div className="d-flex h-100">
            <Nav userName={this.state.userName} />
            <div className="container-fixed bodydiv_css">
                <div className="row h-100">
                    <Route path="/ManageHome/:menuId" component={SideNav} />
                    <Route path="/ManageHome/:menuId/:menuItemId" component={BodyDiv} />
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