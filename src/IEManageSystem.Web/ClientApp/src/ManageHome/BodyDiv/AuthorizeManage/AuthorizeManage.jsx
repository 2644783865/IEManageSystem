import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route, NavLink } from 'react-router-dom';
import ApiScopePermission from "./ApiScopePermission/ApiScopePermission.jsx";
import Permission from "./Permission/Permission.jsx";
import AdminManage from "./AdminManage/AdminManage.jsx";

export default class AuthorizeManage extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        return(
            <div className="w-100 h-100">
                <Switch>
                    <Route path="/ManageHome/AuthorizeManage/ApiScopePermission" component={ApiScopePermission} />
                    <Route path="/ManageHome/AuthorizeManage/Permission" component={Permission} />
                    <Route path="/ManageHome/AuthorizeManage/AdminManage" component={AdminManage} />
                </Switch>
            </div>
        );
    }
}