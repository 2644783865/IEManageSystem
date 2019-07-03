import 'labelauty';
import 'labelautycss';

import React from 'react';
import ResourceDescribe from './ResourceDescribe.js';
import ResourceList from './ResourceList.jsx';
import Paging from './Paging.jsx';
import ResourceDelete from './ResourceDelete.jsx';
import ResourceForm from 'ResourceForm/ResourceForm.jsx';
import ErrorModal from 'ErrorModal/ErrorModal.jsx';
import LoadingModal from 'LoadingModal/LoadingModal.jsx';

require("./Resource.css");

var operationState = {
	none: "none",
	add: "add",
	delete: "delete",
	edit: "edit",
	lookup: "lookup"
}


export default class Resource extends React.Component {
	// props.title  标题
	// props.describes  资源描述
	// props.resources  可选初始化资源
	// props.freshenResources()  刷新数据接口
	// props.addResource()  添加数据接口
	// props.updateResource()  更新数据接口
	// props.deleteResource()  删除数据接口
	// props.setResourceRef()  设置当前组件的引用
	// props.customizeOperateBtns	自定义操作按钮组件
	// props.customizeBottomOperateBtns	自定义底部操作按钮组件
	// props.hideAdd = false
	// props.hideEdit = false
	// props.hideDelete = false
	// props.hidePadding = false
	constructor(props) {
		super(props);

		this.props.setResourceRef(this);

		if (this.props.hidePadding == true) {
			this.pageSize = 999999;
		}

		this.pageIndex = 1;
		this.pageSize = 10;
		this.searchKey = "";

		this._resourceDescribe = new ResourceDescribe(this.props.describes);

		this.state =
			{
				resources: this.props.resources == undefined ? [] : this.props.resources,
				resourceNum: 0,
				curResource: {},
				pageNum: 0,
				operationState: operationState.none,
				fromModalShow: false,
				deleteModalShow: false,
				loadingModalShow: false,
				errorInfo: {
					show: false,
					title: "",
					message: ""
				}
			};

		this._pageIndexChange = this._pageIndexChange.bind(this);
		this._resourceOperationClick = this._resourceOperationClick.bind(this);
		this._resourceUpdate = this._resourceUpdate.bind(this);
		this._searchClick = this._searchClick.bind(this);
	}

	componentDidMount() {
	}

	componentDidUpdate() {
	}

	// 重新设置资源（由父组件调用）
	resetResources(resources, pageIndex) {
		this.pageIndex = pageIndex;
		this.setState({ resources: resources });
	}

	// 重新设置资源数量（由父组件调用）
	resetResourceNum(resourceNum) {
		let pageNum = parseInt(resourceNum / this.pageSize);
		if ((resourceNum % this.pageSize) > 0) {
			pageNum++;
		}

		this.setState({
			resourceNum: resourceNum,
			pageNum: pageNum,
		})
	}

	showLoadingModal() {
		this.setState({ loadingModalShow: true });
	}

	hideLoadingModal() {
		this.setState({ loadingModalShow: false });
	}

	showErrorModal(title, message) {
		this.setState({
			errorInfo: {
				show: true,
				title: title,
				message: message
			}
		})
	}

	// 搜索单击
	_searchClick(searchKey) {
		this.searchKey = searchKey;
		this.props.freshenResources(this.pageIndex, this.pageSize, this.searchKey);
	}

	// 页索引改变
	_pageIndexChange(pageIndex) {
		if (pageIndex > 0 && pageIndex <= this.state.pageNum) {
			this.props.freshenResources(pageIndex, this.pageSize, this.searchKey);
		}
	}

	// 操作按钮点击
	_resourceOperationClick(operation, resource) 
	{
		if(operation == operationState.delete){
			this.setState({ 
				operationState: operation, 
				deleteModalShow: true, 
				curResource: resource || {}
			});
		}
		else{
			this.setState({ 
				operationState: operation, 
				fromModalShow: true, 
				curResource: resource || {}
			});
		}
	}

	// 更新资源
	_resourceUpdate(operation, resource) {
		if (operation == operationState.add) {
			this.props.addResource(resource);
		}
		else if (operation == operationState.edit) {
			this.props.updateResource(resource);
		}
		else if (operation == operationState.delete) {
			this.props.deleteResource(resource);
		}
		this.setState({fromModalShow: false});
	}

	render() {
		let resourceList = <ResourceList
			title={this.props.title}
			resources={this.state.resources}
			describes={this._resourceDescribe.getDescribesOfList()}
			searchClick={this._searchClick}
			resourceEditClick={resource => this._resourceOperationClick(operationState.edit, resource)}
			resourceDeleteClick={resource => this._resourceOperationClick(operationState.delete, resource)}
			resourceLookupClick={resource => this._resourceOperationClick(operationState.lookup, resource)}
			hideEdit={this.props.hideEdit}
			hideDelete={this.props.hideDelete}
			customizeOperateBtns={this.props.customizeOperateBtns}
		/>;

		let paging = <Paging
			resourceAddClick={() => this._resourceOperationClick(operationState.add)}
			hideAdd={this.props.hideAdd}
			hidePadding={this.props.hidePadding}
			pageNum={this.state.pageNum}
			pageIndex={this.pageIndex}
			pageIndexChange={this._pageIndexChange}
			customizeBottomOperateBtns={this.props.customizeBottomOperateBtns} />;

		let describes
		if(this.state.operationState == operationState.add){
			describes = this._resourceDescribe.getDescribesOfAdd();
		}
		else if(this.state.operationState == operationState.edit){
			describes = this._resourceDescribe.getDescribesOfEdit();
		}
		else if(this.state.operationState == operationState.lookup){
			describes = this._resourceDescribe.getDescribesOfLookup();
		}

		return (
			<div className="w-100 h-100 d-flex flex-column">
				<ErrorModal
					show={this.state.errorInfo.show}
					title={this.state.errorInfo.title}
					message={this.state.errorInfo.message}
					close={
						() => {
							this.setState({
								errorInfo: {
									show: false,
									title: this.state.errorInfo.title,
									message: this.state.errorInfo.message
								}
							})
						}
					}
				/>
				<LoadingModal show={this.state.loadingModalShow} />
				{resourceList}
				{paging}
				<ResourceForm
						title={this.props.title}
						describes={describes}
						resource={this.state.curResource}
						resourceUpdate={resource => this._resourceUpdate(this.state.operationState, resource)}
						show={this.state.fromModalShow}
						close={()=>{this.setState({fromModalShow:false})}} />
				<ResourceDelete
						title={this.props.title}
						nameDescribe={this._resourceDescribe.nameDescribes}
						resource={this.state.curResource}
						resourceUpdate={resource => this._resourceUpdate(operationState.delete, resource)}
						show={this.state.deleteModalShow}
						close={()=>{this.setState({deleteModalShow:false})}} />
			</div>
		);
	}
}