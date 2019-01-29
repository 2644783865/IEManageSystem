import React from 'react';
import ReactDOM from 'react-dom';
import Resource from 'Resource/Resource.jsx';
import ErrorModal from 'Resource/ErrorModal.jsx';
import LoadingModal from 'Resource/LoadingModal/LoadingModal.jsx';
import Preview from 'Preview/Preview.jsx';

import "./AdminPermissionManage.css";

export default class AdminPermissionManage extends React.Component
{
    constructor(props) {
        super(props);

        this.state = {
            previewrResource: {},	// 当前选择的资源
            previewrResources: [],
        }

        this.describes = [
            { name: "id", isId: true, isAddShow: false, isEditShow: false, isLookupShow: false },
            { name: "name", text: "权限名称", isName: true, isShowOnList: true, isEditCanEdit: false },
            { name: "displayName", text: "权限显示名称", isShowOnList: true },
        ];

        this.resourceChild = null;

        this.submitBackcall = this.submitBackcall.bind(this);
        this.addResource = this.addResource.bind(this);
        this.updateResource = this.updateResource.bind(this);
        this.deleteResource = this.deleteResource.bind(this);
        this.freshenResources = this.freshenResources.bind(this);

        this.getPreviewrResources();
    }

    // 提交回调
    submitBackcall(data) {
    }

    // Resource组件添加资源通知
    addResource(resource) {
    }

    // Resource组件更新资源通知
    updateResource(resource) {
    }

    // Resource组件删除资源通知
    deleteResource(resource) {
    }

    // Resource组件刷新资源通知
    freshenResources(pageIndex, pageSize, searchKey) {
        this.getResourceList(this.state.previewrResource);
    }

    // 获取资源列表
    getResourceList(previewResource) {
        let postData = {
            id: previewResource.id
        };

        $.ajax({
            url: "/api/AdminManage/GetPermissions",
            type: 'post',
            data: JSON.stringify(postData),
            contentType: 'application/json',
            dataType: 'json',
            success: function (data) {
                if (data.isSuccess == true) {
                    this.setState({
                        previewrResource: previewResource
                    },
                        () => this.resourceChild.resetResources(data.value.permissions, 1));
                }
            }.bind(this)
        });
    }

    // 获取资源数量
    getResourceNum(searchKey) {
    }

    // 预览资源
    getPreviewrResources() {
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
            success: function (data) {
                if (data.isSuccess == true) {
                    this.setState({ previewrResources: data.value.admins });
                }
            }.bind(this)
        });
    }

    render() {
        return (
            <div className="row">
                <div className="left-preview float-left h-100">
                    <Preview
                        title="管理员名称"
                        previewResources={this.state.previewrResources}
                        textName="name"
                        previewOnClick={(previewResource) => this.getResourceList(previewResource)}
                        operationName="查看"
                    />
                </div>
                <div className="right-resource padding-left-10 padding-right-10 float-left h-100">
                    <Resource
                        title="权限"
                        describes={this.describes}
                        freshenResources={this.freshenResources}
                        addResource={this.addResource}
                        updateResource={this.updateResource}
                        deleteResource={this.deleteResource}
                        setResourceRef={(ref) => { this.resourceChild = ref }}
                        hideAdd={true}
                        hideEdit={true}
                        hideDelete={true}
                        hidePadding={true} />
                </div>
                <ErrorModal />
                <LoadingModal />
            </div>
        );
    }
}