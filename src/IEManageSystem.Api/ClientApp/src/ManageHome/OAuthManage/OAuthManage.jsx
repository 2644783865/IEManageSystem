import React from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
import Client from "./Client/Client.jsx";
import ApiResource from "./ApiResource/ApiResource.jsx";
import IdentityResource from "./IdentityResource/IdentityResource.jsx";

export default class OAuthManage extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        return(
            <div className="w-100 h-100 overflow-auto-y">
                <Switch>
                    <Route path="/ManageHome/OAuthManage/Client" component={Client} />
                    <Route path="/ManageHome/OAuthManage/ApiResource" component={ApiResource} />
                    <Route path="/ManageHome/OAuthManage/IdentityResource" component={IdentityResource} />
                </Switch>
            </div>
        );
    }
}