import React from 'react';
import ReactDOM from 'react-dom';

export default class ClientList extends React.Component
{
	constructor(props){
		super(props);
	}
	
	render(){
		return (
			<div class="d-flex flex-column h-100">
			  <table class="table table-hover resource">
			      <thead class="thead-dark">
			        <tr>
			          <th>客户端Id</th>
			          <th>认证类型</th>
			          <th>客户端域</th>
			          <th>登录重定向地址</th>
			          <th>退出登录重定向地址</th>
			          <th>允许离线共享</th>
			          <th>操作</th>
			        </tr>
			      </thead>
			      <tbody id="datadiv" data-element="dataElement" data-iP="true" data-iL="true">
			        <tr data-element="dataElement" data-n="id" data-resourceId="">
			          <td name="clientId" data-element="dataElement" data-n="clientId"></td>
			          <td data-element="dataElement" data-n="allowedGrantTypesString"></td>
			          <td data-element="dataElement" data-n="allowedScopesString"></td>
			          <td data-element="dataElement" data-n="redirectUrisString"></td>
			          <td data-element="dataElement" data-n="postLogoutRedirectUrisString"></td>
			          <td data-element="dataElement" data-n="allowOfflineAccess"></td>
			          <td>
			            <button type="button" class="btn btn-info" data-toggle="modal" data-target="#resourceData" onclick="updateHandle(this)">修改</button>
			            <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#deleteData" onclick="deleteHandle(this)">删除</button>
			          </td>
			        </tr>
			      </tbody>
			  </table>
			  <div class="w-100 d-flex justify-content-between">
			    <div>
			      <ul class="pagination">
			        <li id="resourcePre" class="page-item"><a class="page-link" href="#" onclick="preClick()">上一页</a></li>
			        <li id="resourceNext" class="page-item"><a class="page-link" href="#" onclick="nextClick()">下一页</a></li>
			      </ul>
			    </div>
			    <div class="">
			      <button type="button" class="btn btn-success" data-toggle="modal" data-target="#resourceData" onclick="addHandle()">+添加数据</button>
			    </div>
			  </div>
			</div>
		);
	}
}