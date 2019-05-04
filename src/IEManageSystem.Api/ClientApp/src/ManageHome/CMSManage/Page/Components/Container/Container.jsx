import React from 'react'
import BaseComponent from '../BaseComponent/BaseComponent.jsx'

import './Container.css'

class Container extends BaseComponent
{
    constructor(props){
        super(props);
    }

    render(){
        return (<div className="containercss"></div>);
    }
}

BaseComponent.defaultProps = {
    col: 3
};

export default Container;