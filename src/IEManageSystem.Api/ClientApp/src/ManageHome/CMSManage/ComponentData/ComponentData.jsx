import React from 'react'
import PropTypes from 'prop-types'

import { CmsRedux } from 'CMSManage/CmsRedux'

import './ComponentData.css'

import { pageComponentFetch, componentDatasFetch, componentDataUpdateFetch, componentDataUpdate } from 'CMSManage/Actions'
import ParentComponent from 'CMSManage/Component/ParentComponent/ParentComponent/ParentComponent.jsx'

class ComponentData extends React.Component {
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
            <div className="page-container">
                <div className="">
                    <button type="button" className="btn btn-warning mr-2"
                        onClick={()=>this.props.componentDatasFetch(this.props.pageName, this.props.pageDataName)}
                    >
                        取消修改
                        <span className="oi padding-left-10 oi-action-undo" title="icon name" aria-hidden="true"></span>
                    </button>
                    <button type="button" className="btn btn-info"
                        onClick={
                            ()=>{
                                this.props.componentDataUpdateFetch(this.props.pageName, this.props.pageDataName, this.props.componentDatas);
                            }
                        }
                    >
                        提交文章
                        <span className="oi padding-left-10 oi-cloud-upload" title="icon name" aria-hidden="true"></span>
                    </button>
                </div>
                <div className="page-container-body">
                    {
                        components.map(item =>
                            <ParentComponent
                                pageComponent={item}
                                componentDataUpdate={this.props.componentDataUpdate}
                                componentDatas={this.props.componentDatas}
                            >
                            </ParentComponent>)
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
    pageName: PropTypes.string.isRequired,
    pageDataName: PropTypes.string.isRequired,
    pageComponentFetch: PropTypes.func.isRequired,
    componentDatasFetch: PropTypes.func.isRequired,
    componentDataUpdateFetch: PropTypes.func.isRequired,
    componentDataUpdate: PropTypes.func.isRequired
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
        },
        componentDataUpdateFetch: (pageName, pageDataName, componentDatas) => {
            dispatch(componentDataUpdateFetch(pageName, pageDataName, componentDatas));
        },
        componentDataUpdate: (resource) => {
            dispatch(componentDataUpdate(resource));
        }
    }
}

const ComponentDataContain = CmsRedux.connect(
    mapStateToProps, // 关于state
    mapDispatchToProps
)(ComponentData)

export default ComponentDataContain;