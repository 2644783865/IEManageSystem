import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom';
import {CmsRedux} from 'CMSManage/CmsRedux'

import Resource from 'Resource/Resource.jsx';
import {ResourceDescribeValueType} from 'ResourceForm/ResourceDescribeValueType'
import { pagesFetch, contentPageAddFetch, staticPageAddFetch, pageDeleteFetch, pageUpdateFetch } from '../Actions'

const pageType = {
	StaticPage: "StaticPage",
	ContentPage: "ContentPage"
}

// props.resource
function EditComponent(props) 
{
	return (
	<NavLink className="btn btn-outline-secondary" 
		to={`/ManageHome/CMSManage/PageComponent/${props.resource.name}`}
	>
		<span class="oi oi-pencil" title="icon name" aria-hidden="true"></span>{" 编辑组件"}
	</NavLink>);
}

function EditPageData(props){
	let data = props.resource.pageType == pageType.ContentPage ?
		{
			url: `/ManageHome/CMSManage/PageData/${props.resource.name}`,
			text: " 管理文章"
		}:
		{
			url: `/ManageHome/CMSManage/ComponentData/${props.resource.name}`,
			text: " 管理页面"
		}

	return (
		<NavLink className="btn btn-outline-secondary" 
			to={`${data.url}`}
		>
			<span class="oi oi-pencil" title="icon name" aria-hidden="true"></span>{` ${data.text}`}
		</NavLink>);
}

class PageManage extends React.Component{
    constructor(props){
        super(props);

        this.describes=[
			{name:"id", isId:true, isAddShow:false, isEditShow:false, isLookupShow:false},
			{name:"name", text:"页面名称", isName:true, isShowOnList:true},
			{name:"displayName", text:"显示名称", isShowOnList:true},
			{name:"description", text:"页面描述", isShowOnList:true},
			{name:"pageType", text:"页面类型", isShowOnList:true, 
				valueType:ResourceDescribeValueType.radio,
				valueTexts: [{value:pageType.StaticPage, text:"单篇页面"}, {value:pageType.ContentPage, text:"文章页面"}],
				isEditCanEdit: false
			}
		];

		this.resourceChild = null;

		this.deleteResource = this.deleteResource.bind(this);
		this.addResource = this.addResource.bind(this);
		this.updateResource = this.updateResource.bind(this);
    	this.freshenResources = this.freshenResources.bind(this);
    }

    componentDidMount(){
		this.props.pagesFetch(this.resourceChild.pageIndex, this.resourceChild.pageSize, this.resourceChild.searchKey);
	}

	componentWillUpdate(nextProps)
	{
		this.resourceChild.resetResources(nextProps.pages, nextProps.pageIndex);
		this.resourceChild.resetResourceNum(nextProps.pageNum);

		if(nextProps.pagesDidInvalidate){
			this.props.pagesFetch(this.resourceChild.pageIndex, this.resourceChild.pageSize, this.resourceChild.searchKey);
		}
	}

	// Resource组件删除资源通知
	deleteResource(resource){
        this.props.pageDeleteFetch(resource);
	}

	// Resource组件添加资源通知
	addResource(resource){
		if(resource.pageType == pageType.ContentPage)
		{
			this.props.contentPageAddFetch(resource);
		}
		else if(resource.pageType == pageType.StaticPage)
		{
			this.props.staticPageAddFetch(resource);
		}
	}

	// Resource组件更新资源通知
	updateResource(resource){
		this.props.pageUpdateFetch(resource);
	}

	// Resource组件刷新资源通知
	freshenResources(pageIndex, pageSize, searchKey){
		this.props.pagesFetch(pageIndex, pageSize, searchKey);
	}

	render(){
        let customizeOperateBtns = [];
		customizeOperateBtns.push(EditComponent);
		customizeOperateBtns.push(EditPageData);

		return(
			<div className="col-md-12">
				<Resource
                title="页面管理"
                // resources={testResources}
                // hideAdd={true}
                // hideEdit={true}
				describes={this.describes}
				freshenResources={this.freshenResources}
				deleteResource={this.deleteResource}
				addResource={this.addResource}
				updateResource={this.updateResource}
                setResourceRef={(ref)=>{this.resourceChild = ref}} 
                customizeOperateBtns={customizeOperateBtns}
                />
			</div>
		);
	}
} 

PageManage.propsTypes = {
	pages: PropTypes.array.isRequired,
	pageNum: PropTypes.number.isRequired,
	pageIndex: PropTypes.number.isRequired,
	pagesFetch: PropTypes.func.isRequired,
	contentPageAddFetch: PropTypes.func.isRequired,
	staticPageAddFetch: PropTypes.func.isRequired,
	pageDeleteFetch: PropTypes.func.isRequired,
	pageUpdateFetch: PropTypes.func.isRequired,
}

const mapStateToProps = (state, ownProps) => { // ownProps为当前组件的props
    return {
		pages: state.page.pages,
		pageNum: state.page.pageNum,
		pageIndex: state.page.pageIndex,
		pagesDidInvalidate: state.page.pagesDidInvalidate
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
		pagesFetch: (pageIndex, pageSize, searchKey) => { dispatch(pagesFetch(pageIndex, pageSize, searchKey)) },
		contentPageAddFetch: (resource) => { dispatch(contentPageAddFetch(resource)) },
		staticPageAddFetch: (resource) => { dispatch(staticPageAddFetch(resource)) },
		pageDeleteFetch: (resource) => { dispatch(pageDeleteFetch(resource)) },
		pageUpdateFetch: (resource) => { dispatch(pageUpdateFetch(resource)) }
    }
}

const Contain = CmsRedux.connect(
    mapStateToProps, // 关于state
    mapDispatchToProps
)(PageManage)

export default Contain;