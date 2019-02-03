import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, NavLink, Link, Switch, withRouter } from 'react-router-dom';

import './NavTag.css'
import MenuProvider from "../MenuProvider.js";

class NavTag extends React.Component{
    constructor(props) {
        super(props);

        this.menuItems = new Array();
    }

    componentWillMount(){
        this.updateTag(this.props);
    }

    componentWillUpdate(nextProps, nextState){
        this.updateTag(nextProps);
    }

    updateTag(props)
    {
        if(props.match.params.menuId == undefined){
            return;
        }

        let menuId = props.match.params.menuId;
        let menuItemId = props.match.params.menuItemId;

        let menuProvider = new MenuProvider();
        let menuPaths = menuProvider.getMenuPath([menuId, menuItemId]);
        let menuItem = menuProvider.getMenuItem(menuPaths);

        if(menuItem == null){
            return;
        }

        if(menuItem.menuItems.length > 0){
            return;
        }
        
        for(let item in this.menuItems){
            if(this.menuItems[item].id == menuItem.id){
                return;
            }
        }

        this.menuItems.push(menuItem);
    }

    render()
    {
        let lis = new Array();
        lis.push(<li key={0} className="nav-item">
                        <NavLink className="nav-link nav-tag-noactive" to="/ManageHome/Index" activeClassName="active">
                            <span className="oi oi-home" title="icon name" aria-hidden="true"></span>
                            后台首页
                        </NavLink>
                    </li>);

        var curUrl = this.props.location.pathname;

        this.menuItems.map((item, index)=>
        {
            lis.push(<li key={index+1} className="nav-item">
                        <a className={"nav-link nav-tag-noactive " + (curUrl==item.url?"active":"")} href="javascript:void(0)"
                            onClick={
                                (e)=>{
                                    this.props.history.push(item.url); 
                                }
                            }
                        >
                            <span className={
                                    "oi padding-right-10 " + 
                                    (item.icon == undefined ? "":item.icon)
                                } title="icon name" aria-hidden="true">
                            </span>
                            {item.text}
                            <span className="oi oi-delete nav-tag-deleteicon" title="icon name" aria-hidden="true"
                                onClick={
                                    (event)=>{
                                        event.stopPropagation();//阻止事件冒泡即可

                                        this.menuItems.splice(index, 1);

                                        // 如果当前标签没有被选中
                                        if(!$(event.target).parents("a").eq(0).hasClass("active")){
                                            this.setState({});
                                            return false;
                                        }

                                        if(index == 0){
                                            this.props.history.push("/ManageHome/Index"); 
                                        }

                                        this.props.history.push(this.menuItems[index-1].url); 
                                    }
                                }
                            ></span>
                        </a>
                    </li>);
        });

        return (
            <div className="w-100 nav-tag d-flex padding-right-10">
                <button className="btn btn-outline-secondary">
                    <span className="oi oi-arrow-thick-left" title="icon name" aria-hidden="true"></span>
                </button>
                <div className="flex-grow-1 flex-shrink-1">
                    <ul className="nav nav-tabs">
                        {lis}
                    </ul>
                </div>
                <button className="btn btn-outline-secondary">
                    <span className="oi oi-arrow-thick-right" title="icon name" aria-hidden="true"></span>
                </button>
                <button className="btn nav-tag-closeall">
                    <span className="padding-right-10">关闭所有</span>
                    <span className="oi oi-circle-x" title="icon name" aria-hidden="true"></span>
                </button>
            </div>
        );
    }
}

export default withRouter(NavTag);