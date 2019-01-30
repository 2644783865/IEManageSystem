import React from 'react';
import ReactDOM from 'react-dom';
import ResourceChildList from 'ResourceChildList/ResourceChildList.jsx';

export default class RolePermissionManage extends React.Component
{
    constructor(props){
        super(props);

        this.selectResources = [];

        this.describes=[
            {name:"id", isId:true, isAddShow:false, isEditShow:false, isLookupShow:false},
            {name:"name", text:"权限名称", isName:true, isShowOnList:true, isEditCanEdit:false},
            {name:"displayName", text:"权限显示名称", isShowOnList:true},
            {name:"selectId", text:"请选择权限", valueType:"radio",
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
            permissionId:resource.selectId,
            roleId:previewResource.id,
        };

        $.ajax({
            url: "/api/RoleManage/AddPermission",
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
            roleId:previewResource.id,
        };

        $.ajax({
            url: "/api/RoleManage/RemovePermission",
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
            url: "/api/RoleManage/GetPermissions",
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
            url: "/api/RoleManage/GetRoles",
            type: 'post',
            data: JSON.stringify(postData),
            contentType: 'application/json',
            dataType: 'json',
            success: function(data){
                if(data.isSuccess == true)
                {
                    this.resourceChildList.resetPreviewResources(data.value.roles);
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
            url: "/api/PermissionManage/GetPermissions",
            type: 'post',
            data: JSON.stringify(postData),
            contentType: 'application/json',
            dataType: 'json',
            success: function(data){
                if(data.isSuccess == true)
                {
                    for(let item in data.value.permissions){
                        this.selectResources.push({
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
                previewTitle="角色名称"
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