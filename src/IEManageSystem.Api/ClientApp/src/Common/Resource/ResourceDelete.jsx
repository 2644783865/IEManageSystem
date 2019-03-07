import React from 'react';
import ReactDOM from 'react-dom';

export default class ResourceDelete extends React.Component
{
  // props.title
  // props.resource
  // props.nameDescribe
  // props.resourceUpdate()
	constructor(props){
		super(props);

    this.delete = this.delete.bind(this);
	}

	componentDidMount(){
    this.showModal();
  }

  componentDidUpdate(){
    this.showModal();
  }

  showModal(){
    $("body").addClass("modal-open");
    $("body").append('<div class="modal-backdrop fade show"></div>');
    $("#dataDelete").addClass("show");
    $("#dataDelete").show(500);
  }

  hideModal(){
    $("body").removeClass("modal-open");
    $("div.modal-backdrop").remove();
    $("#dataDelete").removeClass("show");
    $("#dataDelete").hide(500);
  }

  delete()
  {
    this.hideModal();
    this.props.resourceUpdate(this.props.resource);
  }
	
	render(){
		return (
          <div>
            <div className="modal fade data-delete" id="dataDelete">
              <div className="modal-dialog">
                <div className="modal-content">
             
                  <div className="modal-header bg-info text-white">
                    <h4 className="modal-title">删除 {this.props.title}</h4>
                    <button type="button" className="close" data-dismiss="modal" onClick={this.hideModal}>&times;</button>
                  </div>
             
                  <div className="modal-body">
                    你正要删除 {this.props.resource[this.props.nameDescribe.name]} ，确定删除吗？
                  </div>
             
                  <div className="modal-footer">
                    <span id="dataDeleteError" className="text-danger"></span>
                    <button type="button" className="btn btn-danger btn-sm" onClick={this.delete}>删除</button>
                    <button id="dataDeleteCloseBtn" type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.hideModal}>关闭</button>
                  </div>
             
                </div>
              </div>
            </div>
          </div>
		);
	}
}