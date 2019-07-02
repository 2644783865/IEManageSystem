import React from 'react';
import Modal from 'Modal/Modal.jsx'

import './ErrorModal.css'

export default class ErrorModal extends React.Component {
  // props.show bool
  // props.title
  // props.message
  // props.close    fun
  constructor(props) {
    super(props);
  }

  render() {
    return (<Modal
      show={this.props.show}
    >
      <div className="modal-dialog errormodal">
                <div className="modal-content">

                  <div className="modal-header">
                    <h5 className="modal-title">{this.props.title}</h5>
                    <button type="button" class="close text-white" onClick={
                      ()=>this.props.close()
                    }>&times;</button>
                  </div>

                  <div className="modal-body">
                    {this.props.message}
                  </div>

                </div>
              </div>
    </Modal>);
  }
}