import React from 'react'
import PropTypes from 'prop-types'

import { CmsRedux } from '../../CmsRedux'

import './PageContainer.css'

import EditableParentCom from './EditableParentCom/EditableParentCom.jsx'

import { newPageAddComponent } from '../../Actions'

class PageContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="page-container">
                <div className="page-container-header">
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="" />
                        <div className="input-group-append">
                            <span className="input-group-text text-white">页面显示名称</span>
                        </div>
                    </div>
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="" />
                        <div className="input-group-append">
                            <span className="input-group-text text-white">页面名称</span>
                        </div>
                    </div>
                    <div>
                        <button className="btn btn-info padding-left-10 padding-right-10"
                            onClick={
                                ()=>{
                                    let myEvent = new Event('resize');
                                    window.dispatchEvent(myEvent);
                                }
                            }
                        >重新渲染</button>
                        <button className="btn btn-info padding-left-10 padding-right-10">提交页面</button>
                    </div>
                </div>
                <div className="page-container-header-hidebtn">
                    <button className="btn btn-info"
                        onClick={()=>{
                            $(".page-container-header").slideToggle(300);
                        }}
                    >==</button>
                </div>
                <div className="page-container-body">
                    {
                        this.props.pageComponents.map(item =>
                            <EditableParentCom
                                pageComponent={item}
                            >
                            </EditableParentCom>)
                    }
                    <div className="col-md-2 padding-0">
                        <a className="add-component-btn" href="javascript:void(0)"
                            onClick={
                                () => {
                                    if (!this.props.selectedComponent) {
                                        return;
                                    }

                                    var timetamp = Number(new Date());
                                    while (true) {
                                        if (!this.props.pageComponents.some(item => item.sign === timetamp)) {
                                            break;
                                        }

                                        timetamp = Number(new Date());
                                    }

                                    let pageComponent = { sign: timetamp, name: this.props.selectedComponent };

                                    this.props.addComponent(pageComponent);
                                }
                            }
                        >
                            <span class="oi oi-plus" title="icon name" aria-hidden="true"></span>
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

PageContainer.propTypes = {
    selectedComponent: PropTypes.string,
    pageComponents: PropTypes.array,
    addComponent: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => { // ownProps为当前组件的props
    return {
        selectedComponent: state.newPageSelectedComponent,
        pageComponents: state.newPageComponents
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        addComponent: (pageComponent) => {
            dispatch(newPageAddComponent(pageComponent));
        }
    }
}

const PageContainerContain = CmsRedux.connect(
    mapStateToProps, // 关于state
    mapDispatchToProps,
    undefined,
    { pure: false }
)(PageContainer)

export default PageContainerContain;