import React from 'react';
import ReactDOM from 'react-dom';

export default class ClientList extends React.Component
{
	constructor(props){
		super(props);
	}
	
	render(){
        let clients = this.props.clients;

        let clientTrs = new Array();
        for(let item in clients){
            let clientTr = 
                        <tr>
                            <td>{ clients[item].clientId  }</td>
                            <td>{ clients[item].allowedGrantType  }</td>
                            <td>{ clients[item].accessTokenType  }</td>
                            <td>{ clients[item].enabled   }</td>
                            <td>
                                <div className="btn-group btn-group-sm">
                                    <button type="button" className="btn btn-primary" 
                                        onClick={()=>this.props.clientEditClick(clients[item].id)}>编辑</button>
                                    <button type="button" className="btn btn-danger"
                                        onClick={()=>this.props.clientDeleteClick(clients[item].id)}>删除</button>
                                </div>
                            </td>
                        </tr>;

            clientTrs.push(clientTr);
        }

		return (
		    <div className="data-list w-100">
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Search" />
                    <div className="input-group-append">
                      <button className="btn btn-info" type="submit">搜索一下</button>  
                    </div>
                </div>
                <h5>客户端列表</h5>
                <table className="table table-hover table-dark table-striped text-white">
                    <thead>
                        <tr>
                            <th>客户端Id</th>
                            <th>认证类型</th>
                            <th>Token类型</th>
                            <th>启用状态</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        { clientTrs }
                    </tbody>
                </table>
            </div>
		);
	}
}