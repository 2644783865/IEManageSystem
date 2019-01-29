import React from 'react';
import ReactDOM from 'react-dom';
import Resource from 'Resource/Resource.jsx';
import ErrorModal from 'Resource/ErrorModal.jsx';
import LoadingModal from 'Resource/LoadingModal/LoadingModal.jsx';
import Preview from 'Preview/Preview.jsx';

import "./AdminRoleManage.css";

export default class AdminRoleManage extends React.Component
{
	constructor(props){
		super(props);

		this.selectResources = [];	// 可以选择的资源

		this.state = {
			previewrResource:{},	// 当前选择的资源
			previewrResources: [],
		}

		this.describes=[
			{name:"id", isId:true, isAddShow:false, isEditShow:false, isLookupShow:true},
			{name:"name", text:"角色名称", isName:true, isShowOnList:true, isEditShow:false, isAddShow:false},
			{name:"displayName", text:"角色显示名称", isShowOnList:true, isEditShow:false, isAddShow:false},
			{name:"describe", text:"角色描述", isShowOnList:true, isEditShow:false, isAddShow:false},
			{name:"selectId", text:"请选择角色", valueType:"radio",
				valueTexts:this.selectResources,
				isLookupShow:false
			},
		];

		this.resourceChild = null;

        this.submitBackcall = this.submitBackcall.bind(this);
    	this.addResource = this.addResource.bind(this);
    	this.updateResource = this.updateResource.bind(this);
    	this.deleteResource = this.deleteResource.bind(this);
    	this.freshenResources = this.freshenResources.bind(this);

    	this.getPreviewrResources();
    	this.getSelectResources();
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
			roleId:resource.selectId,
			adminId:this.state.previewrResource.id,
		};

	    $.ajax({
	      url: "/api/AdminManage/AddRole",
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
			roleId:resource.id,
			adminId:this.state.previewrResource.id,
		};

	    $.ajax({
	      url: "/api/AdminManage/RemoveRole",
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
			url: "/api/AdminManage/GetAdminRoles",
            type: 'post',
            data: JSON.stringify(postData),
            contentType: 'application/json',
            dataType: 'json',
            success: function(data){
		        if(data.isSuccess == true)
		        {
		        	this.setState({
		        		previewrResource:previewResource},
		        		()=>this.resourceChild.resetResources(data.value.roles, 1));
		        }
		    }.bind(this)
		});
	}

    // 获取资源数量
    getResourceNum(searchKey){
    }

    // 预览资源
    getPreviewrResources(){
    	let postData = {
            pageIndex: 1,
            pageSize: 9999,
        };

		$.ajax({
			url: "/api/AdminManage/GetAdmins",
            type: 'post',
            data: JSON.stringify(postData),
            contentType: 'application/json',
            dataType: 'json',
            success: function(data){
		        if(data.isSuccess == true)
		        {
		        	this.setState({previewrResources: data.value.admins});
		        }
		    }.bind(this)
		});
    }

    // 获取可以选择的资源
    getSelectResources()
    {
    	let postData = {
            pageIndex: 1,
            pageSize: 9999,
        };

		$.ajax({
			url: "/api/RoleManage/GetRoles",
            type: 'post',
            data: JSON.stringify(postData),
            contentType: 'application/json',
            dataType: 'json',
            success: function(data){
		        if(data.isSuccess == true)
		        {
		        	for(let item in data.value.roles){
		        		this.selectResources.push({
		        			value:data.value.roles[item].id,
		        			text:data.value.roles[item].displayName,
		        		});
		        	}
		        }
		    }.bind(this)
		});
    }

	render(){
		return(
			<div className="row">
				<div className="left-preview float-left h-100">
					<Preview 
						title="管理员名称"
						previewResources={this.state.previewrResources} 
						textName="name" 
						previewOnClick={(previewResource)=>this.getResourceList(previewResource)}
						operationName="查看"
					/>
				</div>
				<div className="right-resource padding-left-10 padding-right-10 float-left h-100">
					<Resource
					title="角色"
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