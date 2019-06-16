import React from "react";

import Logo from 'Logo/Logo.jsx';
import './Nav.css';

export default class Nav extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            menus: []
        };

        this.getMenus = this.getMenus.bind(this);
        this.getMenus();
    }

    getMenus(){
        let postData = {

        };

        IETool.ieAjax({
            url: "/api/Menu/GetMenus",
            type: 'post',
            data: JSON.stringify(postData),
            contentType: 'application/json',
            dataType: 'json',
            success: function(data){
		        if(data.isSuccess == true)
		        {
                    this.setState({menus:data.value.menus});
		        }
		    }.bind(this)
        });
    }

    createRootMenu(menu)
    {
        let childsMenus = menu.menus || [];

        return (
        <div>
            <label for='Dashboard'>
                <div className="swanky_wrapper__title">
                    <span>{menu.displayName}</span>
                    <div className='lil_arrow'></div>
                </div>
                <div className='swanky_wrapper__content'>
                    <ul>
                        {childsMenus.map( item => (<li>{item.displayName}</li>) )}
                    </ul>
                </div>
            </label>
        </div>);
    }

    render(){
        return (
            <div className="fixed-top">
                <nav className="navbar navbar-expand-sm navbar-dark home-nav">
                    <div className="logo-top">
                        <Logo />
                    </div>
                    <a className="navbar-brand sitename" href="#">冰纹IceEmblem</a>
                    <div className="ml-auto d-flex">
                        <div className="padding-right-10">
                            <a href="/Account" className="btn btn-outline-info">
                                <span className="oi oi-account-login padding-right-10" title="icon name" aria-hidden="true"></span>
                                <span>登录</span>
                            </a>
                        </div>
                        <div className="padding-right-10">
                            <a href="/Account" className="btn btn-outline-info">
                                <span className="oi oi-person" title="icon name" aria-hidden="true"></span>
                                <span>注册</span>
                            </a>
                        </div>
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Search" />
                            <div className="input-group-append">
                                <button className="btn btn-info" type="submit">搜索一下</button>  
                            </div>
                        </div>
                    </div>
                </nav>
                <div className='swanky_wrapper'>
                    {this.state.menus.map(item => this.createRootMenu(item))}
                </div>
            </div>
            
        );
    }
}