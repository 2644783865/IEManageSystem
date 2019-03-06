import React from 'react';
import ReactDOM from 'react-dom';
import { Route, NavLink, Link, Switch } from 'react-router-dom';
import MenuProvider from "../../MenuProvider.js";

import "./MenuTag.css";

export default class MenuTag extends React.Component
{
    constructor(props)
    {
        super(props);

        this.curMenu = null;
        this.menuItems = null;

        let menuItemString = $.cookie('SideNav_MenuTag');
        if (menuItemString === null || menuItemString === undefined) {
            this.menuItems = [];
        }
        else {
            this.menuItems = [];
            try {
                this.menuItems = JSON.parse(menuItemString);
            }
            catch(e) {
                this.menuItems = [];
            }

            if ($.isArray(this.menuItems) === false) {
                this.menuItems = [];
            }
        }
    }

    componentWillMount() {
        this.updateTag(this.props);
    }

    componentWillUpdate(nextProps, nextState) {
        this.updateTag(nextProps);
    }

    updateTag(props) {
        if (props.match.params.menuId === undefined) {
            return;
        }

        let menuId = props.match.params.menuId;
        let menuItemId = props.match.params.menuItemId;

        let menuProvider = new MenuProvider();
        let menuPaths = menuProvider.getMenuPath([menuId, menuItemId]);
        let menuItem = menuProvider.getMenuItem(menuPaths);

        if (menuItem === null) {
            return;
        }

        if (menuItem.menuItems.length > 0) {
            return;
        }

        for (let item in this.menuItems)
        {
            if (this.menuItems[item].id === menuItem.id) {
                return;
            }
        }

        this.curMenu = menuItem;
    }

    _createMenus()
    {
        let lis = Array();

        let menuItems = this.menuItems;
        for (let item in menuItems)
        {
            let li =
                <li key={item}>
                    <span className={
                        "oi padding-right-10 " +
                        (menuItems[item].icon === undefined ? "oi-tags leftmenu-icon-hide" : menuItems[item].icon)
                    } title="icon name" aria-hidden="true">
                    </span>
                    <NavLink to={menuItems[item].url}>
                        {menuItems[item].text}
                    </NavLink>
                    <span className="oi oi-delete padding-left-10" title="icon name" aria-hidden="true"
                        onClick={
                            () => {
                                this.menuItems.splice(item, 1);
                                $.cookie('SideNav_MenuTag', JSON.stringify(this.menuItems), { expires: 30 });
                                this.setState({});

                            }
                        }
                    ></span>
                </li>;

            lis.push(li);
        }

        return <ul>
            {lis}
        </ul>;
    }

    render()
    {
        let menuItems = this._createMenus();

        return (
            <div className="d-flex justify-content-between align-items-center flex-shrink-0 leftmenu-menutag">
                <div className="text-white">
                    <span class="oi oi-tags padding-left-10 padding-right-10" title="icon name" aria-hidden="true"></span>
                    <span>
                        菜单书签
                            </span>
                </div>
                <div className="d-flex">
                    <div>
                        <button className="leftmenu-menutag-btn" onClick={
                            (event) => {
                                if ($(event.currentTarget).hasClass('on')) {
                                    event.currentTarget.classList.remove('on');
                                    $(".menutag-menu").hide(300);
                                }
                                else {
                                    event.currentTarget.classList.add('on');
                                    $(".menutag-menu").show(300);
                                }
                            }
                        }>
                            <span></span><span></span><span></span>
                        </button>
                    </div>
                    <div className="menutag-menu hide">
                        <div className="d-flex align-items-center">
                            <div className="d-flex">
                                {menuItems}
                                <button className="btn btn-info"
                                    onClick={
                                        (event) => {
                                            if (this.curMenu !== null) {
                                                for (let item in this.menuItems) {
                                                    if (this.menuItems[item].id === this.curMenu.id) {
                                                        return;
                                                    }
                                                }
                                                this.menuItems.push(this.curMenu);
                                                $.cookie('SideNav_MenuTag', JSON.stringify(this.menuItems), { expires: 30 });
                                                this.setState({});
                                            }
                                        }
                                    }
                                >
                                    <span class="oi oi-plus" title="icon name" aria-hidden="true"></span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>);
    }
}