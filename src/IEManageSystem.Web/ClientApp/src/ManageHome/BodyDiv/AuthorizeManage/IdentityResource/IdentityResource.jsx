import React from 'react';
import ReactDOM from 'react-dom';
import Resource from 'Resource/Resource.jsx';
import ErrorModal from 'Resource/ErrorModal.jsx';
import LoadingModal from 'Resource/LoadingModal/LoadingModal.jsx';

export default class IdentityResource extends React.Component
{
	constructor(props){
		super(props);

		this.claims = new Array();

		// 获取Claim
	    $.get("/api/ClaimManage/GetWebClaimTypes", function(data){
	      if(data.isSuccess == true){
	        for(var item in data.value){
	        	this.claims.push({text:data.value[item], value:data.value[item]});
	        }
	      }
	    }.bind(this));

		this.describes=[
			{name:"id", isId:true, isAddShow:false, isEditShow:false, isLookupShow:false},
			{name:"name", text:"身份资源名称", isName:true, isShowOnList:true, isEditCanEdit:false},
			{name:"displayName", text:"身份资源显示名称", isShowOnList:true},
			{name:"description", text:"身份资源描述"},
			{name:"userClaims", text:"携带信息", valueType:"check", valueTexts:this.claims},
			{
				name:"enabled", 
				text:"是否启用", 
				isShowOnList:true, 
				valueType:"radio", 
				valueTexts:[{text:"启用", value:true}, {text:"禁用", value:false}],
				col: 6,
			},
			{
				name:"required", 
				text:"是否必须", 
				isShowOnList:true, 
				valueType:"radio", 
				valueTexts:[{text:"必须", value:true}, {text:"非必须", value:false}],
				col: 6,
			},
		];

		this.resourceChild = null;

        this.submitBackcall = this.submitBackcall.bind(this);
    	this.addResource = this.addResource.bind(this);
    	this.updateResource = this.updateResource.bind(this);
    	this.deleteResource = this.deleteResource.bind(this);
    	this.freshenResources = this.freshenResources.bind(this);
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
		let postData = resource;

	    $.ajax({
	      url: "/api/IdentityResourceManage/AddIdentityResource",
	      type: 'post',
	      data: JSON.stringify(postData),
	      contentType: 'application/json',
	      dataType: 'json',
	      success: this.submitBackcall
	    });
	}

	// Resource组件更新资源通知
	updateResource(resource){
		LoadingModal.showModal();
		let postData = resource;

	    $.ajax({
	      url: "/api/IdentityResourceManage/UpdateIdentityResource",
	      type: 'post',
	      data: JSON.stringify(postData),
	      contentType: 'application/json',
	      dataType: 'json',
	      success: this.submitBackcall
	    });
	}

	// Resource组件删除资源通知
	deleteResource(resource){
		LoadingModal.showModal();
		let postData = {
	      id: resource.id
	    };

	    $.ajax({
	      url: "/api/IdentityResourceManage/DeleteIdentityResource",
	      type: 'post',
	      data: JSON.stringify(postData),
	      contentType: 'application/json',
	      dataType: 'json',
	      success: this.submitBackcall
	    });
	}

	// Resource组件刷新资源通知
	freshenResources(pageIndex, pageSize, searchKey){
		this.getResourceList(pageIndex, pageSize, searchKey);
		this.getResourceNum(searchKey);
	}

    // 获取资源列表
	getResourceList(pageIndex, pageSize, searchKey){
		let postData = {
            pageIndex: pageIndex,
            pageSize: pageSize,
            searchKey: searchKey
        };

		$.ajax({
			url: "/api/IdentityResourceManage/GetIdentityResources",
            type: 'post',
            data: JSON.stringify(postData),
            contentType: 'application/json',
            dataType: 'json',
            success: function(data){
		        if(data.isSuccess == true)
		        {
		        	this.resourceChild.resetResources(data.value.identityResources, pageIndex);
		        }
		    }.bind(this)
		});
	}

    // 获取资源数量
    getResourceNum(searchKey){
        let postData = {
        	searchKey:searchKey
        };

        $.ajax({
            url: "/api/IdentityResourceManage/GetIdentityResourceNum",
            type: 'post',
            data: JSON.stringify(postData),
            contentType: 'application/json',
            dataType: 'json',
            success: function(data){
		        if(data.isSuccess == true)
		        {
		        	this.resourceChild.resetResourceNum(data.value.resourceNum);
		        }
		    }.bind(this)
        });
    }

	render(){
		return(
			<div>
				<Resource
				title="身份资源"
				describes={this.describes}
				freshenResources={this.freshenResources}
				addResource={this.addResource}
				updateResource={this.updateResource}
				deleteResource={this.deleteResource}
				setResourceRef={(ref)=>{this.resourceChild = ref}} />
				<ErrorModal />
				<LoadingModal />
			</div>
		);
	}
}