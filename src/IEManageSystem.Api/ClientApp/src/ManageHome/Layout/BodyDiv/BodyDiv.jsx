import React from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
import './BodyDiv.css';
import MenuProvider from 'Core/Menu/MenuProvider'

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
                    {new MenuProvider().getNavMenuComponents().map(
                        item => <Route path={item.beseUrl} component={item.component} />)}
                </Switch>
            </div>
        );
    }
}