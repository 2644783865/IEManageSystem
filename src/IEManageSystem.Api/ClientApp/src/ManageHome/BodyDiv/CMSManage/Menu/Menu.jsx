import React from "react";
import ResourceForm from 'ResourceForm/ResourceForm.jsx';
import Describe from 'ResourceForm/Describe.js';
import {ResourceDescribeValueType} from 'ResourceForm/ResourceDescribeValueType.js';

import ErrorModal from 'ErrorModal/ErrorModal.jsx';
import LoadingModal from 'LoadingModal/LoadingModal.jsx';
import ConfirmBox from 'ConfirmBox/ConfirmBox.jsx';

import "./Menu.css";

const operateState = {
    add:"add",
    update:"update",
    delete:"delete",
    none:"none"
};

export default class Menu extends React.Component{
    constructor(props){
        super(props);

        this.describes = [];

        [
            {name:"name", text:"菜单名", isId:false, isName:false, isEditCanEdit:false, valueType:ResourceDescribeValueType.text, col:12},
            {name:"displayName", text:"显示名称", isId:false, isName:false, isEditCanEdit:false, valueType:ResourceDescribeValueType.text, col:12},
            {name:"icon", text:"图标", isId:false, isName:false, isEditCanEdit:false, valueType:ResourceDescribeValueType.text, col:12},
        ].forEach(element => {
            this.describes.push(new Describe(element));
        });

        this.state = {
            menus: [],
            parentMenuId: null,
            operateState: operateState.none,
            currentMenu: null
        };

        this.submitBackcall = this.submitBackcall.bind(this);
        this.getMenus = this.getMenus.bind(this);
        this.addMenu = this.addMenu.bind(this);
        this.deleteMenu = this.deleteMenu.bind(this);
        this.updateMenu = this.updateMenu.bind(this);

        this.getMenus();
    }

    componentDidUpdate(){
        this.state.operateState = operateState.none;
    }

    // 提交回调
	submitBackcall(data){
        LoadingModal.hideModal();

	    if(data.isSuccess == true)
	    {
            this.getMenus();
	    }
	    else{
            ErrorModal.showErrorModal("提交表单错误", data.message);
	    }
	}

    getMenus(){
        let postData = {

        };

        IETool.ieAjax({
            url: "/api/MenuManage/GetMenus",
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

    addMenu(resource){
        LoadingModal.showModal();

        let postData = resource;
        postData.parentMenuId = this.state.parentMenuId;

        let url = null;
        if(this.state.parentMenuId == null){
            url = "/api/MenuManage/AddCompositeMenu";
        }
        else{
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

    deleteMenu(resource){
        LoadingModal.showModal();

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

    updateMenu(resource){
        LoadingModal.showModal();

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

    createRootMenu(menu)
    {
        let childsMenus = menu.menus || [];

        return (
            <div>
                <label>
                    <div className="swanky_wrapper__title">
                        <div>
                            <a href="javescript:void(0);"
                                onClick={
                                    () => { this.setState({ operateState: operateState.update, currentMenu: menu }) }
                                }
                            ><span class="oi oi-pencil padding-right-10" title="icon name" aria-hidden="true"></span></a>
                            <a href="javescript:void(0);"
                                onClick={
                                    () => { this.setState({ operateState: operateState.delete, currentMenu: menu }) }
                                }
                            ><span class="oi oi-trash padding-right-10" title="icon name" aria-hidden="true"></span></a>
                            <span>{menu.displayName}</span>
                        </div>
                        <div className='lil_arrow'></div>
                    </div>
                    <div className='swanky_wrapper__content'>
                        <ul>
                            { childsMenus.map(item => (
                                <li>
                                    <a  href="javescript:void(0);"
                                        onClick={
                                            ()=>{this.setState({operateState:operateState.update, currentMenu:item})}
                                        }
                                    ><span class="oi oi-pencil padding-right-10" title="icon name" aria-hidden="true"></span></a>
                                    <a  href="javescript:void(0);"
                                        onClick={
                                            ()=>{this.setState({operateState:operateState.delete, currentMenu:item})}
                                        }
                                    ><span class="oi oi-trash padding-right-10" title="icon name" aria-hidden="true"></span></a>
                                    <span>{item.displayName}</span>
                                </li>) ) 
                            }
                            <li className="bg-success">
                                <a className="text-white w-100" href="javescript:void(0);"
                                    onClick={
                                        ()=>{
                                            this.setState({operateState:operateState.add, parentMenuId:menu.id});
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

    render(){
        let result = null;

        return (
            <div className="col-md-12">
                <ErrorModal />
                <LoadingModal />
                <div className='swanky_wrapper'>
                    { this.state.menus.map(item => this.createRootMenu(item)) }
                    <div>
                        <label className="bg-success">
                            <div className="swanky_wrapper__title">
                                <a className="text-white w-100" href="javescript:void(0);"
                                    onClick={
                                        ()=>{
                                            this.setState({operateState:operateState.add, parentMenuId: null});
                                        }
                                    }
                                >+Add</a>
                            </div>
                        </label>
                    </div>
                </div>
                {
                    this.state.operateState == operateState.add && 
                    <ResourceForm 
	            	title="添加菜单"
	            	describes={ this.describes }
	            	resource={ {} } 
	            	resourceUpdate={resource=>this.addMenu(resource)} />
                }
                {
                    this.state.operateState == operateState.update && 
                    <ResourceForm 
	            	title="编辑菜单"
	            	describes={ this.describes }
	            	resource={ this.state.currentMenu } 
	            	resourceUpdate={resource=>this.updateMenu(resource)} />
                }
                {
                    this.state.operateState == operateState.delete && 
                    <ConfirmBox 
                    title="删除菜单"
                    text="确定删除菜单吗？"
                    backcall={()=>{this.deleteMenu(this.state.currentMenu)}}
                    />
                }
            </div>
        );
    }
}