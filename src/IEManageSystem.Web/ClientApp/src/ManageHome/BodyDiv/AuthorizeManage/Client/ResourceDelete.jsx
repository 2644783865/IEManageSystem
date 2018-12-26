import React from 'react';
import ReactDOM from 'react-dom';

export default class ResourceDelete extends React.Component
{
	constructor(props){
		super(props);

    this.delete = this.delete.bind(this);
	}

	componentDidMount(){
    $("#dataDeleteBtn").click();
  }

  componentDidUpdate(){
    $("#dataDeleteBtn").click();
  }

  delete()
  {
    this.props.resourceUpdate(this.props.resource);
    $("#dataDeleteCloseBtn").click();
  }
	
	render(){
		return (
          <div>
            <button id="dataDeleteBtn" className="btn" data-toggle="modal" data-target="#dataDelete"  hidden="hidden"></button>
            <div className="modal fade data-delete" id="dataDelete">
              <div className="modal-dialog">
                <div className="modal-content">
             
                  <div className="modal-header">
                    <h4 className="modal-title">删除客户端</h4>
                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                  </div>
             
                  <div className="modal-body">
                    你正要删除 {this.props.resource.clientId} ，删除后无法恢复，确定删除吗？
                  </div>
             
                  <div className="modal-footer">
                    <span id="dataDeleteError" className="text-danger"></span>
                    <button type="button" className="btn btn-danger btn-sm" onClick={this.delete}>删除</button>
                    <button id="dataDeleteCloseBtn" type="button" className="btn btn-secondary" data-dismiss="modal">关闭</button>
                  </div>
             
                </div>
              </div>
            </div>
          </div>
		);
	}
}