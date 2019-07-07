import React from 'react'
import PropTypes from 'prop-types'

class BaseParentComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    getStyle(){
        let style =
            {
                padding: "0.33rem"
            }

        if (this.props.pageComponent.height) {
            style.height = this.props.pageComponent.height;
        }

        if (this.props.pageComponent.padding) {
            style.padding = this.props.pageComponent.padding;
        }

        if(this.props.pageComponent.margin){
            style.margin = this.props.pageComponent.margin;
        }

        if(this.props.pageComponent.backgroundColor){
            style.backgroundColor = this.props.pageComponent.backgroundColor;
        }

        return style;
    }

    getClassName(){
        let className = `col-md-${this.props.pageComponent.col || 12} ${this.props.pageComponent.className || ""}`;

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