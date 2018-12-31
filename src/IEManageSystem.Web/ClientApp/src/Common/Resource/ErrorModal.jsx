import React from 'react';
import ReactDOM from 'react-dom';

export default class ErrorModal extends React.Component
{
	constructor(props){
		super(props);
	}

  static showErrorModal(title, message){
    $("#ResourceErrorBtn").click();
    $("#ResourceErrorTitle").text(title);
    $("#ResourceErrorText").text(message);
    // setTimeout('$("#ResourceErrorText").text("")',3000);
  }
	
	render(){
		return (
          <div>
            <button id="ResourceErrorBtn" className="btn" data-toggle="modal" data-target="#ResourceError"  hidden="hidden"></button>
            <div className="modal fade data-delete" id="ResourceError">
              <div className="modal-dialog">
                <div className="modal-content">
             
                  <div className="modal-header">
                    <h4 id="ResourceErrorTitle" className="modal-title"></h4>
                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                  </div>
             
                  <div id="ResourceErrorText" className="modal-body">
                    
                  </div>
             
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">关闭</button>
                  </div>
             
                </div>
              </div>
            </div>
          </div>
		);
	}
}