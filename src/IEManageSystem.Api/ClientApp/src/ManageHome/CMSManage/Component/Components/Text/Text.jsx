import React from 'react'
import PropTypes from 'prop-types'
import BaseLeafComponent from '../BaseComponent/BaseLeafComponent/BaseLeafComponent.jsx'

class Text extends BaseLeafComponent
{
    static preview(){
        return (<p>文本框</p>);
    }

    static getConfig(){
        return {
            field1: {text: "文本", show: true},
            field2: {text: "字段2", show: false},
            field3: {text: "字段3", show: false},
            field4: {text: "字段4", show: false},
            field5: {text: "字段5", show: false},
        };
    }

    constructor(props){
        super(props);
    }

    getComponentData(){
        return this.props.componentData || {};
    }

    render()
    {
        let text = this.getComponentData().field1 || "这是一段文本";

        return (<p>{text}</p>);
    }
}

Text.defaultProps = {
    col: 3
};

export default Text;