import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import Resource from 'Resource/Resource.jsx';

import { pagesFetch, pageNumFetch, pageAddFetch, pageDeleteFetch } from '../Actions'

class PageManage extends React.Component{
    constructor(props){
        super(props);

        this.describes=[
			{name:"id", isId:true, isAddShow:false, isEditShow:false, isLookupShow:false},
			{name:"name", text:"页面名称", isName:true, isShowOnList:true},
			{name:"displayName", text:"显示名称", isShowOnList:true},
			{name:"description", text:"页面描述", isShowOnList:true}
		];

		this.resourceChild = null;

		this.deleteResource = this.deleteResource.bind(this);
		this.addResource = this.addResource.bind(this);
    	this.freshenResources = this.freshenResources.bind(this);
    }

    componentDidMount(){
		this.props.pagesFetch(this.resourceChild.pageIndex, this.resourceChild.pageSize, this.resourceChild.searchKey);
        this.props.pageNumFetch(this.resourceChild.searchKey);
	}

	componentWillUpdate(nextProps)
	{
		this.resourceChild.resetResources(nextProps.pages, nextProps.pageIndex);
		this.resourceChild.resetResourceNum(nextProps.pageNum);
	}

	// Resource组件删除资源通知
	deleteResource(resource){
        this.props.pageDeleteFetch(resource);
	}

	// Resource组件添加资源通知
	addResource(resource){
        this.props.pageAddFetch(resource);
	}

	// Resource组件刷新资源通知
	freshenResources(pageIndex, pageSize, searchKey){
		this.props.pagesFetch(pageIndex, pageSize, searchKey);
		this.props.pageNumFetch(searchKey);
	}

    // 获取资源列表
	getResourceList(pageIndex, pageSize, searchKey){
		this.props.pagesFetch(pageIndex, pageSize, searchKey);
	}

    // 获取资源数量
    getResourceNum(searchKey){
		this.props.pageNumFetch(searchKey);
    }

	render(){
        let customizeOperateBtns = [];
        customizeOperateBtns.push(
            <button className="btn btn-primary">
                <span class="oi oi-pencil" title="icon name" aria-hidden="true"></span>编辑
            </button>
        );

        let testResources = [
            {
                id: 1,
                name: "TestPage",
                displayName: "测试页面",
                description: "这是一个测试页面"
            }
        ];

		return(
			<div className="col-md-12">
				<Resource
                title="页面管理"
                resources={testResources}
                // hideAdd={true}
                hideEdit={true}
				describes={this.describes}
				freshenResources={this.freshenResources}
				deleteResource={this.deleteResource}
				addResource={this.addResource}
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
	pageNumFetch: PropTypes.func.isRequired,
	pageAddFetch: PropTypes.func.isRequired,
	pageDeleteFetch: PropTypes.func.isRequired,
}

const mapStateToProps = (state, ownProps) => { // ownProps为当前组件的props
    return {
		pages: state.cms.page.pages,
		pageNum: state.cms.page.pageNum,
		pageIndex: state.cms.page.pageIndex
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
		pagesFetch: (pageIndex, pageSize, searchKey) => { dispatch(pagesFetch(pageIndex, pageSize, searchKey)) },
		pageNumFetch: (searchKey) => { dispatch(pageNumFetch(searchKey)) },
		pageAddFetch: (resource) => { dispatch(pageAddFetch(resource)) },
		pageDeleteFetch: (resource) => { dispatch(pageDeleteFetch(resource)) }
    }
}

const Contain = connect(
    mapStateToProps, // 关于state
    mapDispatchToProps,
    undefined,
    { pure: false }
)(PageManage)

export default Contain;