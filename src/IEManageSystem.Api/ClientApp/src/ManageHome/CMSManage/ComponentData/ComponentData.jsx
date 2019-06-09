import React from 'react'
import PropTypes from 'prop-types'

import { CmsRedux } from 'CMSManage/CmsRedux'

import './ComponentData.css'

import { pageComponentFetch, componentDatasFetch, componentDataUpdateFetch } from 'CMSManage/Actions'
import ParentCom from 'CMSManage/Component/ParentComponent/ParentComponent/ParentComponent.jsx'

class ComponentData extends React.Component {
    constructor(props) {
        super(props);

        this.props.pageComponentFetch(this.props.pageId);
        this.props.componentDatasFetch(this.props.pageId, this.props.pageDataId);
    }

    componentWillUpdate(nextProps)
    {
        if(nextProps.componentDatasDidInvalidate)
        {
            this.props.componentDatasFetch(this.props.pageId, this.props.pageDataId);
        }
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
    componentDatas: PropTypes.array,
    componentDatasDidInvalidate: PropTypes.bool.isRequired,
    pageId: PropTypes.string.isRequired,
    pageDataId: PropTypes.string.isRequired,
    pageComponentFetch: PropTypes.func.isRequired,
    componentDatasFetch: PropTypes.func.isRequired,
    componentDataUpdateFetch: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => { // ownProps为当前组件的props
    return {
        pageComponents: state.PageComponent.Components,
        componentDatas: state.componentData.componentDatas,
        componentDatasDidInvalidate: state.componentData.componentDatasDidInvalidate,
        pageId: ownProps.match.params.pageId,
        pageDataId: ownProps.match.params.pageDataId
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        pageComponentFetch:(id) => {
            dispatch(pageComponentFetch(id));
        },
        componentDatasFetch:(pageId, pageDataId) => {
            dispatch(componentDatasFetch(pageId, pageDataId));
        },
        componentDataUpdateFetch:(pageId, pageDataId, componentDatas) => {
            dispatch(componentDataUpdateFetch(pageId, pageDataId, componentDatas));
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