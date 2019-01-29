import React from 'react';
import ReactDOM from 'react-dom';
import Resource from 'Resource/Resource.jsx';
import ErrorModal from 'Resource/ErrorModal.jsx';
import LoadingModal from 'Resource/LoadingModal/LoadingModal.jsx';
import Preview from 'Preview/Preview.jsx';
import Tab from 'Tab/Tab.jsx';

import "./ApiScopePermission.css";

const scopePermissionType = {
    manage: "manage",
    query: "query",
}

export default class ApiScopePermission extends React.Component
{
	constructor(props){
		super(props);

		this.permissions = [];

		this.state = {
			previewrResource:{},	// 当前选择的api域
			previewrResources: [],
		}

		this.describes=[
			{name:"id", isId:true, isAddShow:false, isEditShow:false, isLookupShow:true},
			{name:"name", text:"权限名称", isName:true, isShowOnList:true, isEditShow:false, isAddShow:false},
			{name:"displayName", text:"权限显示名称", isShowOnList:true, isEditShow:false, isAddShow:false},
			{name:"permissionId", text:"请选择权限", valueType:"radio",
				valueTexts:this.permissions,
				isLookupShow:false
			},
		];

		this.resourceChild = null;

        this.submitBackcall = this.submitBackcall.bind(this);
    	this.addResource = this.addResource.bind(this);
    	this.updateResource = this.updateResource.bind(this);
    	this.deleteResource = this.deleteResource.bind(this);
    	this.freshenResources = this.freshenResources.bind(this);

    	this.getApiScopes();
        this.getPermissions();

        this.tabSelectIndex = 0;
        this.tabs = [{ value: scopePermissionType.manage, text: "管理域" }, { value: scopePermissionType.query, text: "查询域" }];
	}

	// 提交回调
	submitBackcall(data)
	{
		LoadingModal.hideModal();

	    if(data.isSuccess == true)
	    {
	    	this.resourceChild.reloadResources();
	    }
	    else{
	      	ErrorModal.showErrorModal("提交表单错误", data.message);
	    }
	}

	// Resource组件添加资源通知
	addResource(resource){
		LoadingModal.showModal();
		let postData = {
			permissionId:resource.permissionId,
			apiScopeId:this.state.previewrResource.id,
        };

	    $.ajax({
            url: this.tabs[this.tabSelectIndex].value == scopePermissionType.manage ? "/api/ApiScopeManage/AddManagePermission" : "/api/ApiScopeManage/AddQueryPermission",
            type: 'post',
            data: JSON.stringify(postData),
            contentType: 'application/json',
            dataType: 'json',
            success: this.submitBackcall
	    });
	}

	// Resource组件更新资源通知
	updateResource(resource){
	}

	// Resource组件删除资源通知
	deleteResource(resource){
		LoadingModal.showModal();
		let postData = {
			permissionId:resource.id,
			apiScopeId:this.state.previewrResource.id,
		};

	    $.ajax({
            url: this.tabs[this.tabSelectIndex].value == scopePermissionType.manage ? "/api/ApiScopeManage/RemoveManagePermission" : "/api/ApiScopeManage/RemoveQueryPermission",
            type: 'post',
            data: JSON.stringify(postData),
            contentType: 'application/json',
            dataType: 'json',
            success: this.submitBackcall
	    });
	}

	// Resource组件刷新资源通知
	freshenResources(pageIndex, pageSize, searchKey)
	{
		this.getResourceList(this.state.previewrResource);
    }

    // 获取资源列表
	getResourceList(previewResource){
		let postData = {
    		id: previewResource.id
        };

		$.ajax({
            url: this.tabs[this.tabSelectIndex].value == scopePermissionType.manage ? "/api/ApiScopeManage/GetManagePermissions" : "/api/ApiScopeManage/GetQueryPermissions",
            type: 'post',
            data: JSON.stringify(postData),
            contentType: 'application/json',
            dataType: 'json',
            success: function(data){
		        if(data.isSuccess == true)
		        {
		        	this.setState({
		        		previewrResource:previewResource},
		        		()=>this.resourceChild.resetResources(data.value.permissions, 1));
		        }
		    }.bind(this)
		});
	}

    // 获取资源数量
    getResourceNum(searchKey){
    }

    // 获取Api域
    getApiScopes(){
    	let postData = {
        };

		$.ajax({
			url: "/api/ApiScopeManage/GetApiScopes",
            type: 'post',
            data: JSON.stringify(postData),
            contentType: 'application/json',
            dataType: 'json',
            success: function(data){
		        if(data.isSuccess == true)
		        {
		        	this.setState({previewrResources: data.value.apiScopes});
		        }
		    }.bind(this)
		});
    }

    // 获取权限列表
    getPermissions()
    {
    	let postData = {
            pageIndex: 1,
            pageSize: 9999,
        };

		$.ajax({
			url: "/api/PermissionManage/GetPermissions",
            type: 'post',
            data: JSON.stringify(postData),
            contentType: 'application/json',
            dataType: 'json',
            success: function(data){
		        if(data.isSuccess == true)
		        {
		        	for(let item in data.value.permissions){
		        		this.permissions.push({
		        			value:data.value.permissions[item].id,
		        			text:data.value.permissions[item].displayName,
		        		});
		        	}
		        }
		    }.bind(this)
		});
    }

	render(){
		return(
			<div className="row apiScopePermission">
				<div className="left-preview float-left h-100">
					<Preview 
						title="功能域名称"
						previewResources={this.state.previewrResources} 
						textName="displayName" 
						previewOnClick={(previewResource)=>this.getResourceList(previewResource)}
						operationName="查看"
					/>
				</div>
                <div className="right-permissions padding-left-10 padding-right-10 float-left h-100">
                    <Tab tabs={this.tabs}
                        nameField="text"
                        selectIndex={this.tabSelectIndex}
                        selectOnclick={(tab, index) => {
                            this.tabSelectIndex = index;
                            this.getResourceList(this.state.previewrResource);
                        }}
                    >
                        <Resource
                            title="权限"
                            describes={this.describes}
                            freshenResources={this.freshenResources}
                            addResource={this.addResource}
                            updateResource={this.updateResource}
                            deleteResource={this.deleteResource}
                            setResourceRef={(ref) => { this.resourceChild = ref }}
                            hideEdit={true}
                            hidePadding={true} />
                    </Tab>
				</div>
				<ErrorModal />
				<LoadingModal />
			</div>
		);
	}
}