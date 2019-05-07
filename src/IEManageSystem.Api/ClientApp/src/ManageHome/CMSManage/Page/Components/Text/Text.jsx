import React from 'react'
import PropTypes from 'prop-types'
import BaseComponent from '../BaseComponent/BaseComponent.jsx'

class Text extends BaseComponent
{
    static preview(){
        return (<p>文本框</p>);
    }

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