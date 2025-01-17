import React from "react";
import { Switch, Route } from "react-router-dom";
import Menu from "./Menu/Menu.jsx";
import PageComponent from "./PageComponent/PageComponent.jsx"
import PageManage from './PageManage/PageManage.jsx'
import PageData from './PageData/PageData.jsx'
import ComponentData from './ComponentData/ComponentData.jsx'
import TestPage from "./TestPage/TestPage.jsx";

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
                <Route path="/ManageHome/CMSManage/PageManage" component={PageManage} />
                <Route path="/ManageHome/CMSManage/PageComponent/:pageName" component={PageComponent} />
                <Route path="/ManageHome/CMSManage/PageData/:pageName" component={PageData} />
                <Route path="/ManageHome/CMSManage/ComponentData/:pageName/:pageDataName?" component={ComponentData} />
                <Route path="/ManageHome/CMSManage/TestPage" component={TestPage} />
            </Switch>
        </div>);
    }
}