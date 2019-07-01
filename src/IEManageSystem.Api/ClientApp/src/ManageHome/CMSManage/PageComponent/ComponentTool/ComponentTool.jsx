import React from 'react'
import PropTypes from 'prop-types'

import { newPageSelectComponent } from 'CMSManage/Actions'
import { CmsRedux } from 'CMSManage/CmsRedux'

import './ComponentTool.css'

import ComponentFrame from './ComponentFrame.jsx'
import ComponentFactory, { componentType, componentTypes } from 'CMSManage/Component/Components/ComponentFactory'

class ComponentTool extends React.Component 
{
    constructor(props){
        super(props);

        this.state = {
            activeIndex: 0
        }
    }

    createComponent(item)
    {
        return (<a href="javascript:void(0)">
        <ComponentFrame
            active={this.props.selectedComponent.name == item.name}
            componentOnClick={
                () => {
                    this.props.selectComponent(item);
                }
            }
        >
            {item.component.preview()}
        </ComponentFrame>
    </a>);
    }

    render() {
        let components = new ComponentFactory().getComponents();
        let list = componentTypes.map((componentType, index) => {
            let childs = components.filter(e => e.componentType == componentType.name)
            let childComponents = childs.map(item => this.createComponent(item))
            components = components.filter(e => e.componentType != componentType.name)

            return (<li class="component-tool-item" id={componentType.name}>
                <a href="javascript:void(0)" class="btn"
                    onClick={()=>{this.setState({activeIndex: index})}}
                >
                    {componentType.text}
                </a>
                <div class={`subMenu ${this.state.activeIndex == index && "subMenu-active"}`}>
                    {childComponents}
                </div>
            </li>);
        });

        let otherIndex = list.length;
        list.push(
            <li class="component-tool-item" id="other">
                <a href="javascript:void(0)" class="btn"
                    onClick={()=>{this.setState({activeIndex: otherIndex})}}
                >其他组件</a>
                <div class={`subMenu ${this.state.activeIndex == otherIndex && "subMenu-active"}`}>
                    {components.map(item=> this.createComponent(item))}
                </div>
            </li>
        );


        return (<div className="component-tool">
            <div>
                <ui class="component-tool-list">
                    {list}
                </ui>
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
        selectedComponent: state.PageComponent.SelectedComponent
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        selectComponent: (componentName) => { dispatch(newPageSelectComponent(componentName)) }
    }
}

const ComponentToolContain = CmsRedux.connect(
    mapStateToProps, // 关于state
    mapDispatchToProps // 关于dispatch
)(ComponentTool)

export default ComponentToolContain;