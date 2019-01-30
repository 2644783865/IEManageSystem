import React from 'react';
import ReactDOM from 'react-dom';
import ResourceChildList from 'ResourceChildList/ResourceChildList.jsx';

export default class AdminRoleManage extends React.Component
{
	constructor(props){
		super(props);

		this.selectResources = [];

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

		this.resourceChildList = null;

        this.submitBackcall = this.submitBackcall.bind(this);
    	this.addResource = this.addResource.bind(this);
    	this.updateResource = this.updateResource.bind(this);
    	this.deleteResource = this.deleteResource.bind(this);
    	this.freshenResources = this.freshenResources.bind(this);

        this.tabs = [{ value: "value", text: "管理员角色" }];
		
		this.getPreviewrResources();
        this.getSelectResources();
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
			roleId:resource.selectId,
			adminId:previewResource.id,
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
	updateResource(previewResource, resource, tabValue){
	}

	// Resource组件删除资源通知
	deleteResource(previewResource, resource, tabValue){
		this.resourceChildList.showLoadingModal();
		let postData = {
			roleId:resource.id,
			adminId:previewResource.id,
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

		$.ajax({
            url: "/api/AdminManage/GetAdminRoles",
            type: 'post',
            data: JSON.stringify(postData),
            contentType: 'application/json',
            dataType: 'json',
            success: function(data){
		        if(data.isSuccess == true)
		        {
		        	this.resourceChildList.resetResources(data.value.roles);
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
		        	this.resourceChildList.resetPreviewResources(data.value.admins);
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
			<ResourceChildList 
				freshenResources={this.freshenResources}
				previewTitle="管理员名称"
				previewResourcesTextName="name"
				tabs={this.tabs}
				resourceTitle="角色"
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