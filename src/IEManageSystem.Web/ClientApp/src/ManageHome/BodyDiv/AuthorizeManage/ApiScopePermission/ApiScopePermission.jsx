import React from 'react';
import ReactDOM from 'react-dom';
import Resource from 'Resource/Resource.jsx';
import ErrorModal from 'Resource/ErrorModal.jsx';
import LoadingModal from 'Resource/LoadingModal/LoadingModal.jsx';
import Preview from 'Preview/Preview.jsx';

import "./ApiScopePermission.css";

export default class ApiScopePermission extends React.Component
{
	constructor(props){
		super(props);

		this.permissions = [];

		this.state = {
			apiScope:{},	// 当前选择的api域
			apiScopes: [],
		}

		this.describes=[
			{name:"id", isId:true, isAddShow:false, isEditShow:false, isLookupShow:true},
			{name:"name", text:"权限名称", isName:true, isShowOnList:true, isEditShow:false, isAddShow:false},
			{name:"displayName", text:"权限显示名称", isShowOnList:true, isEditShow:false, isAddShow:false},
			{name:"permissionId", text:"请选择权限", valueType:"radio",
				valueTexts:this.permissions
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
			apiScopeId:this.state.apiScope.id,
		};

	    $.ajax({
	      url: "/api/ApiScopeManage/AddApiScopePermission",
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
			apiScopeId:this.state.apiScope.id,
		};

	    $.ajax({
	      url: "/api/ApiScopeManage/RemoveApiScopePermission",
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
		this.getResourceList(this.state.apiScope);
	}

    // 获取资源列表
	getResourceList(previewResource){
		let postData = {
    		id: previewResource.id
        };

		$.ajax({
			url: "/api/ApiScopeManage/GetApiScopePermissions",
            type: 'post',
            data: JSON.stringify(postData),
            contentType: 'application/json',
            dataType: 'json',
            success: function(data){
		        if(data.isSuccess == true)
		        {
		        	this.setState({
		        		apiScope:previewResource},
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
		        	this.setState({apiScopes: data.value.apiScopes});
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
						title="Api域名称"
						previewResources={this.state.apiScopes} 
						textName="name" 
						previewOnClick={(previewResource)=>this.getResourceList(previewResource)}
						operationName="查看"
					/>
				</div>
				<div className="right-permissions padding-left-10 padding-right-10 float-left h-100">
					<Resource
					title="Api域权限"
					describes={this.describes}
					freshenResources={this.freshenResources}
					addResource={this.addResource}
					updateResource={this.updateResource}
					deleteResource={this.deleteResource}
					setResourceRef={(ref)=>{this.resourceChild = ref}}
					hideEdit={true}
					hidePadding={true} />
				</div>
				<ErrorModal />
				<LoadingModal />
			</div>
		);
	}
}