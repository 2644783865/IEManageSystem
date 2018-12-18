import React from 'react';
import ReactDOM from 'react-dom';
import { Route, NavLink } from 'react-router-dom';
import Client from "./AuthorizeManage/Client/Client.jsx";

export default class BodyDiv extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        return(
            <div id="servicecontainer" className="col-md-10">
                <Route path="/ManageHome/AuthorizeManage/Client" component={Client} />
            </div>
        );
    }
}