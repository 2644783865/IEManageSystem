import React from "react";
import ResourceForm from 'ResourceForm/ResourceForm.jsx';
import Describe from 'ResourceForm/Describe.js';
import { ResourceDescribeValueType } from 'ResourceForm/ResourceDescribeValueType.js';

import ErrorModal from 'ErrorModal/ErrorModal.jsx';
import LoadingModal from 'LoadingModal/LoadingModal.jsx';
import ConfirmBox from 'ConfirmBox/ConfirmBox.jsx';

import "./Menu.css";

const operateState = {
    add: "add",
    update: "update",
    delete: "delete",
    none: "none"
};

export default class Menu extends React.Component {
    constructor(props) {
        super(props);

        this.describes = [];

        [
            { name: "name", text: "菜单名", isId: false, isName: false, isEditCanEdit: false, valueType: ResourceDescribeValueType.text, col: 12 },
            { name: "displayName", text: "显示名称", isId: false, isName: false, isEditCanEdit: false, valueType: ResourceDescribeValueType.text, col: 12 },
            { name: "icon", text: "图标", isId: false, isName: false, isEditCanEdit: false, valueType: ResourceDescribeValueType.text, col: 12 },
        ].forEach(element => {
            this.describes.push(new Describe(element));
        });

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
            }],
            parentMenuId: null,
            operateState: operateState.none,
            currentMenu: null,
            fromModalShow: false,
            loadingModalShow: false,
            confirmBoxShow: false,
            errorInfo: {
                show: false,
                title: "",
                message: ""
            }
        };

        this.submitBackcall = this.submitBackcall.bind(this);
        this.getMenus = this.getMenus.bind(this);
        this.addMenu = this.addMenu.bind(this);
        this.deleteMenu = this.deleteMenu.bind(this);
        this.updateMenu = this.updateMenu.bind(this);

        this.getMenus();
    }

    componentDidUpdate() {
    }

    // 提交回调
    submitBackcall(data) {
        this.setState({ loadingModalShow: false });

        if (data.isSuccess == true) {
            this.getMenus();
        }
        else {
            this.setState({
                errorInfo: {
                    show: true,
                    title: "提交表单错误",
                    message: data.message
                }
            })
        }
    }

    getMenus() {
        let postData = {

        };

        IETool.ieAjax({
            url: "/api/MenuManage/GetMenus",
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

    addMenu(resource) {
        this.setState({ loadingModalShow: true, fromModalShow: false });

        let postData = resource;
        postData.parentMenuId = this.state.parentMenuId;

        let url = null;
        if (this.state.parentMenuId == null) {
            url = "/api/MenuManage/AddCompositeMenu";
        }
        else {
            url = "/api/MenuManage/AddLeafMenu";
        }


        IETool.ieAjax({
            url: url,
            type: 'post',
            data: JSON.stringify(postData),
            contentType: 'application/json',
            dataType: 'json',
            success: this.submitBackcall
        });
    }

    deleteMenu(resource) {
        this.setState({ loadingModalShow: true });

        let postData = resource;

        IETool.ieAjax({
            url: "/api/MenuManage/RemoveMenu",
            type: 'post',
            data: JSON.stringify(postData),
            contentType: 'application/json',
            dataType: 'json',
            success: this.submitBackcall
        });
    }

    updateMenu(resource) {
        this.setState({ loadingModalShow: true, fromModalShow: false });

        let postData = resource;

        IETool.ieAjax({
            url: "/api/MenuManage/UpdateMenu",
            type: 'post',
            data: JSON.stringify(postData),
            contentType: 'application/json',
            dataType: 'json',
            success: this.submitBackcall
        });
    }

    createRootMenu(menu) {
        let childsMenus = menu.menus || [];

        return (
            <div>
                <label>
                    <div className="swanky_wrapper__title">
                        <div>
                            <a href="javescript:void(0);"
                                onClick={
                                    () => { this.setState({ operateState: operateState.update, currentMenu: menu, fromModalShow: true }) }
                                }
                            ><span class="oi oi-pencil padding-right-10" title="icon name" aria-hidden="true"></span></a>
                            <a href="javescript:void(0);"
                                onClick={
                                    () => { this.setState({ operateState: operateState.delete, currentMenu: menu, confirmBoxShow: true }) }
                                }
                            ><span class="oi oi-trash padding-right-10" title="icon name" aria-hidden="true"></span></a>
                            <span>{menu.displayName}</span>
                        </div>
                        <div className='lil_arrow'></div>
                    </div>
                    <div className='swanky_wrapper__content'>
                        <ul>
                            {childsMenus.map(item => (
                                <li>
                                    <a href="javescript:void(0);"
                                        onClick={
                                            () => { this.setState({ operateState: operateState.update, currentMenu: item, fromModalShow: true }) }
                                        }
                                    ><span class="oi oi-pencil padding-right-10" title="icon name" aria-hidden="true"></span></a>
                                    <a href="javescript:void(0);"
                                        onClick={
                                            () => { this.setState({ operateState: operateState.delete, currentMenu: item, confirmBoxShow: true }) }
                                        }
                                    ><span class="oi oi-trash padding-right-10" title="icon name" aria-hidden="true"></span></a>
                                    <span>{item.displayName}</span>
                                </li>))
                            }
                            <li className="bg-success">
                                <a className="text-white w-100" href="javescript:void(0);"
                                    onClick={
                                        () => {
                                            this.setState({ operateState: operateState.add, parentMenuId: menu.id, fromModalShow: true });
                                        }
                                    }
                                >+Add</a>
                            </li>
                        </ul>
                    </div>
                </label>
            </div>
        );
    }

    render() {
        let resourceUpdate
        let resource
        if(this.state.operateState == operateState.add){
            resourceUpdate = resource => this.addMenu(resource);
            resource = {};
        }
        else if(this.state.operateState == operateState.update){
            resourceUpdate = resource => this.updateMenu(resource);
            resource = this.state.currentMenu;
        }

        return (
            <div className="col-md-12">
                <ErrorModal
                    show={this.state.errorInfo.show}
                    title={this.state.errorInfo.title}
                    message={this.state.errorInfo.message}
                    close={
                        () => {
                            this.setState({
                                errorInfo: {
                                    show: false,
                                    title: this.state.errorInfo.title,
                                    message: this.state.errorInfo.message
                                }
                            })
                        }
                    }
                />
                <LoadingModal show={this.state.loadingModalShow} />
                <div className='swanky_wrapper'>
                    {this.state.menus.map(item => this.createRootMenu(item))}
                    <div>
                        <label className="bg-success">
                            <div className="swanky_wrapper__title">
                                <a className="text-white w-100" href="javescript:void(0);"
                                    onClick={
                                        () => {
                                            this.setState({ operateState: operateState.add, parentMenuId: null, fromModalShow: true });
                                        }
                                    }
                                >+Add</a>
                            </div>
                        </label>
                    </div>
                </div>
                <ResourceForm
                        title="编辑菜单"
                        describes={this.describes}
                        resource={resource}
                        resourceUpdate={resourceUpdate}
                        show={this.state.fromModalShow}
                        close={()=>{this.setState({fromModalShow: false})}}
                    />
                <ConfirmBox
                        title="删除菜单"
                        text="确定删除菜单吗？"
                        backcall={() => { this.deleteMenu(this.state.currentMenu) }}
                        show={this.state.confirmBoxShow}
                        close={()=>{this.setState({confirmBoxShow: false})}}
                    />
            </div>
        );
    }
}