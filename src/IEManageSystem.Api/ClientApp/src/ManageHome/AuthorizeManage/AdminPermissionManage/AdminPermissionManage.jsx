import React from 'react';
import ResourceChildList from 'ResourceChildList/ResourceChildList.jsx';

export default class AdminPermissionManage extends React.Component
{
    constructor(props){
        super(props);

        this.describes = [
            { name: "id", isId: true, isAddShow: false, isEditShow: false, isLookupShow: false },
            { name: "name", text: "权限名称", isName: true, isShowOnList: true, isEditCanEdit: false },
            { name: "displayName", text: "权限显示名称", isShowOnList: true },
        ];

        this.resourceChildList = null;

        this.submitBackcall = this.submitBackcall.bind(this);
        this.addResource = this.addResource.bind(this);
        this.updateResource = this.updateResource.bind(this);
        this.deleteResource = this.deleteResource.bind(this);
        this.freshenResources = this.freshenResources.bind(this);

        this.tabs = [{ value: "AdminPermissionManage", text: "管理员权限" }];
        
        this.getPreviewrResources();
    }

    // 提交回调
    submitBackcall(data)
    {
    }

    // Resource组件添加资源通知
    addResource(previewResource, resource, tabValue){
    }

    // Resource组件更新资源通知
    updateResource(previewResource, resource, tabValue){
    }

    // Resource组件删除资源通知
    deleteResource(previewResource, resource, tabValue){
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
            url: "/api/AdminManage/GetPermissions",
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
            pageIndex: 1,
            pageSize: 9999,
        };

        IETool.ieAjax({
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

    render(){
        return(
            <ResourceChildList 
                freshenResources={this.freshenResources}
                previewTitle="管理员名称"
                previewResourcesTextName="name"
                tabs={this.tabs}
                resourceTitle="权限"
                describes={this.describes}
                addResource={this.addResource}
                updateResource={this.updateResource}
                deleteResource={this.deleteResource}
                setResourceChildListRef={(resourceChildList)=>{this.resourceChildList = resourceChildList}}
                hideAdd={true}
                hideEdit={true}
                hideDelete={true}
                hidePadding={true}
            />
        );
    }
}