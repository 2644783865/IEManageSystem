import React from 'react';
import PropTypes from 'prop-types'
import ErrorModal from 'ErrorModal/ErrorModal.jsx';

import { connect } from 'react-redux'

class Error extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            show: false
        }
    }

    componentWillUpdate(props) {
        this.state.show = props.isSuccess == false ? true : false;
    }

    render() 
    {
        if(this.state.show == true){
            setTimeout(
                ()=>this.setState({
                    show: false
                }), 2000
            )
        }
            
        return (
            <ErrorModal
                show={this.state.show}
                title="发生了一个错误"
                message={this.props.error}
            />)
    }
}

Error.propTypes = {
    isSuccess: PropTypes.bool,
    error: PropTypes.string
}

const mapStateToProps = (state, ownProps) => { // ownProps为当前组件的props
    return {
        isSuccess: state.fecth.isSuccess,
        error: state.fecth.error
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
    }
}

const ErrorContain = connect(
    mapStateToProps, // 关于state
    mapDispatchToProps // 关于dispatch
)(Error)

export default ErrorContain