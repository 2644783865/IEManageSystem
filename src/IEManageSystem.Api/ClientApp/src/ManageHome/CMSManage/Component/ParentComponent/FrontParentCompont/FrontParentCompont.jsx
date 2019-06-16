import React from 'react'
import PropTypes from 'prop-types'

import './FrontParentCompont.css'
import BaseParentComponent from '../BaseParentComponent.jsx'

import ComponentFactory from '../../Components/ComponentFactory'

class FrontParentCompont extends BaseParentComponent {
    constructor(props) {
        super(props);

        this.state = {
            show: false
        }
    }

    getComponentData(){
        return this.props.componentDatas.find(e=>e.sign==this.props.pageComponent.sign)
    }

    createChildrenComponent() 
    {
        let pageComponent = this.props.pageComponent;

        let component = new ComponentFactory().getComponentForName(pageComponent.name);
        let childrens = null;

        if (pageComponent.pageComponents) {
            childrens = pageComponent.pageComponents.map(item => (
                <FrontParentCompont
                    pageComponent={item}
                    componentDatas={this.props.componentDatas}
                >
                </FrontParentCompont>)
            );
        }

        return (
            <component.component
                componentData={this.getComponentData()}
            >{childrens}</component.component>)
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

FrontParentCompont.propTypes = {
    pageComponent: PropTypes.object.isRequired,
    componentDatas: PropTypes.array
}

FrontParentCompont.defaultProps = {
};

export default FrontParentCompont;