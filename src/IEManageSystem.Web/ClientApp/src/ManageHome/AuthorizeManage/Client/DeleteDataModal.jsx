import React from 'react';
import ReactDOM from 'react-dom';

export default class DeleteDataModal extends React.Component
{
	constructor(props){
		super(props);
	}	
	
	render(){
		return (
			<div class="modal fade" id="deleteData">
			  <div class="modal-dialog">
			    <div class="modal-content">
			 
			      <div class="modal-header">
			        <h4 class="modal-title">确认删除？</h4>
			        <button type="button" class="close" data-dismiss="modal">&times;</button>
			      </div>

			      <div class="modal-body">
			        <div id="deleteDataError" class="text-danger error"></div>
			        你正在删除[<span id="deleteClientId"></span>]
			      </div>
			 
			      <div class="modal-footer">
			        <button id="deleteDataDelete" data-resourceId="" type="button" class="btn btn-danger" onclick="deleteResourceData()">删除</button>
			        <button id="deleteDataClose" type="button" class="btn btn-secondary" data-dismiss="modal">关闭</button>
			      </div>
			 
			    </div>
			  </div>
			</div>
		);
	}
}