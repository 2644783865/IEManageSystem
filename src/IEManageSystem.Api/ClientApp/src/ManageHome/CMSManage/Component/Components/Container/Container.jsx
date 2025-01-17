import React from 'react'
import BaseContainerComponent from '../BaseComponent/BaseContainerComponent.jsx'

import './Container.css'

class Container extends BaseContainerComponent
{
    static preview(){
        return (<p>容器组件</p>);
    }

    constructor(props){
        super(props);
    }

    render(){
        return (<div className="containercss">{this.props.children}</div>);
    }
}

Container.defaultProps = {
    col: 3
};

export default Container;