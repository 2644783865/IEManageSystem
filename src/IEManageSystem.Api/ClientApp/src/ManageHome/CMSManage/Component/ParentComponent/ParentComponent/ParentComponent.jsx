import React from 'react'
import PropTypes from 'prop-types'

import './ParentComponent.css'
import BaseParentComponent from '../BaseParentComponent.jsx'

import ComponentFactory from '../../Components/ComponentFactory'

import EditFrame from './EditFrame.jsx'

class ParentComponent extends BaseParentComponent {
    constructor(props) {
        super(props);

        this.state = {
            show: false
        }

        this.submit = this.submit.bind(this);
    }

    getComponentData(){
        return this.props.componentDatas.find(e=>e.sign==pageComponent.sign)
    }

    submit(resource){
        this.props.componentDataUpdate(resource);
        this.setState({show: false});
    }

    createChildrenComponent() 
    {
        let pageComponent = this.props.pageComponent;

        let component = new ComponentFactory().getComponentForName(pageComponent.name);
        let childrens = null;

        if (pageComponent.pageComponents) {
            childrens = pageComponent.pageComponents.map(item => (
                <ParentComponent
                    pageComponent={item}
                    componentDataUpdate={this.props.componentDataUpdate}
                    componentDatas={this.props.componentDatas}
                >
                </ParentComponent>)
            );
        }

        return (
            <component.component
                componentData={this.getComponentData()}
            >{childrens}</component.component>)
    }

    getTools()
    {
        let pageComponent = this.props.pageComponent;
        let component = new ComponentFactory().getComponentForName(pageComponent.name);
        if(component.component.isBaseContainerComponent){
            return;
        }

        let tools = [];
        tools.push(
            <EditFrame
                show={this.state.show}
                close={()=>{this.setState({show: false})}}
                submit={this.submit}
                pageComponent={pageComponent}
                componentData={this.getComponentData()}
            ></EditFrame>);
        tools.push(
            <div className="parentcomponent-btns">
                    <button type="button" class="btn btn-info btn-sm"
                        onClick={
                            () => { this.setState({ show: true }) }
                        }
                    >
                        <span class="oi oi-pencil" title="icon name" aria-hidden="true"></span>
                    </button>
                </div>
        );

        return tools;
    }

    render() 
    {
        return (
            <div style={this.getStyle()} className={`parentcomponent ${this.getClassName()}`}>
                <div className="w-100">
                    {this.createChildrenComponent()}
                </div>
                {this.getTools()}
            </div>
        );
    }
}

ParentComponent.propTypes = {
    pageComponent: PropTypes.object.isRequired,
    componentDataUpdate: PropTypes.func.isRequired,
    componentDatas: PropTypes.array
}

ParentComponent.defaultProps = {
};

export default ParentComponent;