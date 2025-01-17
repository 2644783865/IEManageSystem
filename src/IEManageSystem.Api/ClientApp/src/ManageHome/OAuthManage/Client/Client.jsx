import React from 'react';
import Resource from 'Resource/Resource.jsx';

export default class Client extends React.Component
{
	constructor(props){
		super(props);

		this.grantTypeGroup = new Array();

		this.identityResources = new Array();

		this.apiResources = new Array();

		this.describes=[
			{name:"id", isId:true, isAddShow:false, isEditShow:false, isLookupShow:false},
			{name:"clientId", text:"客户端Id", isName:true, isShowOnList:true, isEditCanEdit:false},
			{name:"clientName", text:"客户端名称", isShowOnList:true},
			{name:"clientSecret", text:"客户端密钥"},
			{name:"allowedGrantType", text:"认证类型", isShowOnList:true, valueType:"radio", valueTexts:this.grantTypeGroup},
			{name:"allowedScopes", text:"身份资源", valueType:"check", valueTexts:this.identityResources},
			{name:"allowedScopes", text:"Api资源", valueType:"check", valueTexts:this.apiResources},
			{name:"redirectUris", text:"登录重定向", isShowOnList:true, valueType:"textGroup"},
			{name:"postLogoutRedirectUris", text:"登出重定向", valueType:"textGroup"},
			{
				name:"allowAccessTokensViaBrowser", 
				text:"允许浏览器访问", 
				valueType:"radio", 
				valueTexts:[{text:"允许", value:true}, {text:"不允许", value:false}],
				col: 6,
			},
			{
				name:"accessTokenType", 
				text:"令牌类型", 
				valueType:"radio", 
				valueTexts:[{text:"JWT", value:"jwt"}, 
				{text:"Reference", value:"reference"}],
				col: 6,
			},
			{
				name:"enabled", 
				text:"是否启用", 
				isShowOnList:true, 
				valueType:"radio", 
				valueTexts:[{text:"启用", value:true}, {text:"禁用", value:false}],
				col: 6,
			},
			{
				name:"allowOfflineAccess", 
				text:"是否离线共享", 
				valueType:"radio", 
				valueTexts:[{text:"启用", value:true}, 
				{text:"禁用", value:false}],
				col: 6,
			},
		];

		this.resourceChild = null;

        this.submitBackcall = this.submitBackcall.bind(this);
    	this.addResource = this.addResource.bind(this);
    	this.updateResource = this.updateResource.bind(this);
    	this.deleteResource = this.deleteResource.bind(this);
    	this.freshenResources = this.freshenResources.bind(this);

	    this.getClientGrantTypeGroupNames();
	    this.getIdentityResources();
	    this.getApiResources();
	}
	
	componentDidMount(){
		this.getResourceList(this.resourceChild.pageIndex, this.resourceChild.pageSize, this.resourceChild.searchKey);
        this.getResourceNum(this.resourceChild.searchKey);
	}

	// 提交回调
	submitBackcall(data){
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

	// Resource组件添加资源通知
	addResource(resource){
        this.resourceChild.showLoadingModal();

		let postData = resource;

        IETool.ieAjax({
	      url: "/api/ClientManage/AddClient",
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
	      url: "/api/ClientManage/UpdateClient",
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
	      url: "/api/ClientManage/RemoveClient",
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

	// 获取认证类型组合
	getClientGrantTypeGroupNames() {
	    let postData = {};

        IETool.ieAjax({
	        url: "/api/ClientManage/GetClientGrantTypeGroupNames",
	        type: 'post',
	        data: JSON.stringify(postData),
	        contentType: 'application/json',
	        dataType: 'json',
	        success: function(data){
			    if (data.isSuccess == true) {
			    	for(let item in data.value){
			    		this.grantTypeGroup.push({text:data.value[item], value:data.value[item]});
			    	}
			    }
			}.bind(this)
	    });
	}

	// 获取身份资源
	getIdentityResources() {
	    let postData = {
	        pageIndex: 1,
	        pageSize: 9999
	    };

        IETool.ieAjax({
	        url: "/api/IdentityResourceManage/GetIdentityResources",
	        type: 'post',
	        data: JSON.stringify(postData),
	        contentType: 'application/json',
	        dataType: 'json',
	        success: function(data){
			    if (data.isSuccess == true) {
			        for (let item in data.value.identityResources) {
			            this.identityResources.push({text:data.value.identityResources[item].displayName, value:data.value.identityResources[item].name});
			        }
			    }
			}.bind(this)
	    });
	}

	// 获取Api资源
	getApiResources() {
	    let postData = {
	        pageIndex: 1,
	        pageSize: 9999
	    };

        IETool.ieAjax({
	        url: "/api/ApiResourceManage/GetApiResources",
	        type: 'post',
	        data: JSON.stringify(postData),
	        contentType: 'application/json',
	        dataType: 'json',
	        success: function(data){
			    if (data.isSuccess == true) {
			        for (let item in data.value.apiResources) {
			            this.apiResources.push({text:data.value.apiResources[item].displayName, value:data.value.apiResources[item].name});
			        }
			    }
			}.bind(this)
	    });
	}

    // 获取客户端列表
	getResourceList(pageIndex, pageSize, searchKey){
		let postData = {
            pageIndex: pageIndex,
            pageSize: pageSize,
            searchKey: searchKey
        };

        IETool.ieAjax({
			url: "/api/ClientManage/GetClients",
            type: 'post',
            data: JSON.stringify(postData),
            contentType: 'application/json',
            dataType: 'json',
            success: function(data){
		        if(data.isSuccess == true)
		        {
		        	this.resourceChild.resetResources(data.value.clients, pageIndex);
		        }
		    }.bind(this)
		});
	}

    // 获取客户端数量
    getResourceNum(searchKey){
        let postData = {
        	searchKey:searchKey
        };

        IETool.ieAjax({
            url: "/api/ClientManage/GetClientNum",
            type: 'post',
            data: JSON.stringify(postData),
            contentType: 'application/json',
            dataType: 'json',
            success: function(data){
		        if(data.isSuccess == true)
		        {
		        	this.resourceChild.resetResourceNum(data.value.clientNum);
		        }
		    }.bind(this)
        });
    }

	render(){
		return(
			<div className="col-md-12">
				<Resource
				title="客户端"
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