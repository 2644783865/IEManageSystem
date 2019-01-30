import 'labelauty';
import 'labelautycss';

import React from 'react';
import ReactDOM from 'react-dom';
import ResourceDescribe from './ResourceDescribe.js';
import ResourceList from './ResourceList.jsx';
import Paging from './Paging.jsx';
import ResourceDelete from './ResourceDelete.jsx';
import ResourceForm from './ResourceForm/ResourceForm.jsx';
import ErrorModal from 'Resource/ErrorModal.jsx';
import LoadingModal from 'Resource/LoadingModal/LoadingModal.jsx';

require("./Resource.css");

var operationState = {
	none: "none",
	add: "add",
	delete: "delete",
	edit: "edit",
	lookup: "lookup"
}


export default class Resource extends React.Component
{
	// props.title  标题
	// props.describes  资源描述
	// props.freshenResources()  刷新数据接口
	// props.addResource()  添加数据接口
	// props.updateResource()  更新数据接口
	// props.deleteResource()  删除数据接口
	// props.setResourceRef()  设置当前组件的引用
	// props.hideAdd = false
	// props.hideEdit = false
	// props.hideDelete = false
	// props.hidePadding = false
	constructor(props){
		super(props);

		this.props.setResourceRef(this);

        if(this.props.hidePadding == true){
        	this.pageSize = 999999;
        }

        this.pageIndex = 1;
        this.pageSize = 10;
        this.searchKey = "";

        this._resourceDescribe = new ResourceDescribe(this.props.describes);

		this.state = 
		{
			resources:new Array(),
			resourceNum: 0,
			curResource: null,
			pageNum: 0,
			operationState: operationState.none
		};

		this._pageIndexChange = this._pageIndexChange.bind(this);
		this._resourceOperationClick = this._resourceOperationClick.bind(this);
		this._resourceUpdate = this._resourceUpdate.bind(this);
		this._searchClick = this._searchClick.bind(this);

		this.props.freshenResources(this.pageIndex, this.pageSize);
	}

	componentDidMount(){
	}

	componentDidUpdate(){
        this.state.operationState = operationState.none;
    }

	// 重新设置资源（由父组件调用）
	resetResources(resources, pageIndex)
    {
        this.pageIndex = pageIndex;
        this.setState({ resources: resources });
	}

	// 重新设置资源数量（由父组件调用）
	resetResourceNum(resourceNum)
	{
		let pageNum = parseInt(resourceNum / this.pageSize);
        if((resourceNum % this.pageSize) > 0){
            pageNum++;
        }

		this.setState({
			resourceNum: resourceNum,
			pageNum: pageNum,
		})
	}

	showLoadingModal(){
		LoadingModal.showModal();
	}

	hideLoadingModal(){
		LoadingModal.hideModal();
	}

	showErrorModal(title, message){
		ErrorModal.showErrorModal(title, message);
	}

	// 搜索单击
	_searchClick(searchKey)
	{
		this.searchKey = searchKey;
		this.props.freshenResources(this.pageIndex, this.pageSize, this.searchKey);
    }
    
    // 页索引改变
	_pageIndexChange(pageIndex)
	{
		if(pageIndex > 0 && pageIndex <= this.state.pageNum)
		{
			this.props.freshenResources(pageIndex, this.pageSize, this.searchKey);
		}
	}

	// 操作按钮点击
	_resourceOperationClick(operation, resource)
	{
		this.setState({operationState: operation});

		if(resource != undefined){
			this.setState({curResource:resource});
		}
		else{
			this.setState({curResource:null});
		}
	}

	// 更新资源
	_resourceUpdate(operation, resource){
		if(operation == operationState.add){
			this.props.addResource(resource);
		}
		else if(operation == operationState.edit){
			this.props.updateResource(resource);
		}
		else if(operation == operationState.delete){
			this.props.deleteResource(resource);
		}
	}
	
	render()
	{
        let resourceList = <ResourceList 
        			title={ this.props.title }
                    resources={ this.state.resources } 
                    describes={ this._resourceDescribe.getDescribesOfList() }
                    searchClick={ this._searchClick }
                    resourceEditClick={ resource=>this._resourceOperationClick(operationState.edit, resource) }
                    resourceDeleteClick={ resource=>this._resourceOperationClick(operationState.delete, resource) }
                    resourceLookupClick={ resource=>this._resourceOperationClick(operationState.lookup, resource) }
                    hideEdit={this.props.hideEdit}
                    hideDelete={this.props.hideDelete}
                    />;

        let paging = <Paging 
                    resourceAddClick={ ()=>this._resourceOperationClick(operationState.add) } 
                    hideAdd={this.props.hideAdd}
                    hidePadding={this.props.hidePadding}
                    pageNum={ this.state.pageNum } 
                    pageIndex={ this.pageIndex } 
                    pageIndexChange={ this._pageIndexChange } />;

        return (
			<div className="w-100 h-100 d-flex flex-column">
				<ErrorModal />
                <LoadingModal />
	            {resourceList}
	            {paging}
	            { this.state.operationState == operationState.add && 
	            	<ResourceForm 
	            	title={ this.props.title }
	            	describes={ this._resourceDescribe.getDescribesOfAdd() }
	            	resource={ this.state.curResource } 
	            	resourceUpdate={resource=>this._resourceUpdate(operationState.add, resource)} /> }
	            { this.state.operationState == operationState.edit && 
	            	<ResourceForm 
	            	title={ this.props.title }
	            	describes={ this._resourceDescribe.getDescribesOfEdit() }
	            	resource={ this.state.curResource } 
	            	resourceUpdate={resource=>this._resourceUpdate(operationState.edit, resource)} /> }
	            { this.state.operationState == operationState.lookup && 
	            	<ResourceForm 
	            	title={ this.props.title }
	            	isHideSubmit={ true }
					describes={ this._resourceDescribe.getDescribesOfLookup() }
	            	resource={ this.state.curResource } /> }
	            { this.state.operationState == operationState.delete && 
	            	<ResourceDelete 
	            	title={ this.props.title }
	            	nameDescribe={ this._resourceDescribe.nameDescribes }
	            	resource={ this.state.curResource } 
	            	resourceUpdate={resource=>this._resourceUpdate(operationState.delete, resource)} /> }
	        </div>
		);
	}
}