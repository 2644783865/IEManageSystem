import React from 'react';
import ReactDOM from 'react-dom';
import jquerylabelautyjs from 'jquery-labelauty.js';
import jquerylabelautycss from 'jquery-labelauty.css';
import ClientList from './ClientList.jsx';
import Paging from './Paging.jsx';
import ClientDelete from './ClientDelete.jsx';
import AddClientForm from './ClientForm/AddClientForm.jsx';
import LookupClientForm from './ClientForm/LookupClientForm.jsx';
import EditClientForm from './ClientForm/EditClientForm.jsx';

require("./Client.css");

var operationState = {
	none: "none",
	add: "add",
	delete: "delete",
	edit: "edit",
	lookup: "lookup"
}


export default class Client extends React.Component
{
	constructor(props){
		super(props);

        this.pageSize = 10;

        this.pageIndex = 1;

		this.state = {
			curClient: null,
			clients: new Array(),
			clientNum: 0,
			pageNum: 0,
			operationState: operationState.none
		};

		this.freshen = this.freshen.bind(this);

		this.pageIndexChange = this.pageIndexChange.bind(this);

        this.getClientListBackcall = this.getClientListBackcall.bind(this);
		this.getClientList(this.pageIndex, this.pageSize);

        this.getClientNumBackcall = this.getClientNumBackcall.bind(this);
        this.getClientNum();

		this.clientEditClick = this.clientEditClick.bind(this);
		this.clientDeleteClick = this.clientDeleteClick.bind(this);
		this.clientAddClick = this.clientAddClick.bind(this);
		this.clientLookupClick = this.clientLookupClick.bind(this);
	}
	
	// 刷新整个Client组件
	freshen(){
		this.getClientList(this.pageIndex, this.pageSize);
		this.getClientNum();

		this.setState({
			curClient: null,
			clients: new Array(),
			clientNum: 0,
			pageNum: 0,
			operationState: operationState.none
		});
	}
    
    // 页索引改变
	pageIndexChange(pageIndex)
	{
        this.pageIndex = pageIndex;
		this.getClientList(this.pageIndex, this.pageSize);
	}

	// 获取客户端列表回调
    getClientListBackcall(data){
        if(data.isSuccess == true)
        {
            this.setState({ clients:data.value.clients });
        }
    }

    // 获取客户端列表
	getClientList(pageIndex, pageSize){
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
            success: this.getClientListBackcall
		});
	}

	// 获取客户端数量回调
    getClientNumBackcall(data){
        if(data.isSuccess == true)
        {
            let pageNum = parseInt(data.value.clientNum/this.pageSize);
            if((data.value.clientNum%this.pageSize) > 0){
                pageNum++;
            }
            this.setState({ 
                clientNum:data.value.clientNum,
                pageNum:pageNum });
        }
    }

    // 获取客户端数量
    getClientNum(){
        let postData = {
        };

        $.ajax({
            url: "/api/ClientManage/GetClientNum",
            type: 'post',
            data: JSON.stringify(postData),
            contentType: 'application/json',
            dataType: 'json',
            success: this.getClientNumBackcall
        });
    }

	// 点击编辑按钮
	clientEditClick(id)
	{
		let clients = this.state.clients;
		for(let item in clients){
			if(clients[item].id == id){
				this.setState({ 
					curClient:clients[item],
					operationState: operationState.edit
				});
				break;
			}
		}
	}

	// 点击删除按钮
	clientDeleteClick(id)
	{
		let clients = this.state.clients;
		for(let item in clients){
			if(clients[item].id == id){
				this.setState({ 
					curClient:clients[item],
					operationState: operationState.delete
				});
				break;
			}
		}
	}

	// 点击添加按钮
	clientAddClick(){
		let client = {};
		this.setState({ 
			curClient:client,
			operationState: operationState.add
		});
	}

	//点击查看按钮
	clientLookupClick(){
		let clients = this.state.clients;
		for(let item in clients){
			if(clients[item].id == id){
				this.setState({ 
					curClient:clients[item],
					operationState: operationState.lookup
				});
				break;
			}
		}
	}
	
	render()
	{
        let clientList = <ClientList 
                    clients={ this.state.clients } 
                    clientEditClick={ this.clientEditClick }
                    clientDeleteClick={ this.clientDeleteClick }
                    clientLookupClick={ this.clientLookupClick }
                    />;

        let paging = <Paging 
                    clientAddClick={ this.clientAddClick } 
                    pageNum={ this.state.pageNum } 
                    pageIndexChange={ this.pageIndexChange } />;

        return (
			<div className="row">
	            {clientList}
	            {paging}
	            { this.state.operationState == operationState.add && <AddClientForm client={ this.state.curClient } freshen={this.freshen} /> }
	            { this.state.operationState == operationState.edit && <EditClientForm client={ this.state.curClient } freshen={this.freshen} /> }
	            { this.state.operationState == operationState.lookup && <LookupClientForm client={ this.state.curClient } freshen={this.freshen} /> }
	            { this.state.operationState == operationState.delete && <ClientDelete client={ this.state.curClient } freshen={this.freshen} /> }
	        </div>
		);
	}
}