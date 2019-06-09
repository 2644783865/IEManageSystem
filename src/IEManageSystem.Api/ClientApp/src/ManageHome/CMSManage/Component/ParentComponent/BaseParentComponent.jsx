import React from 'react'
import PropTypes from 'prop-types'

class BaseParentComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    getStyle(){
        let style =
            {
                minHeight: "9rem",
                padding: "0.33rem"
            }

        if (this.props.pageComponent.height) {
            style.height = `${this.props.pageComponent.height}rem`;
        }

        if (this.props.pageComponent.padding) {
            style.padding = `${this.props.pageComponent.padding}rem`;
        }

        return style;
    }

    getClassName(){
        let className = `col-md-${this.props.pageComponent.col || 12}`;

        return className;
    }

    createChildrenComponent() 
    {
        return undefined;
    }
}

BaseParentComponent.propTypes = {
    pageComponent: PropTypes.object.isRequired
}

BaseParentComponent.defaultProps = {
};

export default BaseParentComponent;