import React from 'react';
import ReactDOM from 'react-dom';
import Resource from 'Resource/Resource.jsx';

export default class AdminManage extends React.Component
{
	constructor(props){
		super(props);

		this.describes=[
			{name:"id", isId:true, isAddShow:false, isEditShow:false, isLookupShow:false},
			{name:"userName", text:"用户名", isName:true, isShowOnList:true, isEditCanEdit:false},
			{name:"password", text:"密码"},
			{name:"emailAddress", text:"邮箱地址", isShowOnList:true},
			{name:"name", text:"昵称", isShowOnList:true},
			{name:"phone", text:"手机号", isShowOnList:true},
		];

		this.resourceChild = null;

        this.submitBackcall = this.submitBackcall.bind(this);
    	this.addResource = this.addResource.bind(this);
    	this.updateResource = this.updateResource.bind(this);
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
        else {
            this.resourceChild.showErrorModal("提交表单错误", data.message);
	    }
	}

	// Resource组件添加资源通知
	addResource(resource){
        this.resourceChild.showLoadingModal();
		let postData = resource;

	    IETool.ieAjax({
	      url: "/api/AdminManage/CreateAdmin",
	      type: 'post',
	      data: JSON.stringify(postData),
	      contentType: 'application/json',
	      dataType: 'json',
	      success: this.submitBackcall
	    });
	}

	// Resource组件更新资源通知
	updateResource(resource){
        this.resourceChild.showLoadingModal();
		let postData = resource;

	    IETool.ieAjax({
	      url: "/api/AdminManage/UpdateAdmin",
	      type: 'post',
	      data: JSON.stringify(postData),
	      contentType: 'application/json',
	      dataType: 'json',
	      success: this.submitBackcall
	    });
	}

	// Resource组件删除资源通知
	deleteResource(resource){
        this.resourceChild.showLoadingModal();
		let postData = {
	      id: resource.id
	    };

	    IETool.ieAjax({
	      url: "/api/AdminManage/DeleteAdmin",
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
			url: "/api/AdminManage/GetAdmins",
            type: 'post',
            data: JSON.stringify(postData),
            contentType: 'application/json',
            dataType: 'json',
            success: function(data){
		        if(data.isSuccess === true)
                {
                    let admins = data.value.admins;
                    admins.map((item) => {
                        item.userName = item.account.userName;
                    });
		        	this.resourceChild.resetResources(data.value.admins, pageIndex);
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
            url: "/api/AdminManage/GetAdminNum",
            type: 'post',
            data: JSON.stringify(postData),
            contentType: 'application/json',
            dataType: 'json',
            success: function(data){
		        if(data.isSuccess == true)
		        {
		        	this.resourceChild.resetResourceNum(data.value.num);
		        }
		    }.bind(this)
        });
    }

	render(){
		return(
			<div className="col-md-12">
				<Resource
				title="管理员管理"
				describes={this.describes}
				freshenResources={this.freshenResources}
				addResource={this.addResource}
				updateResource={this.updateResource}
				deleteResource={this.deleteResource}
				setResourceRef={(ref)=>{this.resourceChild = ref}} />
			</div>
		);
	}
}