import React from 'react'
import PropTypes from 'prop-types'

import { CmsRedux } from 'CMSManage/CmsRedux'

import './PageContainer.css'

import EditableParentCom from 'CMSManage/Component/ParentComponent/EditableParentCom/EditableParentCom.jsx'

import { newPageAddComponent, pageComponentUpdateFetch, pageComponentFetch } from 'CMSManage/Actions'

class PageContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            displayName: "",
            description: ""
        }

        this.getPage(props.pageName);
        
        this.submitPage = this.submitPage.bind(this);

        this.props.pageComponentFetch(props.pageName);
    }

    getPage(id){
        let postData = {
        	id: id
        };

        IETool.ieAjax({
            url: "/api/PageManage/GetPage",
            type: 'post',
            data: JSON.stringify(postData),
            contentType: 'application/json',
            dataType: 'json',
            success: function(data){
		        if(data.isSuccess == true)
		        {
		        	this.setState({
                        name: data.value.page.name,
                        displayName: data.value.page.displayName,
                        description: data.value.page.description
                    })
		        }
		    }.bind(this)
        });
    }

    submitPage(){
        this.props.pageComponentUpdateFetch(
            this.props.pageName,
            this.props.pageComponents
        );
    }

    render() 
    {
        return (
            <div className="page-container">
                <div className="page-container-header">
                    <div className="input-group">
                        <input value={this.state.displayName} type="text" className="form-control" placeholder="" />
                        <div className="input-group-append">
                            <span className="input-group-text text-white">显示名称</span>
                        </div>
                    </div>
                    <div className="input-group">
                        <input value={this.state.name} type="text" className="form-control" placeholder="" />
                        <div className="input-group-append">
                            <span className="input-group-text text-white">名称</span>
                        </div>
                    </div>
                    <div className="input-group">
                        <input value={this.state.description} type="text" className="form-control" placeholder="" />
                        <div className="input-group-append">
                            <span className="input-group-text text-white">描述</span>
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
                        <button className="btn btn-info padding-left-10 padding-right-10"
                            onClick={this.submitPage}
                        >提交页面</button>
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
                                    if (!this.props.selectedComponent.name) {
                                        return;
                                    }

                                    var timetamp = Number(new Date());
                                    while (true) {
                                        if (!this.props.pageComponents.some(item => item.sign === timetamp)) {
                                            break;
                                        }

                                        timetamp = Number(new Date());
                                    }

                                    let componentType = "";
                                    if(this.props.selectedComponent.component.isBaseContainerComponent){
                                        componentType = "CompositeComponent";
                                    }
                                    else{
                                        componentType = "ContentLeafComponent"
                                    }

                                    let pageComponent = { 
                                        sign: timetamp, 
                                        name: this.props.selectedComponent.name,
                                        componentType: componentType
                                    };

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
    selectedComponent: PropTypes.isRequired,
    pageComponents: PropTypes.array,
    pageName: PropTypes.object.isRequired,
    addComponent: PropTypes.func.isRequired,
    pageComponentUpdateFetch: PropTypes.func.isRequired,
    pageComponentFetch: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => { // ownProps为当前组件的props
    return {
        selectedComponent: state.PageComponent.SelectedComponent,
        pageComponents: state.PageComponent.Components,
        pageName: ownProps.pageName
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        addComponent: (pageComponent) => {
            dispatch(newPageAddComponent(pageComponent));
        },
        pageComponentUpdateFetch: (name, components) => {
            dispatch(pageComponentUpdateFetch(name, components));
        },
        pageComponentFetch:(name) => {
            dispatch(pageComponentFetch(name));
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