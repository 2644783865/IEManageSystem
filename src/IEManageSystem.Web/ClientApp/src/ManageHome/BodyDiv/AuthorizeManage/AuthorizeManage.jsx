import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route, NavLink } from 'react-router-dom';
import ApiScopePermission from "./ApiScopePermission/ApiScopePermission.jsx";
import Permission from "./Permission/Permission.jsx";
import AdminManage from "./AdminManage/AdminManage.jsx";
import AdminRoleManage from "./AdminRoleManage/AdminRoleManage.jsx";
import AdminPermissionManage from "./AdminPermissionManage/AdminPermissionManage.jsx";
import RoleManage from "./RoleManage/RoleManage.jsx";
import RolePermissionManage from "./RolePermissionManage/RolePermissionManage.jsx";

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
                    <Route path="/ManageHome/AuthorizeManage/AdminRoleManage" component={AdminRoleManage} />
                    <Route path="/ManageHome/AuthorizeManage/AdminPermissionManage" component={AdminPermissionManage} />
                    <Route path="/ManageHome/AuthorizeManage/RoleManage" component={RoleManage} />
                    <Route path="/ManageHome/AuthorizeManage/RolePermissionManage" component={RolePermissionManage} />
                </Switch>
            </div>
        );
    }
}