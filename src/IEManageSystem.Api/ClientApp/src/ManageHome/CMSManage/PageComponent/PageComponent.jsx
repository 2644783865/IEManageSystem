import React from 'react'
import { Animate } from 'react-move'
import { easeExpOut } from 'd3-ease'

import './PageComponent.css'

import PageContainer from './PageContainer/PageContainer.jsx'
import ComponentTool from './ComponentTool/ComponentTool.jsx'

export default class PageComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: true,
        }
    }

    render() {
        return (<div className="pagecomponent">
            <Animate
                start={() => ({
                    x: 17,
                })}

                update={() => ({
                    x: [this.state.open ? 17 : 3],
                    timing: { duration: 750, ease: easeExpOut },
                })}
            >
                {(state) => {
                    const { x } = state

                    return (
                        <div className="pagecomponent-left" style={{
                            width: `${x}%`
                        }}>
                            <button className="btn btn-info btn-block pagecomponent-left-btn"
                                onClick={() => {
                                    this.setState({ open: !this.state.open });
                                }}
                            >
                                <span class="oi oi-arrow-thick-left float-left" title="icon name" aria-hidden="true"
                                    style={{
                                        display: x > 4 ? "inline": "none"
                                    }}
                                ></span>
                                <span class="oi oi-arrow-thick-right float-right" title="icon name" aria-hidden="true"></span>
                            </button>
                            <div class="pagecomponent-left-toolcontain"
                                style={{
                                    width: `${100*(x-3)/14}%`
                                }}
                            >
                                <ComponentTool />
                            </div>
                        </div>
                    )
                }}
            </Animate>
            <div className="pagecomponent-right">
                <PageContainer pageName={this.props.match.params.pageName} />
            </div>
        </div>);
    }
}