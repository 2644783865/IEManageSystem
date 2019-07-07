import React from 'react'
import PropTypes from 'prop-types'

class BaseComponent extends React.Component {
    static preview() {
        return (<p>这是什么组件来着 :) </p>);
    }

    static pageComponentSettingConfigs(){
        return [{
            name: "otherSetting",
            displayName: "其他设置",
            component: (props)=>{
                // props.pageComponentSetting
                // props.setPageComponentSetting
                return (<div>
                    {props.pageComponentSetting.field1}
                </div>)
            }
        }];
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