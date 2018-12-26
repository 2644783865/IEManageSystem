import React from 'react';
import ReactDOM from 'react-dom';
import FormRadio from './FormRadio.jsx';
import FormCheck from './FormCheck.jsx';
import TextGroup from './TextGroup.jsx';

export default class ResourceForm extends React.Component
{
	constructor(props){
		super(props);

    this.submitUrl = "";

    this.resource = null;

    this.state = {
      grantTypeGroupNames: new Array(),
      identityResources: new Array(),
      apiResources: new Array(),
    };

    this.getClientGrantTypeGroupNamesBackcall = this.getClientGrantTypeGroupNamesBackcall.bind(this);
    this.getClientGrantTypeGroupNames();

    this.getIdentityResourcesBackcall = this.getIdentityResourcesBackcall.bind(this);
    this.getIdentityResources();

    this.getApiResourcesBackcall = this.getApiResourcesBackcall.bind(this);
    this.getApiResources();

    this.submit = this.submit.bind(this);
	}

  initClient(inputClient)
  {
    if(inputClient == null){
      this.resource = {
        id: "",
        clientId: "",
        clientSecret: "",
        allowedGrantType: "",
        allowedScopes: new Array(),
        redirectUris: new Array(),
        postLogoutRedirectUris: new Array(),
        allowAccessTokensViaBrowser: true,
        accessTokenType: "jwt",
        enabled: true,
        allowOfflineAccess: true
      };
      return;
    }

    this.resource = Object.assign({}, inputClient);
    this.resource.allowedScopes = Object.assign([], inputClient.allowedScopes);
    this.resource.redirectUris = Object.assign([], inputClient.redirectUris);
    this.resource.postLogoutRedirectUris = Object.assign([], inputClient.postLogoutRedirectUris);
  }

  componentWillMount(){
    this.initClient(this.props.resource);
  }

	componentDidMount(){
    $("#dataFormBtn").click();

    // this.resource = Object.assign({}, this.props.resource);
	}

  componentWillReceiveProps(nextProps){
    $("#dataFormBtn").click();

    this.initClient(nextProps.resource);
  }
  
  // 获取认证类型组合回调
  getClientGrantTypeGroupNamesBackcall(data){
    if(data.isSuccess == true)
    {
      this.setState({ grantTypeGroupNames:data.value });
    }
  }
  
  // 获取认证类型组合
  getClientGrantTypeGroupNames(){
        let postData = {
        };

        $.ajax({
            url: "/api/ClientManage/GetClientGrantTypeGroupNames",
            type: 'post',
            data: JSON.stringify(postData),
            contentType: 'application/json',
            dataType: 'json',
            success: this.getClientGrantTypeGroupNamesBackcall
        });
  }

  // 获取身份资源回调
  getIdentityResourcesBackcall(data){
    if(data.isSuccess == true)
    {
      let identityResources = new Array();
      for(let item in data.value.identityResources){
        identityResources.push(data.value.identityResources[item].name);
      }
      this.setState({ identityResources: identityResources});
    }
  }

  // 获取身份资源
  getIdentityResources(){
    let postData = {
            pageIndex: 1,
            pageSize: 9999
        };

    $.ajax({
      url: "/api/IdentityResourceManage/GetIdentityResources",
            type: 'post',
            data: JSON.stringify(postData),
            contentType: 'application/json',
            dataType: 'json',
            success: this.getIdentityResourcesBackcall
    });
  }

  // 获取Api资源回调
  getApiResourcesBackcall(data){
    if(data.isSuccess == true)
    {
      let resources = new Array();
      for(let item in data.value.apiResources){
        resources.push(data.value.apiResources[item].name);
      }
      this.setState({ apiResources: resources});
    }
  }

  // 获取Api资源
  getApiResources(){
    let postData = {
            pageIndex: 1,
            pageSize: 9999
        };

    $.ajax({
      url: "/api/ApiResourceManage/GetApiResources",
            type: 'post',
            data: JSON.stringify(postData),
            contentType: 'application/json',
            dataType: 'json',
            success: this.getApiResourcesBackcall
    });
  }

  // 提交
  submit()
  {
    this.props.resourceUpdate(this.resource);
    $("#dataFormCloseBtn").click();
  }
	
