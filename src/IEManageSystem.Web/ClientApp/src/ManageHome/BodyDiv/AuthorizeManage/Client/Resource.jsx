import React from 'react';
import ReactDOM from 'react-dom';
import jquerylabelautyjs from 'jquery-labelauty.js';
import jquerylabelautycss from 'jquery-labelauty.css';
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
	constructor(props){
		super(props);

        this.pageSize = 10;

        this.pageIndex = 1;

		this.state = {
			curResource: null,
			resources: new Array(),
			resourceNum: 0,
			pageNum: 0,
			operationState: operationState.none
		};

		this.freshen = this.freshen.bind(this);

		this.pageIndexChange = this.pageIndexChange.bind(this);

        this.getResourceListBackcall = this.getResourceListBackcall.bind(this);
		this.getResourceList(this.pageIndex, this.pageSize);

        this.getResourceNumBackcall = this.getResourceNumBackcall.bind(this);
        this.getResourceNum();

		this.resourceEditClick = this.resourceEditClick.bind(this);
		this.resourceDeleteClick = this.resourceDeleteClick.bind(this);
		this.resourceAddClick = this.resourceAddClick.bind(this);
		this.resourceLookupClick = this.resourceLookupClick.bind(this);
	}

    componentDidUpdate(){
        this.state.operationState = operationState.none;
    }
	
	// 刷新整个Resource组件
	freshen(){
		this.getResourceList(this.pageIndex, this.pageSize);
		this.getResourceNum();

		this.setState({
			curResource: null,
			resources: new Array(),
			resourceNum: 0,
			pageNum: 0,
			operationState: operationState.none
		});
	}
    
    // 页索引改变
	pageIndexChange(pageIndex)
	{
        this.pageIndex = pageIndex;
		this.getResourceList(this.pageIndex, this.pageSize);
	}

	// 获取客户端列表回调
    getResourceListBackcall(data){
        if(data.isSuccess == true)
        {
            this.setState({ resources:data.value.clients });
        }
    }

    // 获取客户端列表
	getResourceList(pageIndex, pageSize){
		let postData = {
            pageIndex: pageIndex,
            pageSize: pageSize
        };

		$.ajax({
			url: "/api/ClientManage/GetClients",
            type: 'post',
            data: JSON.stringify(postData),
            contentType: 'application/json',
            dataType: 'json',
            success: this.getResourceListBackcall
		});
	}

	// 获取客户端数量回调
    getResourceNumBackcall(data){
        if(data.isSuccess == true)
        {
            let pageNum = parseInt(data.value.clientNum/this.pageSize);
            if((data.value.clientNum%this.pageSize) > 0){
                pageNum++;
            }
            this.setState({ 
                resourceNum:data.value.clientNum,
                pageNum:pageNum });
        }
    }

    // 获取客户端数量
    getResourceNum(){
        let postData = {
        };

        $.ajax({
            url: "/api/ClientManage/GetClientNum",
            type: 'post',
            data: JSON.stringify(postData),
            contentType: 'application/json',
            dataType: 'json',
            success: this.getResourceNumBackcall
        });
    }

	// 点击编辑按钮
	resourceEditClick(id)
	{
		let resources = this.state.resources;
		for(let item in resources){
			if(resources[item].id == id){
				this.setState({ 
					curResource:resources[item],
					operationState: operationState.edit
				});
				break;
			}
		}
	}

	// 点击删除按钮
	resourceDeleteClick(id)
	{
		let resources = this.state.resources;
		for(let item in resources){
			if(resources[item].id == id){
				this.setState({ 
					curResource:resources[item],
					operationState: operationState.delete
				});
				break;
			}
		}
	}

	// 点击添加按钮
	resourceAddClick(){
		this.setState({ 
			curResource:null,
			operationState: operationState.add
		});
	}

	//点击查看按钮
	resourceLookupClick(){
		let resources = this.state.resources;
		for(let item in resources){
			if(resources[item].id == id){
				this.setState({ 
					curResource:resources[item],
					operationState: operationState.lookup
				});
				break;
			}
		}
	}
	
	render()
	{
        let resourceList = <ResourceList 
                    resources={ this.state.resources } 
                    resourceEditClick={ this.resourceEditClick }
                    resourceDeleteClick={ this.resourceDeleteClick }
                    resourceLookupClick={ this.resourceLookupClick }
                    />;

        let paging = <Paging 
                    resourceAddClick={ this.resourceAddClick } 
                    pageNum={ this.state.pageNum } 
                    pageIndexChange={ this.pageIndexChange } />;

        return (
			<div className="row">
	            {resourceList}
	            {paging}
	            { this.state.operationState == operationState.add && <AddResourceForm resource={ this.state.curResource } freshen={this.freshen} /> }
	            { this.state.operationState == operationState.edit && <EditResourceForm resource={ this.state.curResource } freshen={this.freshen} /> }
	            { this.state.operationState == operationState.lookup && <LookupResourceForm resource={ this.state.curResource } freshen={this.freshen} /> }
	            { this.state.operationState == operationState.delete && <ResourceDelete resource={ this.state.curResource } freshen={this.freshen} /> }
	        </div>
		);
	}
}