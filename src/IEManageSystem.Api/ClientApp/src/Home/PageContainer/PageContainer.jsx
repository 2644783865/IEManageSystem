import React from 'react'
import PropTypes from 'prop-types'

import { CmsRedux } from 'CMSManage/CmsRedux'

import './PageContainer.css'

import { pageComponentFetch, componentDatasFetch } from 'CMSManage/Actions'
import FrontParentCompont from 'CMSManage/Component/ParentComponent/FrontParentCompont/FrontParentCompont.jsx'

class PageContainer extends React.Component {
    constructor(props) {
        super(props);

        this.props.pageComponentFetch(this.props.pageName);
        this.props.componentDatasFetch(this.props.pageName, this.props.pageDataName);
    }

    componentWillUpdate(nextProps) {
        if (nextProps.componentDatasDidInvalidate) {
            this.props.componentDatasFetch(this.props.pageName, this.props.pageDataName);
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
    pageName: PropTypes.string.isRequired,
    pageDataName: PropTypes.string.isRequired,
    pageComponentFetch: PropTypes.func.isRequired,
    componentDatasFetch: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => { // ownProps为当前组件的props
    return {
        pageComponents: state.PageComponent.Components,
        componentDatas: state.componentData.componentDatas,
        componentDatasDidInvalidate: state.componentData.componentDatasDidInvalidate,
        pageName: ownProps.match.params.pageName,
        pageDataName: ownProps.match.params.pageDataName
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        pageComponentFetch: (name) => {
            dispatch(pageComponentFetch(name));
        },
        componentDatasFetch: (pageName, pageDataName) => {
            dispatch(componentDatasFetch(pageName, pageDataName));
        }
    }
}

const Contain = CmsRedux.connect(
    mapStateToProps, // 关于state
    mapDispatchToProps
)(PageContainer)

export default Contain;