	render(){
    let allowedGrantTypeUl = <FormRadio 
      name="allowedGrantType" 
      values={this.state.grantTypeGroupNames.map(item=>{return {text:item, value:item}})} 
      selectValue={this.resource.allowedGrantType}
      onChange={(name, selectValue)=>{this.resource.allowedGrantType = selectValue}} />;

    let identityResourceUl = <FormCheck 
      name="allowedScopes" 
      values={this.state.identityResources.map(item=>{return {text:item, value:item}})} 
      selectValues={this.resource.allowedScopes}
      onChange={(name, selectValues)=>{this.resource.allowedScopes = selectValues}} />
    
    let apiResourceUl = <FormCheck
      name="allowedScopes" 
      values={this.state.apiResources.map(item=>{return {text:item, value:item}})} 
      selectValues={this.resource.allowedScopes}
      onChange={(name, selectValues)=>{this.resource.allowedScopes = selectValues}} />

    let redirectUriGroup = <TextGroup 
      name="redirectUris"
      values={this.resource.redirectUris}
      onChange={(name, values)=>{this.resource.redirectUris = values}} />


    let postLogoutRedirectUrisGroup = <TextGroup 
      name="postLogoutRedirectUris"
      values={this.resource.postLogoutRedirectUris}
      onChange={(name, values)=>{this.resource.postLogoutRedirectUris = values}} />

    let allowAccessTokensViaBrowserUl = <FormRadio 
      name="allowAccessTokensViaBrowser" 
      values={[{text:"启用", value:"true"}, {text:"禁用", value:"false"}]} 
      selectValue={this.resource.allowAccessTokensViaBrowser.toString()}
      onChange={(name, selectValue)=>{this.resource.allowAccessTokensViaBrowser = selectValue}} />;

    let accessTokenTypeUl = <FormRadio 
      name="accessTokenType" 
      values={[{text:"JWT", value:"jwt"}, {text:"Reference", value:"reference"}]} 
      selectValue={this.resource.accessTokenType}
      onChange={(name, selectValue)=>{this.resource.accessTokenType = selectValue}} />;

    let enabledUl = <FormRadio 
      name="enabled" 
      values={[{text:"启用", value:"true"}, {text:"禁用", value:"false"}]} 
      selectValue={this.resource.enabled.toString()}
      onChange={(name, selectValue)=>{this.resource.enabled = selectValue}} />;

    let allowOfflineAccessUl = <FormRadio 
      name="allowOfflineAccess" 
      values={[{text:"启用", value:"true"}, {text:"禁用", value:"false"}]} 
      selectValue={this.resource.allowOfflineAccess.toString()}
      onChange={(name, selectValue)=>{this.resource.allowOfflineAccess = selectValue}} />;

		return (
      <div>
        <button id="dataFormBtn" type="button" className="btn btn-info" data-toggle="modal" data-target="#dataForm"  hidden="hidden">+添加</button>
        <div className="modal fade data-form show" id="dataForm">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header bg-info text-white">
                <h4 className="modal-title">客户端信息</h4>
                <button type="button" className="close" data-dismiss="modal">&times;</button>
              </div>
         
              <div className="modal-body jumbotron">
                <div className="input-group mb-3 col-md-12">
                    <div className="input-group-prepend">
                      <span className="input-group-text">客户端Id</span>
                    </div>
                    <input name="clientId" type="text" className="form-control" placeholder="客户端Id"
                    value={this.resource.clientId}
                    onChange={event=>{this.resource.clientId = event.target.value; this.setState()}} />
                </div>
                <div className="input-group mb-3 col-md-12">
                    <div className="input-group-prepend">
                      <span className="input-group-text">客户端密钥</span>
                    </div>
                    <input name="clientSecret" type="text" className="form-control" placeholder="密钥（如不填写则无需修改）"
                    value={this.resource.clientSecret}
                    onChange={event=>{this.resource.clientSecret = event.target.value; this.setState()}} />
                </div>
                <div className="col-md-12 float-left">
                    <div className="card">
                      <div className="card-header bg-secondary text-white">认证类型</div>
                      <div className="card-body">
                        {allowedGrantTypeUl}
                      </div> 
                    </div>
                </div>
                <div className="col-md-12 float-left">
                    <div className="card">
                      <div className="card-header bg-secondary text-white">身份资源域</div>
                      <div className="card-body">
                        {identityResourceUl}
                      </div> 
                    </div>
                </div>
                <div className="col-md-12 float-left">
                    <div className="card">
                      <div className="card-header bg-secondary text-white">Api资源域</div>
                      <div className="card-body">
                        {apiResourceUl}
                      </div> 
                    </div>
                </div>
                
                <div className="w-100 float-left">
                    <div className="col-md-6 float-left">
                        {redirectUriGroup}
                    </div>
                    <div className="col-md-6 float-left">
                        {postLogoutRedirectUrisGroup}
                    </div>
                </div>

                <div className="col-md-12 float-left">
                    <div className="card">
                      <div className="card-header bg-secondary text-white">其他选项</div>
                      <div className="card-body">
                        <div className="col-md-6 float-left">
                            <h6 className="margin-buttom10">允许浏览器访问</h6>
                            {allowAccessTokensViaBrowserUl}
                        </div>
                        <div className="col-md-6 float-left">
                            <h6 className="margin-buttom10">Token类型</h6>
                            {accessTokenTypeUl}
                        </div>
                        <div className="col-md-6 float-left">
                            <h6 className="margin-buttom10">是否启用</h6>
                            {enabledUl}
                        </div>
                        <div className="col-md-6 float-left">
                            <h6 className="margin-buttom10">离线共享</h6>
                            {allowOfflineAccessUl}
                        </div>
                      </div> 
                    </div>
                </div>
              </div>
         
              <div className="modal-footer">
                <span id="dataFormError" className="text-danger"></span>
                <button type="button" className="btn btn-info" onClick={ this.submit }>提交</button>
                <button id="dataFormCloseBtn" type="button" className="btn btn-secondary" data-dismiss="modal">关闭</button>
              </div>
         
            </div>
          </div>
        </div>
      </div>
		);
	}
}