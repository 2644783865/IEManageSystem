import React from 'react'
import BaseComponent from '../BaseComponent.jsx'

import './Container.css'

class Container extends React.Component
{
    constructor(props){
        super(props);
    }

    render(){
        return (<BaseComponent col={this.props.col} className="containercss">{ this.props.children }</BaseComponent>);
    }
}

BaseComponent.defaultProps = {
    col: 3
};

export default Container;