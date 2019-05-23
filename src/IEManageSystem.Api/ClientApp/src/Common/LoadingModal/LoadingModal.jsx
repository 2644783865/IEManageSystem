import React from 'react';
import { Animate } from 'react-move'
import { easeExpOut } from 'd3-ease'

import './LoadingModal.css';

// props.show bool
export default class LoadingModal extends React.Component {
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
            <div className="modal fade show" style={{opacity: `${x}`, display:this.props.show?"block":"none"}}>
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
            </div>
          )
        }}
      </Animate>
    )
  }
}