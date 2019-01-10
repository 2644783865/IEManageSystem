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
        <div className="d-flex h-100 manage-home">
            <Redirect path="/ManageHome" to={{pathname: '/ManageHome/Personal'}} />
            <Nav userName={this.state.userName} />
            <div className="container-fixed">
                <div className="row h-100">
                    <div className="col-md-2 h-100 padding-0">
                        <Route path="/ManageHome/:menuId" component={SideNav} />
                    </div>
                    <div className="col-md-10 h-100 padding-0 d-flex flex-column">
                        <div className="padding-top-10">
                            <Route path="/ManageHome/:menuId?/:menuItemId?" component={NavTag} />
                        </div>
                        <div className="bodydiv-parent">
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