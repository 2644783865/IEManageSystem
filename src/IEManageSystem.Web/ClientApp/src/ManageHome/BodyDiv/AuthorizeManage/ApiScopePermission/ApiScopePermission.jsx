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

		this.state = {
			apiScopes: [],
			apiScopePermissions: [],
		}

		this.describes=[
			{name:"id", isId:true, isAddShow:false, isEditShow:false, isLookupShow:true},
			{name:"name", text:"权限名称名称", isName:true, isShowOnList:true},
		];

		this.resourceChild = null;

        this.submitBackcall = this.submitBackcall.bind(this);
    	this.addResource = this.addResource.bind(this);
    	this.updateResource = this.updateResource.bind(this);
    	this.deleteResource = this.deleteResource.bind(this);
    	this.freshenResources = this.freshenResources.bind(this);

    	this.getApiScopes();

    	this.previewOnClick = this.previewOnClick.bind(this);
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
	      url: "/api/ApiResourceManage/AddApiResource",
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
	      url: "/api/ApiResourceManage/UpdateApiResource",
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
	      url: "/api/ApiResourceManage/DeleteApiResource",
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
		let startIndex = (pageIndex-1)*pageSize;
		let endIndex = pageIndex*pageSize - 1;

		let newResource = [];
		for(let item in this.apiScopePermissions){
			if(item>=startIndex && item <= endIndex){
				newResource.push(this.apiScopePermissions[item]);
			}
		}

		this.resourceChild.resetResources(newResource, pageIndex);
	}

    // 获取资源列表
	getResourceList(pageIndex, pageSize, searchKey){
		let postData = {
            pageIndex: pageIndex,
            pageSize: pageSize,
            searchKey: searchKey
        };

		$.ajax({
			url: "/api/ApiResourceManage/GetApiResources",
            type: 'post',
            data: JSON.stringify(postData),
            contentType: 'application/json',
            dataType: 'json',
            success: function(data){
		        if(data.isSuccess == true)
		        {
		        	this.resourceChild.resetResources(data.value.apiResources, pageIndex);
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
            url: "/api/ApiResourceManage/GetApiResourceNum",
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

    // 预览框单击
    previewOnClick(previewResource){
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
		        	this.setState({apiScopePermissions: data.value.permissions},this.resourceChild.reloadResources());
		        }
		    }.bind(this)
		});
    }

	render(){
		return(
			<div className="row h-100 apiScopePermission">
				<div class="left-preview float-left h-100">
					<Preview 
						title="Api域"
						previewResources={this.state.apiScopes} 
						textName="name" 
						previewOnClick={this.previewOnClick}
						operationName="查看"
					/>
				</div>
				<div class="right-permissions padding-left-10 padding-right-10 float-left h-100">
					<Resource
					title="Api域权限"
					describes={this.describes}
					freshenResources={this.freshenResources}
					addResource={this.addResource}
					updateResource={this.updateResource}
					deleteResource={this.deleteResource}
					setResourceRef={(ref)=>{this.resourceChild = ref}}
					hideEdit={true} />
				</div>
				<ErrorModal />
				<LoadingModal />
			</div>
		);
	}
}