import React from 'react';
import ReactDOM from 'react-dom';
import Resource from 'Resource/Resource.jsx';
import Preview from 'Preview/Preview.jsx';
import Tab from 'Tab/Tab.jsx';

import "./ResourceChildList.css";

export default class ResourceChildList extends React.Component
{
    // props.freshenResources(previewResource, tabValue)
    // props.previewTitle
    // props.previewResourcesTextName
    // props.tabs [{ value: "", text: "" }]
    // props.resourceTitle
    // props.describes
    // props.addResource()
    // props.updateResource()
    // props.deleteResource()
    // props.hideAdd = false
    // props.hideEdit = false
    // props.hideDelete = false
    // props.hidePadding = false
    // props.setResourceChildListRef()
    constructor(props) {
        super(props);

        this.props.setResourceChildListRef(this);

        this.permissions = [];

        this.state = {
            previewResource: {},	// 当前选择的api域
            previewResources: [],
            tabSelectIndex: 0
        }

        this.resourceChild = null;

        this.tabSelectIndex = 0;
    }

    // 重新设置预览资源
    resetPreviewResources(previewResources) {
        this.setState({ previewResources: previewResources});
    }

    // 重新设置资源（由父组件调用）
    resetResources(resources) {
        this.resourceChild.resetResources(resources, 1)
    }

    // 刷新资源组件数据
    updateResources() {
        this.props.freshenResources(this.state.previewResource, this.props.tabs[this.state.tabSelectIndex].value);
    }

    showLoadingModal(){
        this.resourceChild.showLoadingModal();
    }

    hideLoadingModal(){
        this.resourceChild.hideLoadingModal();
    }

    showErrorModal(title, message){
        this.resourceChild.showErrorModal(title, message);
    }

    render() {
        return (
            <div className="w-100 h-100">
                <div className="left-preview float-left h-100">
                    <Preview
                        title={this.props.previewTitle}
                        previewResources={this.state.previewResources}
                        textName={this.props.previewResourcesTextName}
                        previewOnClick={(previewResource) => this.setState({ previewResource: previewResource }, () => this.updateResources())}
                        operationName="查看"
                    />
                </div>
                <div className="right-resource padding-left-10 padding-right-10 float-left h-100">
                    <Tab tabs={this.props.tabs}
                        nameField="text"
                        selectIndex={this.state.tabSelectIndex}
                        selectOnclick={(tab, index) => {
                            this.setState({ tabSelectIndex: index }, () => this.updateResources());
                        }}
                    >
                        <Resource
                            title={this.props.resourceTitle}
                            describes={this.props.describes}
                            freshenResources={
                                (pageIndex, pageSize, searchKey)=>this.updateResources()
                            }
                            addResource={
                                (resource)=>this.props.addResource(this.state.previewResource, resource,this.props.tabs[this.state.tabSelectIndex].value)
                            }
                            updateResource={
                                (resource)=>this.props.updateResource(this.state.previewResource, resource,this.props.tabs[this.state.tabSelectIndex].value)
                            }
                            deleteResource={
                                (resource)=>this.props.deleteResource(this.state.previewResource, resource,this.props.tabs[this.state.tabSelectIndex].value)
                            }
                            setResourceRef={(ref) => { this.resourceChild = ref }}
                            hideAdd={this.props.hideAdd}
                            hideEdit={this.props.hideEdit}
                            hideDelete={this.props.hideDelete}
                            hidePadding={this.props.hidePadding} />
                    </Tab>
                </div>
            </div>
        );
    }
}