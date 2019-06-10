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
                >
                </ParentComponent>)
            );
        }

        return (<component.component>{childrens}</component.component>)
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
    pageComponent: PropTypes.object.isRequired
}

ParentComponent.defaultProps = {
};

export default ParentComponent;