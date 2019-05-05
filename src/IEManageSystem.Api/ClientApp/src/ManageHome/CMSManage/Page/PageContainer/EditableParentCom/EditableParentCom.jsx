import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import './EditableParentCom.css'

import EditFrame from './EditFrame.jsx'

import ComponentFactory from '../../Components/ComponentFactory'
import { newPageRemoveComponent, newPageEditComponent } from '../../../Actions'

class EditableParentCom extends React.Component
{
    constructor(props){
        super(props);

        this.state = {
            openEdit: false
        }

        this.createChildrenComponent = this.createChildrenComponent.bind(this);
        this.removeComponent = this.removeComponent.bind(this);
        this.editComponent = this.editComponent.bind(this);
        this.removeChildComponent = this.removeChildComponent.bind(this);
        this.editChildComponent = this.editChildComponent.bind(this);
        this.addChildComponent = this.addChildComponent.bind(this);
    }

    componentDidUpdate(){
        this.state.openEdit = false;
    }

    createChildrenComponent(pageComponent)
    {
        let component = new ComponentFactory().getComponentForName(pageComponent.name);
        let childrens = null;

        if(pageComponent.childPageComponent){
            childrens = pageComponent.childPageComponent.map(item => (
            <EditableParentCom
                pageComponent={item}
                removeComponent={this.removeChildComponent}
                editComponent={this.editChildComponent}
            >
            </EditableParentCom>)
            );
        }

        return (<component.component>{childrens}</component.component>)
    }

    removeComponent(pageComponent){
        this.props.removeComponent(pageComponent)
    }

    removeChildComponent(pageComponent){
        this.props.pageComponent.childPageComponent = 
        this.props.pageComponent.childPageComponent.filter(item => item.sign != pageComponent.sign);

        this.editComponent(this.props.pageComponent);
    }

    editComponent(pageComponent){
        this.props.editComponent(pageComponent)
    }

    editChildComponent(pageComponent){
        this.props.pageComponent.childPageComponent = 
        this.props.pageComponent.childPageComponent.map(item => {
            if(item.sign == action.pageComponent.sign){
                return pageComponent;
            }
            return item;
        })

        this.editComponent(this.props.pageComponent);
    }

    addChildComponent()
    {
        this.props.pageComponent.childPageComponent = this.props.pageComponent.childPageComponent || [];

        var timetamp = Number(new Date());
        while(true){
            if(!this.props.pageComponent.childPageComponent.some(item=> item.sign === timetamp))
            {
                break;
            }

            timetamp = Number(new Date());
        }
                                
        let pageComponent = { sign:timetamp, name:this.props.selectedComponent };
        this.props.pageComponent.childPageComponent.push(pageComponent);

        this.editComponent(this.props.pageComponent);
    }

    render(){
        let pageComponent = this.props.pageComponent;

        this.style = {
            height: `${this.props.pageComponent.height || 9}rem`
        }

        let component = new ComponentFactory().getComponentForName(pageComponent.name);

        return (
            <div style={this.style} className={`editableparentcom col-md-${ pageComponent.col || 12 }`}>
                <div className="editableparentcom-btns">
                    <button type="button" class="btn btn-danger btn-sm"
                        onClick={
                            ()=>{this.removeComponent(pageComponent)}
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
                    {
                    component.component.isBaseContainerComponent &&
                    <button type="button" class="btn btn-success btn-sm"
                        onClick={
                            ()=>{this.addChildComponent()}
                        }
                    >
                        <span class="oi oi-plus" title="icon name" aria-hidden="true"></span>
                    </button>}
                </div>
                { this.state.openEdit && <EditFrame pageComponent={pageComponent} editComponent={this.editComponent}></EditFrame> }
                { this.createChildrenComponent(pageComponent) }
            </div>
        );
    }
}

EditableParentCom.propTypes = {
    selectedComponent: PropTypes.string.isRequired,
    pageComponent: PropTypes.object.isRequired,
    removeComponent: PropTypes.func.isRequired,
    editComponent: PropTypes.func.isRequired
}

EditableParentCom.defaultProps = {
};

const mapStateToProps = (state, ownProps) => { // ownProps为当前组件的props
    return {
        selectedComponent: state.page.newPageSelectedComponent
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        removeComponent: (pageComponent)=>{
            dispatch(newPageRemoveComponent(pageComponent));
        },
        editComponent: (pageComponent)=>{
            dispatch(newPageEditComponent(pageComponent));
        }
    }
}

const EditableParentComContain = connect(
    mapStateToProps, // 关于state
    mapDispatchToProps,
    undefined,
    {pure:false}
)(EditableParentCom)

export default EditableParentComContain;