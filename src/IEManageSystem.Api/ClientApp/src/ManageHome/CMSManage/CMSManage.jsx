import React from "react";
import { Switch, Route } from "react-router-dom";
import Menu from "./Menu/Menu.jsx";
import Page from "./Page/Page.jsx"

export default class CMSManage extends React.Component{
    constructor(props)
    {
        super(props);
    }

    render(){
        return (
        <div className="w-100 h-100 overflow-auto-y">
            <Switch>
                <Route path="/ManageHome/CMSManage/Menu" component={Menu} />
                <Route path="/ManageHome/CMSManage/Page" component={Page} />
            </Switch>
        </div>);
    }
}