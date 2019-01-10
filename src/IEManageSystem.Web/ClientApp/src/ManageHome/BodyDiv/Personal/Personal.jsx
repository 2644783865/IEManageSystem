import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route, NavLink } from 'react-router-dom';
import UserInfo from "./UserInfo/UserInfo.jsx";

export default class BodyDiv extends React.Component
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
                    <Route path="/ManageHome/Personal/UserInfo" component={UserInfo} />
                </Switch>
            </div>
        );
    }
}