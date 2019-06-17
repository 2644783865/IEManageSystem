import React from 'react'
import PropTypes from 'prop-types'

import { CmsRedux } from 'CMSManage/CmsRedux'

import './PageContainer.css'

import { pageComponentFetch, componentDatasFetch } from 'CMSManage/Actions'
import FrontParentCompont from 'CMSManage/Component/ParentComponent/FrontParentCompont/FrontParentCompont.jsx'

class PageContainer extends React.Component {
    constructor(props) {
        super(props);

        this.props.pageComponentFetch(this.props.pageId);
        this.props.componentDatasFetch(this.props.pageId, this.props.pageDataId);
    }

    componentWillUpdate(nextProps) {
        if (nextProps.componentDatasDidInvalidate) {
            this.props.componentDatasFetch(this.props.pageId, this.props.pageDataId);
        }
    }

    render() {
        let components = this.props.pageComponents;
        if (components.length == 0) {
            components = [
                {
                    componentType: "ContentLeafComponent",
                    height: "18",
                    name: "CitiesSlider",
                    sign: 1560170670361
                },
                {
                    componentType: "CompositeComponent",
                    name: "Container",
                    pageComponents: [
                        {
                            componentType: "ContentLeafComponent",
                            name: "Text",
                            sign: 1560170698807
                        }
                    ],
                    sign: 1560170696487
                },
                {
                    componentType: "ContentLeafComponent",
                    name: "Clock",
                    sign: 1560170670390
                },
                {
                    componentType: "ContentLeafComponent",
                    name: "Donut",
                    sign: 1560170670391
                },
                {
                    componentType: "ContentLeafComponent",
                    name: "Groupedcolumn",
                    sign: 1560170670392
                }
            ]
        }

        return (
            <div className="front-page-container">
                {
                    components.map(item =>
                        <FrontParentCompont
                            pageComponent={item}
                            componentDatas={this.props.componentDatas}
                        >
                        </FrontParentCompont>)
                }
            </div>
        );
    }
}

PageContainer.propTypes = {
    pageComponents: PropTypes.array,
    componentDatas: PropTypes.array,
    componentDatasDidInvalidate: PropTypes.bool.isRequired,
    pageId: PropTypes.string.isRequired,
    pageDataId: PropTypes.string.isRequired,
    pageComponentFetch: PropTypes.func.isRequired,
    componentDatasFetch: PropTypes.func.isRequired
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
        pageComponentFetch: (id) => {
            dispatch(pageComponentFetch(id));
        },
        componentDatasFetch: (pageId, pageDataId) => {
            dispatch(componentDatasFetch(pageId, pageDataId));
        }
    }
}

const Contain = CmsRedux.connect(
    mapStateToProps, // 关于state
    mapDispatchToProps,
    undefined,
    { pure: false }
)(PageContainer)

export default Contain;