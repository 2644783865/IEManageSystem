import React from 'react';
import { Animate } from 'react-move'
import { easeExpOut } from 'd3-ease'

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
            </div>
          )
        }}
      </Animate>
    )
  }
}