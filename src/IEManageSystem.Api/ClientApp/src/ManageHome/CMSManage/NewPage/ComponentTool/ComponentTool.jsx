import React from 'react'
import PropTypes from 'prop-types'

import { newPageSelectComponent } from '../../Actions'
import { connect } from 'react-redux';

import './ComponentTool.css'

import ComponentFrame from './ComponentFrame.jsx'

import ComponentFactory from '../Components/ComponentFactory'

class ComponentTool extends React.Component{
    render(){
        return (<div className="component-tool">
            <div>
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
                    {item.component.preview()}
                </ComponentFrame>
                )
            }
            </div>
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
        selectedComponent: state.cms.newPageSelectedComponent
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        selectComponent: (componentName) => { dispatch(newPageSelectComponent(componentName)) }
    }
}

const ComponentToolContain = connect(
    mapStateToProps, // 关于state
    mapDispatchToProps // 关于dispatch
)(ComponentTool)

export default ComponentToolContain;