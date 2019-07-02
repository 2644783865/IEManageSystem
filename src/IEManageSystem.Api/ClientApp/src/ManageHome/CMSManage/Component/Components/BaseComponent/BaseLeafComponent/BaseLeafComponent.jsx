import React from 'react'
import PropTypes from 'prop-types'

import BaseComponent from '../BaseComponent.jsx'

import BaseField from './BaseField.jsx'

class BaseLeafComponent extends BaseComponent {
    static getBaseField(props, text){
        return (<BaseField text={text} fieldValue={props.fieldValue} setFieldValue={props.setFieldValue} />);
    }

    static getConfig() {
        return {
            field1: (props) => this.getBaseField(props, "字段1"),
            field2: (props) => this.getBaseField(props, "字段2"),
            field3: (props) => this.getBaseField(props, "字段3"),
            field4: (props) => this.getBaseField(props, "字段4"),
            field5: (props) => this.getBaseField(props, "字段5"),
        };
    }

    constructor(props) {
        super(props);
    }
}

BaseLeafComponent.propTypes = {
    componentData: PropTypes.object
}

BaseLeafComponent.defaultProps = {
};

export default BaseLeafComponent;