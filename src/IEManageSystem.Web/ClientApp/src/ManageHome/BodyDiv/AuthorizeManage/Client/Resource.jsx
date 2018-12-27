import React from 'react';
import ReactDOM from 'react-dom';
import jquerylabelautyjs from 'jquery-labelauty.js';
import jquerylabelautycss from 'jquery-labelauty.css';
import ResourceDescribe from './ResourceDescribe.js';
import ResourceList from './ResourceList.jsx';
import Paging from './Paging.jsx';
import ResourceDelete from './ResourceDelete.jsx';
import AddResourceForm from './ResourceForm/AddResourceForm.jsx';
import LookupResourceForm from './ResourceForm/LookupResourceForm.jsx';
import EditResourceForm from './ResourceForm/EditResourceForm.jsx';

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
	// props.title
	// props.describes
	// props.freshenResources()
	// props.addResource()
	// props.updateResource()
	// props.deleteResource()
	// props.setResourceRef()
	constructor(props){
		super(props);

		this.props.setResourceRef(this);

        this.pageSize = 10;

        this.resourceDescribe = new ResourceDescribe(this.props.describes);

		this.state = 
		{
			resources:new Array(),
			resourceNum: 0,
			curResource: null,
			pageNum: 0,
			pageIndex: 1,
			operationState: operationState.none
		};

		this.pageIndexChange = this.pageIndexChange.bind(this);
		this.resourceOperationClick = this.resourceOperationClick.bind(this);
		this.resourceUpdate = this.resourceUpdate.bind(this);

		this.props.freshenResources(this.state.pageIndex, this.pageSize);
	}

	componentDidMount(){
	}

	componentDidUpdate(){
        this.state.operationState = operationState.none;
    }

    // 重载资源
    reloadResources(){
    	this.props.freshenResources(this.state.pageIndex, this.pageSize);
    }

	// 重新设置资源（由父组件调用）
	resetResources(resources, pageIndex)
	{
		this.setState({ resources:resources, pageIndex: pageIndex })
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
    
    // 页索引改变
	pageIndexChange(pageIndex)
	{
		if(pageIndex > 0 && pageIndex <= this.state.pageNum)
		{
			this.props.freshenResources(pageIndex, this.pageSize);
		}
	}

	// 操作按钮点击
	resourceOperationClick(operation, resource)
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
	resourceUpdate(operation, resource){
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
                    describes={ this.resourceDescribe.getDescribesOfList() }
                    resourceEditClick={ resource=>this.resourceOperationClick(operationState.edit, resource) }
                    resourceDeleteClick={ resource=>this.resourceOperationClick(operationState.delete, resource) }
                    resourceLookupClick={ resource=>this.resourceOperationClick(operationState.lookup, resource) }
                    />;

        let paging = <Paging 
                    resourceAddClick={ ()=>this.resourceOperationClick(operationState.add) } 
                    pageNum={ this.state.pageNum } 
                    pageIndex={ this.state.pageIndex } 
                    pageIndexChange={ this.pageIndexChange } />;

        return (
			<div className="row">
	            {resourceList}
	            {paging}
	            { this.state.operationState == operationState.add && 
	            	<AddResourceForm 
	            	title={ this.props.title }
	            	describes={ this.resourceDescribe.getDescribesOfAdd() }
	            	resource={ this.state.curResource } 
	            	resourceUpdate={resource=>this.resourceUpdate(operationState.add, resource)} /> }
	            { this.state.operationState == operationState.edit && 
	            	<EditResourceForm 
	            	title={ this.props.title }
	            	describes={ this.resourceDescribe.getDescribesOfEdit() }
	            	resource={ this.state.curResource } 
	            	resourceUpdate={resource=>this.resourceUpdate(operationState.edit, resource)} /> }
	            { this.state.operationState == operationState.lookup && 
	            	<LookupResourceForm 
	            	title={ this.props.title }
					describes={ this.resourceDescribe.describes }
	            	resource={ this.state.curResource } /> }
	            { this.state.operationState == operationState.delete && 
	            	<ResourceDelete 
	            	title={ this.props.title }
	            	nameDescribe={ this.resourceDescribe.nameDescribes }
	            	resource={ this.state.curResource } 
	            	resourceUpdate={resource=>this.resourceUpdate(operationState.delete, resource)} /> }
	        </div>
		);
	}
}