import React from 'react';
import ReactDOM from 'react-dom';
import { Route, NavLink } from 'react-router-dom';
import BodyDivCss from './BodyDiv.css';
import Client from "./AuthorizeManage/Client/Client.jsx";
import ApiResource from "./AuthorizeManage/ApiResource/ApiResource.jsx";
import IdentityResource from "./AuthorizeManage/IdentityResource/IdentityResource.jsx";
import UserInfo from "./Personal/UserInfo/UserInfo.jsx";

export default class BodyDiv extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        return(
            <div className="col-md-10 content-container">
                <Route path="/ManageHome/AuthorizeManage/Client" component={Client} />
                <Route path="/ManageHome/AuthorizeManage/ApiResource" component={ApiResource} />
                <Route path="/ManageHome/AuthorizeManage/IdentityResource" component={IdentityResource} />
                <Route path="/ManageHome/Personal/UserInfo" component={UserInfo} />
            </div>
        );
    }
}