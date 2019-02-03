import React from 'react';
import ReactDOM from 'react-dom';
import ResourceChildList from 'ResourceChildList/ResourceChildList.jsx';

export default class ApiScopeUrl extends React.Component
{
    constructor(props){
        super(props);

        this.describes = [
            { name: "url", text: "Url", isName: true, isShowOnList: true },
            {
				name:"isQueryUrl", 
				text:"Url类型", 
				valueType:"radio", 
				valueTexts:[{text:"查询域", value:true}, {text:"管理域", value:false}],
				isShowOnList: true
			},
        ];

        this.resourceChildList = null;

        this.submitBackcall = this.submitBackcall.bind(this);
        this.addResource = this.addResource.bind(this);
        this.updateResource = this.updateResource.bind(this);
        this.deleteResource = this.deleteResource.bind(this);
        this.freshenResources = this.freshenResources.bind(this);

        this.tabs = [{ value: "AdminPermissionManage", text: "功能域Url" }];
        
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

        $.ajax({
            url: "/api/ApiScopeManage/GetApiScopeUrls",
            type: 'post',
            data: JSON.stringify(postData),
            contentType: 'application/json',
            dataType: 'json',
            success: function(data){
                if(data.isSuccess == true)
                {
                    this.resourceChildList.resetResources(data.value.urls);
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

    render(){
        return(
            <ResourceChildList 
                freshenResources={this.freshenResources}
                previewTitle="功能域名称"
                previewResourcesTextName="displayName"
                tabs={this.tabs}
                resourceTitle="Url"
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