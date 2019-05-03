import React from 'react'
import PropTypes from 'prop-types'
import BaseComponent from '../BaseComponent.jsx'

class Text extends React.Component
{
    constructor(props){
        super(props);
    }

    render(){
        return (<BaseComponent col={this.props.col}><p>这是一段文本</p></BaseComponent>);
    }
}

BaseComponent.defaultProps = {
    col: 3
};

export default Text;