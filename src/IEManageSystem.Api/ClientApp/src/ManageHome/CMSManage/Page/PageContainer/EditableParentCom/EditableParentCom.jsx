import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import './EditableParentCom.css'

import EditFrame from './EditFrame.jsx'

import ComponentFactory from '../../Components/ComponentFactory'
import { newPageRemoveComponent } from '../../../Actions'

class EditableParentCom extends React.Component
{
    constructor(props){
        super(props);

        this.state = {
            openEdit: false
        }
    }

    componentDidUpdate(){
        this.state.openEdit = false;
    }

    render(){
        let pageComponent = this.props.pageComponent;

        let children = new ComponentFactory().getComponentForName(pageComponent.name);

        return (
            <div className={`col-md-${ pageComponent.col || 12 }`}>
                <div className="editableparentcom-btns">
                    <button type="button" class="btn btn-danger btn-sm"
                        onClick={
                            ()=>{this.props.removeComponent(pageComponent)}
                        }
                    >
                        <span class="oi oi-trash" title="icon name" aria-hidden="true"></span>
                    </button>
                    <button type="button" class="btn btn-info btn-sm"
                        onClick={
                            ()=>{ this.setState({ openEdit:true }) }
                        }
                    >
                        <span class="oi oi-pencil" title="icon name" aria-hidden="true"></span>
                    </button>
                </div>
                { this.state.openEdit && <EditFrame></EditFrame> }
                <children.component />
            </div>
        );
    }
}

EditableParentCom.propTypes = {
    pageComponent: PropTypes.object.isRequired,
    removeComponent: PropTypes.func.isRequired
}

EditableParentCom.defaultProps = {
};

const mapStateToProps = (state, ownProps) => { // ownProps为当前组件的props
    return {
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        removeComponent: (pageComponent)=>{
            dispatch(newPageRemoveComponent(pageComponent));
        }
    }
}

const EditableParentComContain = connect(
    mapStateToProps, // 关于state
    mapDispatchToProps // 关于dispatch
)(EditableParentCom)

export default EditableParentComContain;