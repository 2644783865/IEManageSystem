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
	// props.resources
	// props.resourceNum
	// props.isFreshenResources
	// props.freshenResources()
	// props.addResource()
	// props.updateResource()
	// props.deleteResource()
	constructor(props){
		super(props);

        this.pageSize = 10;

		this.state = {
			curResource: null,
			pageNum: 0,
			pageIndex: 1,
			operationState: operationState.none
		};

		this.pageIndexChange = this.pageIndexChange.bind(this);
		this.resourceOperationClick = this.resourceOperationClick.bind(this);
		this.resourceUpdate = this.resourceUpdate.bind(this);
	}

	componentWillMount(){
	    this.freshenState(this.props)
	}

    componentWillReceiveProps(nextProps){
	    this.freshenState(nextProps)
	}

	componentDidMount(){
		
	    // 如果外部需要刷新资源
        if(this.props.isFreshenResources === true){
        	this.props.freshenResources(this.state.pageIndex, this.pageSize);
        }
	}

	componentDidUpdate(){
        this.state.operationState = operationState.none;
		
		// 如果外部需要刷新资源
        if(this.props.isFreshenResources === true){
        	this.props.freshenResources(this.state.pageIndex, this.pageSize);
        }
    }

	freshenState(props)
	{
	    let pageNum = parseInt(props.resourceNum/this.pageSize);
        if((props.resourceNum%this.pageSize) > 0){
            pageNum++;
        }
        this.state.pageNum = pageNum;
	}
    
    // 页索引改变
	pageIndexChange(pageIndex)
	{
		if(pageIndex > 0 && pageIndex <= this.state.pageNum)
		{
			this.setState({pageIndex: pageIndex});
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
                    resources={ this.props.resources } 
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
	            	resource={ this.state.curResource } 
	            	resourceUpdate={resource=>this.resourceUpdate(operationState.add, resource)} /> }
	            { this.state.operationState == operationState.edit && 
	            	<EditResourceForm 
	            	resource={ this.state.curResource } 
	            	resourceUpdate={resource=>this.resourceUpdate(operationState.edit, resource)} /> }
	            { this.state.operationState == operationState.lookup && 
	            	<LookupResourceForm resource={ this.state.curResource } /> }
	            { this.state.operationState == operationState.delete && 
	            	<ResourceDelete 
	            	resource={ this.state.curResource } 
	            	resourceUpdate={resource=>this.resourceUpdate(operationState.delete, resource)} /> }
	        </div>
		);
	}
}