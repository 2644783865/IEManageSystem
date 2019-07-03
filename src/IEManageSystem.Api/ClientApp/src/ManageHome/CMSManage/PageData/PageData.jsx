import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom';
import {CmsRedux} from 'CMSManage/CmsRedux'

import Resource from 'Resource/Resource.jsx';

import { pageDatasFetch, pageDataDeleteFetch, pageDataAddFetch, pageDataUpdateFetch } from '../Actions'

class PageData extends React.Component{
    constructor(props){
        super(props);

        this.describes=[
			{name:"id", isId:true, isAddShow:false, isEditShow:false, isLookupShow:false},
			{name:"name", text:"文章名称", isName:true, isShowOnList:true},
			{name:"title", text:"标题", isShowOnList:true}
		];

		this.resourceChild = null;

		this.deleteResource = this.deleteResource.bind(this);
		this.addResource = this.addResource.bind(this)
		this.updateResource = this.updateResource.bind(this);
    	this.freshenResources = this.freshenResources.bind(this);
    }

    componentDidMount(){
		this.props.pageDatasFecth(this.resourceChild.pageIndex, this.resourceChild.pageSize, this.resourceChild.searchKey, this.props.pageName);
	}

	componentWillUpdate(nextProps)
	{
		this.resourceChild.resetResources(nextProps.pageDatas, nextProps.pageDataIndex);
		this.resourceChild.resetResourceNum(nextProps.pageDataNum);

		if(nextProps.pageDatasDidInvalidate == true){
			this.props.pageDatasFecth(this.resourceChild.pageIndex, this.resourceChild.pageSize, this.resourceChild.searchKey, this.props.pageName);
		}
	}

	// Resource组件删除资源通知
	deleteResource(resource){
        this.props.pageDataDeleteFecth(resource, this.props.pageName);
	}

	// Resource组件添加资源通知
	addResource(resource){
        this.props.pageDataAddFetch(resource, this.props.pageName);
	}

	// Resource组件更新资源通知
	updateResource(resource){
		this.props.pageDataUpdateFetch(resource, this.props.pageName);
	}

	// Resource组件刷新资源通知
	freshenResources(pageIndex, pageSize, searchKey){
		this.props.pageDatasFecth(pageIndex, pageSize, searchKey, this.props.pageName);
	}

	render(){
        let customizeOperateBtns = [];
        customizeOperateBtns.push((props)=>{
			return (
			<NavLink className="btn btn-outline-secondary" 
				to={`/ManageHome/CMSManage/ComponentData/${this.props.pageName}/${props.resource.name}`}
			>
				<span class="oi oi-pencil" title="icon name" aria-hidden="true"></span>{" 编辑文章"}
			</NavLink>);
		});
        customizeOperateBtns.push((props)=>{
			return (
			<NavLink className="btn btn-outline-secondary" 
				to={`/ManageHome/CMSManage/ComponentData/${this.props.pageName}/${props.resource.name}`}
			>
				<span class="oi oi-zoom-in" title="icon name" aria-hidden="true"></span>{" 浏览"}
			</NavLink>);
		});

        let customizeBottomOperateBtns = [];
        // customizeBottomOperateBtns.push(<button type="button" className="btn btn-info" >+发布新文章</button>);
		
		// let testResources = [
        //     {
        //         id: 1,
        //         name: "TestPost",
        //         title: "测试文章"
		// 	}
        // ];

		return(
			<div className="col-md-12">
				<Resource
                title="文章管理"
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
                customizeBottomOperateBtns={customizeBottomOperateBtns}
                />
			</div>
		);
	}
} 

PageData.propsTypes = {
    pageName: PropTypes.number.isRequired,
    pageDatas: PropTypes.array.isRequired,
    pageDataIndex: PropTypes.number.isRequired,
    pageDataNum: PropTypes.number.isRequired,
    pageDatasDidInvalidate: PropTypes.bool.isRequired,
    pageDatasFecth: PropTypes.func.isRequired,
	pageDataDeleteFecth: PropTypes.func.isRequired,
	pageDataAddFetch: PropTypes.func.isRequired,
	pageDataUpdateFetch: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => { // ownProps为当前组件的props
    return {
		pageName: ownProps.match.params.pageName,
		pageDatas: state.pageData.pageDatas,
		pageDataIndex: state.pageData.pageDataIndex,
		pageDataNum: state.pageData.pageDataNum,
		pageDatasDidInvalidate: state.pageData.pageDatasDidInvalidate
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        pageDatasFecth: (pageIndex, pageSize, searchKey, pageName) => {  
			dispatch(pageDatasFetch(pageIndex, pageSize, searchKey, pageName))
		},
		pageDataDeleteFecth: (resource, pageName) => {
			dispatch(pageDataDeleteFetch(resource, pageName))
		},
		pageDataAddFetch: (resource, pageName) => {
			dispatch(pageDataAddFetch(resource, pageName))
		},
		pageDataUpdateFetch: (resource, pageName)=>{
			dispatch(pageDataUpdateFetch(resource, pageName))
		}
    }
}

const Contain = CmsRedux.connect(
    mapStateToProps, // 关于state
    mapDispatchToProps
)(PageData)

export default Contain;