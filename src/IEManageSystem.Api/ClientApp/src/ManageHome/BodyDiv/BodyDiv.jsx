import React from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
import './BodyDiv.css';
import OAuthManage from "./OAuthManage/OAuthManage.jsx";
import Personal from "./Personal/Personal.jsx";
import AuthorizeManage from "./AuthorizeManage/AuthorizeManage.jsx";
import CMSManage from "./CMSManage/CMSManage.jsx";

import Index from "./Index/Index.jsx";

export default class BodyDiv extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        return(
            <div className="content-container">
                <Switch>
                    <Route exact path="/ManageHome" component={Index} />
                    <Route exact path="/ManageHome/Index" component={Index} />
                    <Route path="/ManageHome/OAuthManage" component={OAuthManage} />
                    <Route path="/ManageHome/Personal" component={Personal} />
                    <Route path="/ManageHome/AuthorizeManage" component={AuthorizeManage} />
                    <Route path="/ManageHome/CMSManage" component={CMSManage} />
                </Switch>
            </div>
        );
    }
}