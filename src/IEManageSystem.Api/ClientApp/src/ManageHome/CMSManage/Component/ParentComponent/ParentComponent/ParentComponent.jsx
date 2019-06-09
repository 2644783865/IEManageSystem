import React from 'react'
import PropTypes from 'prop-types'

import './ParentComponent.css'
import BaseParentComponent from '../BaseParentComponent.jsx'

import ComponentFactory from '../../Components/ComponentFactory'

class ParentComponent extends BaseParentComponent {
    constructor(props) {
        super(props);
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

    render() 
    {
        return (
            <div style={this.getStyle()} className={`parentcomponent ${this.getClassName()}`}>
                <div className="w-100">
                    {this.createChildrenComponent()}
                </div>
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