import React from 'react';
import ReactDOM from 'react-dom';

export default class ConfirmBox extends React.Component
{
  // props.title
  // props.text
  // props.backcall()
	constructor(props){
		super(props);
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
    $("#confirmBox").addClass("show");
    $("#confirmBox").show(500);
  }

  hideModal(){
    $("body").removeClass("modal-open");
    $("div.modal-backdrop").remove();
    $("#confirmBox").removeClass("show");
    $("#confirmBox").hide(500);
  }
	
	render(){
		return (
          <div>
            <div className="modal fade data-delete" id="confirmBox">
              <div className="modal-dialog">
                <div className="modal-content">
             
                  <div className="modal-header bg-info text-white">
                    <h4 className="modal-title">{this.props.title}</h4>
                    <button type="button" className="close" data-dismiss="modal" onClick={this.hideModal}>&times;</button>
                  </div>
             
                  <div className="modal-body">
                    {this.props.text}
                  </div>
             
                  <div className="modal-footer">
                    <span id="dataDeleteError" className="text-danger"></span>
                    <button type="button" className="btn btn-danger btn-sm" onClick={()=>{ this.hideModal(); this.props.backcall();}}>确认</button>
                    <button id="dataDeleteCloseBtn" type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.hideModal}>关闭</button>
                  </div>
             
                </div>
              </div>
            </div>
          </div>
		);
	}
}