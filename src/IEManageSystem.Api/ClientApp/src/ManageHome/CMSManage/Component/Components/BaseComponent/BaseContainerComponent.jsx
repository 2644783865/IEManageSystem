import React from 'react'
import PropTypes from 'prop-types'

import BaseComponent from './BaseComponent.jsx'

class BaseContainerComponent extends BaseComponent{
    constructor(props){
        super(props);
    }

    static isBaseContainerComponent(){ return true; };
}

BaseContainerComponent.propTypes = {
}

BaseContainerComponent.defaultProps = {
};

export default BaseContainerComponent;