import React from 'react'
import PropTypes from 'prop-types'

import { selectComponent } from '../../Actions'
import { connect } from 'react-redux';

import './ComponentTool.css'

import ComponentFrame from './ComponentFrame.jsx'

import ComponentFactory from '../Components/ComponentFactory'

class ComponentTool extends React.Component{
    render(){
        return (<div className="component-tool col-md-2">
            {new ComponentFactory().getComponents()
                .map(item => 
                <ComponentFrame 
                    active={ this.props.selectedComponent == item.name }
                    componentOnClick={
                        ()=>{
                            this.props.selectComponent(item.name);
                        }
                    }
                >
                    <item.component col={12} />
                </ComponentFrame>
                )
            }
        </div>);
    }
}

ComponentTool.propTypes = {
    selectedComponent: PropTypes.object,
    selectComponent: PropTypes.func.isRequired
}

ComponentTool.defaultProps = {
    selectedComponent: {}
}

const mapStateToProps = (state, ownProps) => { // ownProps为当前组件的props
    return {
        selectedComponent: state.page.selectedComponent
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        selectComponent: (componentName) => { dispatch(selectComponent(componentName)) }
    }
}

const ComponentToolContain = connect(
    mapStateToProps, // 关于state
    mapDispatchToProps // 关于dispatch
)(ComponentTool)

export default ComponentToolContain;