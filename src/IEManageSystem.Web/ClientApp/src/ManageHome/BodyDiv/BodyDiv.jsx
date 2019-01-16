import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route, NavLink } from 'react-router-dom';
import BodyDivCss from './BodyDiv.css';
import OAuthManage from "./OAuthManage/OAuthManage.jsx";
import Personal from "./Personal/Personal.jsx";
import AuthorizeManage from "./AuthorizeManage/AuthorizeManage.jsx";

import Index from "./Index/Index.jsx";

export default class BodyDiv extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState)
    {
        let menuId = nextProps.match.params.menuId;
        
        // 如果未传顶级菜单或顶级菜单为index，默认使用Index组件
        if(menuId == undefined || menuId.toLowerCase() == "index"){
            return true;
        }

        let menuItemId = nextProps.match.params.menuItemId;
        if(menuItemId != undefined){
            return true;
        }

        return false;
    }

    componentWillMount(){
    }

    componentWillUpdate(nextProps, nextState){
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
                </Switch>
            </div>
        );
    }
}