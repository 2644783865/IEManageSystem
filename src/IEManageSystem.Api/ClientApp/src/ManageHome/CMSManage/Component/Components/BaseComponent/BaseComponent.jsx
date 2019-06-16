import React from 'react'
import PropTypes from 'prop-types'

class BaseComponent extends React.Component {
    static preview() {
        return (<p>这是什么组件来着 :) </p>);
    }

    static getConfig() {
        return {
            field1: { text: "字段1", show: true },
            field2: { text: "字段2", show: true },
            field3: { text: "字段3", show: true },
            field4: { text: "字段4", show: true },
            field5: { text: "字段5", show: true },
        };
    }

    constructor(props) {
        super(props);
    }
}

BaseComponent.propTypes = {
    componentData: PropTypes.object
}

BaseComponent.defaultProps = {
};

export default BaseComponent;