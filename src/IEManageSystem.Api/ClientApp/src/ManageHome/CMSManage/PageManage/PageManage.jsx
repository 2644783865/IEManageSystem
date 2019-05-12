import React from 'react'
import Resource from 'Resource/Resource.jsx';

export default class PageManage extends React.Component{
    constructor(props){
        super(props);

        this.describes=[
			{name:"id", isId:true, isAddShow:false, isEditShow:false, isLookupShow:false},
			{name:"name", text:"页面名称", isName:true, isShowOnList:true},
			{name:"displayName", text:"显示名称", isShowOnList:true},
			{name:"description", text:"页面描述", isShowOnList:true}
		];

		this.resourceChild = null;

        this.submitBackcall = this.submitBackcall.bind(this);
    	this.deleteResource = this.deleteResource.bind(this);
    	this.freshenResources = this.freshenResources.bind(this);
    }

    componentDidMount(){
		this.getResourceList(this.resourceChild.pageIndex, this.resourceChild.pageSize, this.resourceChild.searchKey);
        this.getResourceNum(this.resourceChild.searchKey);
	}

	// 提交回调
	submitBackcall(data)
	{
        this.resourceChild.hideLoadingModal();

	    if(data.isSuccess == true)
	    {
            this.getResourceList(this.resourceChild.pageIndex, this.resourceChild.pageSize, this.resourceChild.searchKey);
            this.getResourceNum(this.resourceChild.searchKey);
	    }
	    else{
            this.resourceChild.showErrorModal("提交表单错误", data.message);
	    }
	}

	// Resource组件删除资源通知
	deleteResource(resource){
        this.resourceChild.showLoadingModal();
		let postData = {
	      id: resource.id
	    };

        IETool.ieAjax({
	      url: "/api/ApiResourceManage/DeleteApiResource",
	      type: 'post',
	      data: JSON.stringify(postData),
	      contentType: 'application/json',
	      dataType: 'json',
	      success: this.submitBackcall
	    });
	}

	// Resource组件刷新资源通知
	freshenResources(pageIndex, pageSize, searchKey){
		this.getResourceList(pageIndex, pageSize, searchKey);
		this.getResourceNum(searchKey);
	}

    // 获取资源列表
	getResourceList(pageIndex, pageSize, searchKey){
		let postData = {
            pageIndex: pageIndex,
            pageSize: pageSize,
            searchKey: searchKey
        };

        IETool.ieAjax({
			url: "/api/ApiResourceManage/GetApiResources",
            type: 'post',
            data: JSON.stringify(postData),
            contentType: 'application/json',
            dataType: 'json',
            success: function(data){
		        if(data.isSuccess == true)
		        {
		        	this.resourceChild.resetResources(data.value.apiResources, pageIndex);
		        }
		    }.bind(this)
		});
	}

    // 获取资源数量
    getResourceNum(searchKey){
        let postData = {
        	searchKey:searchKey
        };

        IETool.ieAjax({
            url: "/api/ApiResourceManage/GetApiResourceNum",
            type: 'post',
            data: JSON.stringify(postData),
            contentType: 'application/json',
            dataType: 'json',
            success: function(data){
		        if(data.isSuccess == true)
		        {
		        	this.resourceChild.resetResourceNum(data.value.resourceNum);
		        }
		    }.bind(this)
        });
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
                hideAdd={true}
                hideEdit={true}
				describes={this.describes}
				freshenResources={this.freshenResources}
				deleteResource={this.deleteResource}
                setResourceRef={(ref)=>{this.resourceChild = ref}} 
                customizeOperateBtns={customizeOperateBtns}
                />
			</div>
		);
	}
} 