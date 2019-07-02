import React, { PureComponent } from 'react'
import { Animate } from 'react-move'
import { easeExpOut } from 'd3-ease'

const trackStyles = {
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    position: 'relative',
    margin: '5px 3px 10px',
    width: 250,
    height: 50,
}

class Example extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
        }

        this.handleClick = () => {
            this.setState({ open: !this.state.open })
        }
    }

    render() {
        return (
            <div>
                <button
                    onClick={this.handleClick}
                >
                    Toggle
                </button>
                <Animate
                    start={() => ({
                        x: 0,
                    })}

                    update={() => ({
                        x: [this.state.open ? 200 : 0],
                        timing: { duration: 750, ease: easeExpOut },
                    })}
                >
                    {(state) => {
                        const { x } = state

                        console.log(x);

                        return (
                            <div style={trackStyles}>
                                <div
                                    style={{
                                        position: 'absolute',
                                        width: x,
                                        height: 50,
                                        borderRadius: 4,
                                        opacity: 0.7,
                                        backgroundColor: '#ff69b4'
                                    }}
                                />
                            </div>
                        )
                    }}
                </Animate>
            </div>
        )
    }
}

export default Example