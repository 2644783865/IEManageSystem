import React from 'react'
import PropTypes from 'prop-types'
import BaseComponent from '../BaseComponent/BaseComponent.jsx'

class Text extends BaseComponent
{
    constructor(props){
        super(props);
    }

    render(){
        return (<p>这是一段文本</p>);
    }
}

BaseComponent.defaultProps = {
    col: 3
};

export default Text;