import React from 'react'
import PropTypes from 'prop-types'

export default class BaseComponent extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (<div className={this.props.className + ` col-md-${ this.props.col }`}>{ this.props.children }</div>);
    }
}

BaseComponent.propTypes = {
    className: PropTypes.string,
    col: PropTypes.number
}

BaseComponent.defaultProps = {
    className: "",
    col: 12
};