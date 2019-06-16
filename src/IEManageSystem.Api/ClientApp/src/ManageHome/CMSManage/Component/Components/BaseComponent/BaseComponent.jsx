import React from 'react'
import PropTypes from 'prop-types'

class BaseComponent extends React.Component {
    static preview() {
        return (<p>这是什么组件来着 :) </p>);
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