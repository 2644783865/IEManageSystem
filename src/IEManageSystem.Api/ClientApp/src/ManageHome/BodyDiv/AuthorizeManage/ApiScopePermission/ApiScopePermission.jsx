import React from 'react';
import ReactDOM from 'react-dom';
import ResourceChildList from 'ResourceChildList/ResourceChildList.jsx';

const scopePermissionType = {
    manage: "manage",
    query: "query",
}

export default class ApiScopePermission extends React.Component
{
	constructor(props){
		super(props);

		this.permissions = [];

		this.describes=[
			{name:"id", isId:true, isAddShow:false, isEditShow:false, isLookupShow:true},
			{name:"name", text:"权限名称", isName:true, isShowOnList:true, isEditShow:false, isAddShow:false},
			{name:"displayName", text:"权限显示名称", isShowOnList:true, isEditShow:false, isAddShow:false},
			{name:"permissionId", text:"请选择权限", valueType:"radio",
				valueTexts:this.permissions,
				isLookupShow:false
			},
		];

		this.resourceChildList = null;

        this.submitBackcall = this.submitBackcall.bind(this);
    	this.addResource = this.addResource.bind(this);
    	this.updateResource = this.updateResource.bind(this);
    	this.deleteResource = this.deleteResource.bind(this);
    	this.freshenResources = this.freshenResources.bind(this);

        this.tabs = [{ value: scopePermissionType.manage, text: "管理域" }, { value: scopePermissionType.query, text: "查询域" }];
		
		this.getPreviewrResources();
        this.getPermissions();
	}

	// 提交回调
	submitBackcall(data)
	{
		this.resourceChildList.hideLoadingModal();

	    if(data.isSuccess == true)
	    {
            this.resourceChildList.updateResources()
	    }
	    else{
	      	this.resourceChildList.showErrorModal("提交表单错误", data.message);
	    }
	}

	// Resource组件添加资源通知
	addResource(previewResource, resource, tabValue){
		this.resourceChildList.showLoadingModal();
		let postData = {
			permissionId:resource.permissionId,
			apiScopeId:previewResource.id,
        };

	    IETool.ieAjax({
            url: tabValue == scopePermissionType.manage ? "/api/ApiScopeManage/AddManagePermission" : "/api/ApiScopeManage/AddQueryPermission",
            type: 'post',
            data: JSON.stringify(postData),
            contentType: 'application/json',
            dataType: 'json',
            success: this.submitBackcall
	    });
	}

	// Resource组件更新资源通知
	updateResource(previewResource, resource, tabValue){
	}

	// Resource组件删除资源通知
	deleteResource(previewResource, resource, tabValue){
		this.resourceChildList.showLoadingModal();
		let postData = {
			permissionId:resource.id,
			apiScopeId:previewResource.id,
		};

	    IETool.ieAjax({
            url: tabValue == scopePermissionType.manage ? "/api/ApiScopeManage/RemoveManagePermission" : "/api/ApiScopeManage/RemoveQueryPermission",
            type: 'post',
            data: JSON.stringify(postData),
            contentType: 'application/json',
            dataType: 'json',
            success: this.submitBackcall
	    });
	}

	// 组件刷新资源通知
	freshenResources(previewResource, tabValue)
	{
		this.getResourceList(previewResource, tabValue);
    }

    // 获取资源列表
	getResourceList(previewResource, tabValue){
		let postData = {
    		id: previewResource.id
        };

		IETool.ieAjax({
            url: tabValue == scopePermissionType.manage ? "/api/ApiScopeManage/GetManagePermissions" : "/api/ApiScopeManage/GetQueryPermissions",
            type: 'post',
            data: JSON.stringify(postData),
            contentType: 'application/json',
            dataType: 'json',
            success: function(data){
		        if(data.isSuccess == true)
		        {
		        	this.resourceChildList.resetResources(data.value.permissions);
		        }
		    }.bind(this)
		});
	}

    // 获取资源数量
    getResourceNum(searchKey){
    }

    // 获取预览资源
    getPreviewrResources(){
    	let postData = {
        };

		IETool.ieAjax({
			url: "/api/ApiScopeManage/GetApiScopes",
            type: 'post',
            data: JSON.stringify(postData),
            contentType: 'application/json',
            dataType: 'json',
            success: function(data){
		        if(data.isSuccess == true)
		        {
		        	this.resourceChildList.resetPreviewResources(data.value.apiScopes);
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

		IETool.ieAjax({
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
			<ResourceChildList 
				freshenResources={this.freshenResources}
				previewTitle="功能域名称"
				previewResourcesTextName="displayName"
				tabs={this.tabs}
				resourceTitle="权限"
				describes={this.describes}
				addResource={this.addResource}
				updateResource={this.updateResource}
				deleteResource={this.deleteResource}
				setResourceChildListRef={(resourceChildList)=>{this.resourceChildList = resourceChildList}}
				hideEdit={true}
				hidePadding={true}
			/>
		);
	}
}