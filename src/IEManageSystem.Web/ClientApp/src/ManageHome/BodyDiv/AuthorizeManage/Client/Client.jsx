import React from 'react';
import ReactDOM from 'react-dom';
import Resource from './Resource.jsx';
import ErrorModal from './ErrorModal.jsx';

export default class Client extends React.Component
{
	constructor(props){
		super(props);

		this.state = {
			resources: new Array(),
			resourceNum: 0,
			isFreshenResources: true
		};

		this.getResourceListBackcall = this.getResourceListBackcall.bind(this);

        this.getResourceNumBackcall = this.getResourceNumBackcall.bind(this);

        this.submitBackcall = this.submitBackcall.bind(this);
    	this.addResource = this.addResource.bind(this);
    	this.updateResource = this.updateResource.bind(this);
    	this.deleteResource = this.deleteResource.bind(this);
    	this.freshenResources = this.freshenResources.bind(this);
	}

	componentDidUpdate(){
        this.state.isFreshenResources = false;
    }

	// 提交回调
	submitBackcall(data){
	    if(data.isSuccess == true)
	    {
	    	this.setState({isFreshenResources: true});
	    }
	    else{
	      	ErrorModal.showErrorModal("提交表单错误", data.message);
	    }
	}

	//
	addResource(resource){
		let postData = resource;

	    $.ajax({
	      url: "/api/ClientManage/AddClient",
	      type: 'post',
	      data: JSON.stringify(postData),
	      contentType: 'application/json',
	      dataType: 'json',
	      success: this.submitBackcall
	    });
	}

	//
	updateResource(resource){
		let postData = resource;

	    $.ajax({
	      url: "/api/ClientManage/UpdateClient",
	      type: 'post',
	      data: JSON.stringify(postData),
	      contentType: 'application/json',
	      dataType: 'json',
	      success: this.submitBackcall
	    });
	}

	//
	deleteResource(resource){
		let postData = {
	      id: resource.id
	    };

	    $.ajax({
	      url: "/api/ClientManage/RemoveClient",
	      type: 'post',
	      data: JSON.stringify(postData),
	      contentType: 'application/json',
	      dataType: 'json',
	      success: this.submitBackcall
	    });
	}

	// 刷新
	freshenResources(pageIndex, pageSize){
		this.getResourceList(pageIndex, pageSize);
		this.getResourceNum();
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
            this.setState({ 
                resourceNum:data.value.clientNum});
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

	render(){
		return(
			<div>
				<Resource
				resources={this.state.resources}
				resourceNum={this.state.resourceNum}
				isFreshenResources={this.state.isFreshenResources}
				freshenResources={this.freshenResources}
				addResource={this.addResource}
				updateResource={this.updateResource}
				deleteResource={this.deleteResource} />
				<ErrorModal />
			</div>
		);
	}
}