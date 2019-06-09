import React from 'react'
import PropTypes from 'prop-types'

import { CmsRedux } from 'CMSManage/CmsRedux'

import './ComponentData.css'

import { pageComponentFetch } from 'CMSManage/Actions'
import ParentCom from 'CMSManage/Component/ParentComponent/ParentComponent/ParentComponent.jsx'

class ComponentData extends React.Component {
    constructor(props) {
        super(props);

        this.props.pageComponentFetch(this.props.match.params.pageId);
    }

    render() 
    {
        return (
            <div className="page-container">
                <div className="page-container-body">
                    {
                        this.props.pageComponents.map(item =>
                            <ParentCom
                                pageComponent={item}
                            >
                            </ParentCom>)
                    }
                </div>
            </div>
        );
    }
}

ComponentData.propTypes = {
    pageComponents: PropTypes.array,
    pageId: PropTypes.object.isRequired,
    pageComponentFetch: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => { // ownProps为当前组件的props
    return {
        pageComponents: state.PageComponent.Components,
        pageId: ownProps.pageId
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        pageComponentFetch:(id) => {
            dispatch(pageComponentFetch(id));
        }
    }
}

const ComponentDataContain = CmsRedux.connect(
    mapStateToProps, // 关于state
    mapDispatchToProps,
    undefined,
    { pure: false }
)(ComponentData)

export default ComponentDataContain;