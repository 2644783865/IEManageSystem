import React from 'react';
import Modal from 'Modal/Modal.jsx'

import './LoadingModal.css';

// props.show bool
export default class LoadingModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<Modal
      show={this.props.show}
    >
      <div className="modal-dialog">
                <div className="modal-content background-transparent">
                  <div className="modal-body d-flex justify-content-center">
                    <div className="loading-animation">
                      <span className="oi oi-aperture" title="icon name" aria-hidden="true"></span>
                    </div>
                    <span className="loading-animation-text">
                      正在努力加载中。。。
                    </span>
                  </div>

                </div>
              </div>
    </Modal>);
  }
}