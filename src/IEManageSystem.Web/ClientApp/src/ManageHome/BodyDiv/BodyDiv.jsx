import React from 'react';
import ReactDOM from 'react-dom';
import { Route, NavLink } from 'react-router-dom';
import BodyDivCss from './BodyDiv.css';
import Client from "./OAuthManage/Client/Client.jsx";
import ApiResource from "./OAuthManage/ApiResource/ApiResource.jsx";
import IdentityResource from "./OAuthManage/IdentityResource/IdentityResource.jsx";
import UserInfo from "./Personal/UserInfo/UserInfo.jsx";
import ApiScopePermission from "./AuthorizeManage/ApiScopePermission/ApiScopePermission.jsx";

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
                <Route path="/ManageHome/OAuthManage/Client" component={Client} />
                <Route path="/ManageHome/OAuthManage/ApiResource" component={ApiResource} />
                <Route path="/ManageHome/OAuthManage/IdentityResource" component={IdentityResource} />
                <Route path="/ManageHome/Personal/UserInfo" component={UserInfo} />
                <Route path="/ManageHome/AuthorizeManage/ApiScopePermission" component={ApiScopePermission} />
            </div>
        );
    }
}