import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom';
import {CmsRedux} from 'CMSManage/CmsRedux'

import Resource from 'Resource/Resource.jsx';

import {  } from '../Actions'

// props.resource
function EditPageData(props) 
{
	return (
	<NavLink className="btn btn-outline-secondary" 
		to={`/ManageHome/CMSManage/PageComponent/${props.resource.id}`}
	>
		<span class="oi oi-pencil" title="icon name" aria-hidden="true"></span>{" 编辑文章"}
	</NavLink>);
}

function LookupPageData(props) 
{
	return (
	<NavLink className="btn btn-outline-secondary" 
		to={`/ManageHome/CMSManage/PageComponent/${props.resource.id}`}
	>
		<span class="oi oi-zoom-in" title="icon name" aria-hidden="true"></span>{" 浏览"}
	</NavLink>);
}

class PageData extends React.Component{
    constructor(props){
        super(props);

        this.describes=[
			{name:"id", isId:true, isAddShow:false, isEditShow:false, isLookupShow:false},
			{name:"name", text:"文章名称", isName:true, isShowOnList:true},
			{name:"displayName", text:"显示名称", isShowOnList:true},
			{name:"description", text:"文章描述", isShowOnList:true}
		];

		this.resourceChild = null;

		this.deleteResource = this.deleteResource.bind(this);
    	this.freshenResources = this.freshenResources.bind(this);
    }

    componentDidMount(){
		this.props.postsFecth(this.resourceChild.pageIndex, this.resourceChild.pageSize, this.resourceChild.searchKey);
	}

	componentWillUpdate(nextProps)
	{
		this.resourceChild.resetResources(nextProps.posts, nextProps.postIndex);
		this.resourceChild.resetResourceNum(nextProps.postNum);

		if(nextProps.postsDidInvalidate){
			this.props.postsFecth(this.resourceChild.pageIndex, this.resourceChild.pageSize, this.resourceChild.searchKey);
		}
	}

	// Resource组件删除资源通知
	deleteResource(resource){
        this.props.postDeleteFecth(resource);
	}

	// Resource组件刷新资源通知
	freshenResources(pageIndex, pageSize, searchKey){
		this.props.postsFecth(pageIndex, pageSize, searchKey);
	}

	render(){
        let customizeOperateBtns = [];
        customizeOperateBtns.push(EditPageData);
        customizeOperateBtns.push(LookupPageData);

        let customizeBottomOperateBtns = [];
        customizeBottomOperateBtns.push(
            <button type="button" className="btn btn-info" >+发布新文章</button>);
		
		let testResources = [
            {
                id: 1,
                name: "TestPage",
                displayName: "测试页面",
                description: "这是一个测试页面"
			},
			{
                id: 2,
                name: "TestPage",
                displayName: "测试页面",
                description: "这是一个测试页面"
            }
        ];

		return(
			<div className="col-md-12">
				<Resource
                title="文章管理"
                resources={testResources}
                hideAdd={true}
                hideEdit={true}
				describes={this.describes}
				freshenResources={this.freshenResources}
				deleteResource={this.deleteResource}
				//addResource={this.addResource}
				//updateResource={this.updateResource}
                setResourceRef={(ref)=>{this.resourceChild = ref}} 
                customizeOperateBtns={customizeOperateBtns}
                customizeBottomOperateBtns={customizeBottomOperateBtns}
                />
			</div>
		);
	}
} 

PageData.propsTypes = {
    page: PropTypes.object.isRequired,
    posts: PropTypes.array.isRequired,
    postIndex: PropTypes.number.isRequired,
    postNum: PropTypes.number.isRequired,
    postsDidInvalidate: PropTypes.bool.isRequired,
    postsFecth: PropTypes.func.isRequired,
    postDeleteFecth: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => { // ownProps为当前组件的props
    return {
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        postsFecth: (pageIndex, pageSize, searchKey) => {  },
		postDeleteFecth: (resource) => {  }
    }
}

const Contain = CmsRedux.connect(
    mapStateToProps, // 关于state
    mapDispatchToProps,
    // undefined,
    // { pure: false }
)(PageData)

export default Contain;