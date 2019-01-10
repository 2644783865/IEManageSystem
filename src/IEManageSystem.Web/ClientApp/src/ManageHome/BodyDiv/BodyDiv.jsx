import React from 'react';
import ReactDOM from 'react-dom';
import { Route, NavLink } from 'react-router-dom';
import BodyDivCss from './BodyDiv.css';
import OAuthManage from "./OAuthManage/OAuthManage.jsx";
import Personal from "./Personal/Personal.jsx";
import AuthorizeManage from "./AuthorizeManage/AuthorizeManage.jsx";

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
                <Route path="/ManageHome/OAuthManage" component={OAuthManage} />
                <Route path="/ManageHome/Personal" component={Personal} />
                <Route path="/ManageHome/AuthorizeManage" component={AuthorizeManage} />
            </div>
        );
    }
}