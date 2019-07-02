import React from "react";

import './Menu.css';

export default class Nav extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            menus: [{
                name: "home",
                displayName: "首页",
                icon: "oi-home",
                menus: []
            }, {
                name: "post",
                displayName: "技术文档",
                menus: [{
                    name: "web",
                    displayName: "站点技术",
                }, {
                    name: "dosktop",
                    displayName: "桌面应用",
                }]
            }]
        };

        this.getMenus = this.getMenus.bind(this);
        this.getMenus();
    }

    getMenus() {
        let postData = {

        };

        IETool.ieAjax({
            url: "/api/Menu/GetMenus",
            type: 'post',
            data: JSON.stringify(postData),
            contentType: 'application/json',
            dataType: 'json',
            success: function (data) {
                if (data.isSuccess == true) {
                    this.setState({ menus: data.value.menus });
                }
            }.bind(this)
        });
    }

    createRootMenu(menu) {
        let childsMenus = menu.menus || [];

        return (
            <label for='Dashboard'>
                <div className="front-swanky-wrapper__title">
                    <div>
                        <span className={ "oi padding-right-10 " + menu.icon } title="icon name" aria-hidden="true"></span>
                        <span>{menu.displayName}</span>
                    </div>
                    {
                        childsMenus.length != 0 && <div className='lil_arrow'></div>
                    }
                </div>
                <div className='front-swanky-wrapper__content'>
                    <ul>
                        {childsMenus.map(item => (<li>{item.displayName}</li>))}
                    </ul>
                </div>
            </label>);
    }

    render() {
        return (
            <div className='front-swanky-wrapper'>
                {this.state.menus.map(item => this.createRootMenu(item))}
            </div>
        );
    }
}