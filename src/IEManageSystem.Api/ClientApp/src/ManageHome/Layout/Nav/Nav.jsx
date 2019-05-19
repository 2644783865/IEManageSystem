import React from 'react';
import PropsTypes from 'prop-types';

import './Nav.css';
import Logo from 'Logo/Logo.jsx';

import DefaultAvatar from 'images/default_avatar.png';

import {LayoutRedux} from '../LayoutRedux'

import { topLevelMenusSelect } from 'Core/Actions';

class Nav extends React.Component
{
    // props.topLevelMenus
    // props.selectTopMenu
    // props.topLevelMenusSelect
    constructor(props)
    {
        super(props);

        this.state = 
        {
            userName:null,              // 用户名称
            headSculpture:"",
        };

        this.getUserName();
    }

    // 获取用户名称
    getUserName(){
        let postData = {};

        IETool.ieAjax({
            url: "/api/User/GetUserInfo",
            type: 'post',
            data: JSON.stringify(postData),
            contentType: 'application/json',
            dataType: 'json',
            success: function (data) {
                if (data.isSuccess == true) {
                    this.setState({userName:data.value.user.name, headSculpture:data.value.user.headSculpture});
                }
            }.bind(this),
        });
    }

    // 退出登录单击
    logoutClick()
    {
        IETool.clearToken();

        window.location.href = "/Account";
    }
    
    render()
    {
        let selectTopMenu = this.props.selectTopMenu;

        let menuItemLis = new Array();
        for(let item in this.props.topLevelMenus)
        {
            let className = selectTopMenu.id == this.props.topLevelMenus[item].id ? "nav-link navbar_css_li_click" : "nav-link";

            let menuItemLi = 
                <li key={item} className="nav-item">
                    <a href="javascript:void(0)" onClick={()=>{this.props.topLevelMenusSelect(this.props.topLevelMenus[item])}} className={className} to={this.props.topLevelMenus[item].url}>
                        {
                            this.props.topLevelMenus[item].icon !== undefined &&
                            <span className={ "oi padding-right-10 " + this.props.topLevelMenus[item].icon } title="icon name" aria-hidden="true"></span>
                        }
                        <span>
                            {this.props.topLevelMenus[item].text}
                        </span>
                    </a>
                </li>;

            menuItemLis.push(menuItemLi);
        }

        return(
            <nav className="navbar navbar-expand-md navbar_css flex-shrink-0">
                <div className="float-left navbar_logo_css">
                    <Logo />
                </div>
                <a className="navbar-brand" href="#">冰纹管理系统</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="collapsibleNavbar">
                    <div className="input-group navbar-search">
                        <input type="text" className="form-control" placeholder="Search" />
                        <div className="input-group-append">
                            <button className="btn btn-info btn-sm" type="button">
                                <span className="oi oi-magnifying-glass" title="icon name" aria-hidden="true"></span>
                            </button>  
                        </div>
                    </div>
                    <ul className="navbar-nav">
                        {menuItemLis}
                    </ul>
                    <span className="text-white float-right">
                        你好，{this.state.userName}
                        <img className="rounded-circle navbar-avatar" 
                            src={(this.state.headSculpture == null || this.state.headSculpture == "") ? DefaultAvatar:this.state.headSculpture} alt="Card image" />
                    </span>
                    <button onClick={this.logoutClick} type="button" className="btn btn-info float-right" >
                        <span className="oi oi-account-logout" title="icon name" aria-hidden="true"></span>
                        退出登录
                    </button>
                </div> 
            </nav>
        );
    }
}

Nav.propsTypes = {
    topLevelMenus: PropsTypes.array.isRequired,
    selectTopMenu: PropsTypes.object.isRequired,
    topLevelMenusSelect: PropsTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => { // ownProps为当前组件的props
    return {
        topLevelMenus: state.topLevelMenus,
        selectTopMenu: state.selectedTopMenu,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        topLevelMenusSelect: (menu) => { dispatch(topLevelMenusSelect(menu)) }
    }
}

const NavContain = LayoutRedux.connect(
    mapStateToProps, // 关于state
    mapDispatchToProps // 关于dispatch
)(Nav)

export default NavContain;