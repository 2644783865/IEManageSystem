import React from 'react';
import { Animate } from 'react-move'
import { easeExpOut } from 'd3-ease'

import './ErrorModal.css'

export default class ErrorModal extends React.Component {
  // props.show bool
  // props.title
  // props.message
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Animate
        start={() => ({
          x: 0,
        })}

        update={() => ({
          x: [this.props.show ? 1 : 0],
          timing: { duration: 750, ease: easeExpOut },
        })}
      >
        {(state) => {
          const { x } = state;

          return (
            <div className="modal fade errormodal" style={{ opacity: `${x}`, display: x!=0 ? "block" : "none" }}>
              <div className="modal-dialog">
                <div className="modal-content">

                  <div className="modal-header">
                    <h4 className="modal-title">{this.props.title}</h4>
                  </div>

                  <div className="modal-body">
                    {this.props.message}
                  </div>

                </div>
              </div>
            </div>
          )
        }}
      </Animate>
    )
  }
}