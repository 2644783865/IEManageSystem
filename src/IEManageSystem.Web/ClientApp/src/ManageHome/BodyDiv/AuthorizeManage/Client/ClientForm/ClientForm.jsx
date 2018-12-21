import React from 'react';
import ReactDOM from 'react-dom';

export default class ClientForm extends React.Component
{
	constructor(props){
		super(props);

    this.submitUrl = "";

    this.state = {
      grantTypeGroupNames: new Array(),
      identityResources: new Array(),
      apiResources: new Array(),
      redirectUris: new Array(),
      postLogoutRedirectUris: new Array()
    };

    this.getClientGrantTypeGroupNamesBackcall = this.getClientGrantTypeGroupNamesBackcall.bind(this);
    this.getClientGrantTypeGroupNames();

    this.getIdentityResourcesBackcall = this.getIdentityResourcesBackcall.bind(this);
    this.getIdentityResources();

    this.getApiResourcesBackcall = this.getApiResourcesBackcall.bind(this);
    this.getApiResources();

    this.redirectUrisAddClick = this.redirectUrisAddClick.bind(this);
    this.redirectUrisDeleteClick = this.redirectUrisDeleteClick.bind(this);
    this.redirectUrisOnChange = this.redirectUrisOnChange.bind(this);
    this.postLogoutRedirectUrisAddClick = this.postLogoutRedirectUrisAddClick.bind(this);
    this.postLogoutRedirectUrisDeleteClick = this.postLogoutRedirectUrisDeleteClick.bind(this);
    this.postLogoutRedirectUrisOnChange = this.postLogoutRedirectUrisOnChange.bind(this);
    this.submitBackcall = this.submitBackcall.bind(this);
    this.submit = this.submit.bind(this);
	}

	componentDidMount(){
    $("#dataFormBtn").click();
    $(':input:not(.labelauty)').labelauty();
	}

  componentWillReceiveProps(nextProps){
    $("#dataFormBtn").click();
  }

	componentDidUpdate(){
    $(':input:not(.labelauty)').labelauty();
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
  
  // 登录重定向添加单击
  redirectUrisAddClick(){
    this.setState(
      (preState)=>{
        preState.redirectUris.push("");
        return ({ redirectUris: preState.redirectUris });
      }
    )
  }

  // 登录重定向删除单击
  redirectUrisDeleteClick(index){
    this.setState(
      (preState)=>{
        preState.redirectUris.splice(index, 1);
        return ({ redirectUris: preState.redirectUris });
      }
    )
  }

  // 登录重定向表单输入
  redirectUrisOnChange(index, value)
  {
    this.setState(
      (preState)=>{
        preState.redirectUris[index] = value;
        return ({ redirectUris: preState.redirectUris });
      }
    )
  }

  // 退出登录重定向添加单击
  postLogoutRedirectUrisAddClick(){
    this.setState(
      (preState)=>{
        preState.postLogoutRedirectUris.push("");
        return ({ postLogoutRedirectUris: preState.postLogoutRedirectUris });
      }
    )
  }

  // 退出登录重定向删除单击
  postLogoutRedirectUrisDeleteClick(index){
    this.setState(
      (preState)=>{
        preState.postLogoutRedirectUris.splice(index, 1);
        return ({ postLogoutRedirectUris: preState.postLogoutRedirectUris });
      }
    )
  }

  // 退出登录重定向表单输入
  postLogoutRedirectUrisOnChange(index, value){
    this.setState(
      (preState)=>{
        preState.postLogoutRedirectUris[index] = value;
        return ({ postLogoutRedirectUris: preState.postLogoutRedirectUris });
      }
    )
  }

  // 提交回调
  submitBackcall(data){
    if(data.isSuccess == true)
    {
      $("#dataFormCloseBtn").click();
      this.props.freshen();
    }
  }

  // 提交
  submit(){
    let clientId = $("input[name=clientId]").val();
    let clientSecret = $("input[name=clientSecret]").val();
    let allowedGrantType = $("input[name=allowedGrantType]:checked").val();
    let allowedScopes = Array();
    let allowedScopeEqs = $("input[name=allowedScopes]:checked");
    for(let item = 0; item < allowedScopeEqs.length; item++){
      allowedScopes.push(allowedScopeEqs.eq(item).val());
    }
    let redirectUris = this.state.redirectUris;
    let postLogoutRedirectUris = this.state.postLogoutRedirectUris;
    let allowAccessTokensViaBrowser = $("input[name=allowAccessTokensViaBrowser]:checked").val();
    let accessTokenType = $("input[name=accessTokenType]:checked").val();
    let enabled = $("input[name=enabled]:checked").val();
    let allowOfflineAccess = $("input[name=allowOfflineAccess]:checked").val();

    let postData = {
      clientId:clientId,
      clientSecret:clientSecret,
      allowedGrantType:allowedGrantType,
      allowedScopes:allowedScopes,
      redirectUris:redirectUris,
      postLogoutRedirectUris:postLogoutRedirectUris,
      allowAccessTokensViaBrowser:allowAccessTokensViaBrowser,
      accessTokenType:accessTokenType,
      enabled:enabled,
      allowOfflineAccess:allowOfflineAccess
    }

    $.ajax({
      url: this.submitUrl,
      type: 'post',
      data: JSON.stringify(postData),
      contentType: 'application/json',
      dataType: 'json',
      success: this.submitBackcall
    });

    console.log(postData);
  }
	
	render(){
    let allowedGrantTypeLis = this.state.grantTypeGroupNames.map(
      item=><li><input type="radio" name="allowedGrantType" data-labelauty={ item } defaultValue={item} /></li>);

    let identityResourceLis = this.state.identityResources.map(
      item=><li><input type="checkbox" name="allowedScopes" data-labelauty={ item } defaultValue={item} /></li>);

    let apiResourceLis = this.state.apiResources.map(
      item=><li><input type="checkbox" name="allowedScopes" data-labelauty={ item } defaultValue={item} /></li>);

    let redirectUriList = this.state.redirectUris.map(
      (item, index)=><div className="d-flex margin-buttom10">
              <input name="redirectUris" type="text" className="form-control" value={item} 
                onChange={(event)=>this.redirectUrisOnChange(index, event.target.value)} />
              <button className="btn btn-danger btn-sm" onClick={()=>this.redirectUrisDeleteClick(index)}>删除</button>
            </div>);

    let postLogoutRedirectUriList = this.state.postLogoutRedirectUris.map(
      (item, index)=><div className="d-flex margin-buttom10">
              <input name="postLogoutRedirectUris" type="text" className="form-control" value={item}
                onChange={(event)=>this.postLogoutRedirectUrisOnChange(index, event.target.value)} />
              <button className="btn btn-danger btn-sm" onClick={()=>this.postLogoutRedirectUrisDeleteClick(index)}>删除</button>
            </div>);

		return (
      <div>
        <button id="dataFormBtn" type="button" className="btn btn-info" data-toggle="modal" data-target="#dataForm"  hidden="hidden">+添加</button>
        <div className="modal fade data-form" id="dataForm">
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
                    <input name="clientId" type="text" className="form-control" placeholder="客户端Id" />
                </div>
                <div className="input-group mb-3 col-md-12">
                    <div className="input-group-prepend">
                      <span className="input-group-text">客户端密钥</span>
                    </div>
                    <input name="clientSecret" type="text" className="form-control" placeholder="密钥（如不填写则无需修改）" />
                </div>
                <div className="col-md-12 float-left">
                    <div className="card">
                      <div className="card-header bg-secondary text-white">认证类型</div>
                      <div className="card-body">
                            <ul>
                              {allowedGrantTypeLis}
                            </ul>
                      </div> 
                    </div>
                </div>
                <div className="col-md-12 float-left">
                    <div className="card">
                      <div className="card-header bg-secondary text-white">身份资源域</div>
                      <div className="card-body">
                            <ul>
                              {identityResourceLis}
                            </ul>
                      </div> 
                    </div>
                </div>
                <div className="col-md-12 float-left">
                    <div className="card">
                      <div className="card-header bg-secondary text-white">Api资源域</div>
                      <div className="card-body">
                          <ul>
                            {apiResourceLis}
                          </ul>
                      </div> 
                    </div>
                </div>
                
                <div className="w-100 float-left">
                    <div className="col-md-6 float-left">
                        <div className="card">
                          <div className="card-header bg-secondary text-white">登录重定向地址</div>
                          <div className="card-body">
                                {redirectUriList}
                                <button className="btn btn-success btn-sm" onClick={this.redirectUrisAddClick}>+添加</button>
                          </div> 
                        </div>
                    </div>
                    <div className="col-md-6 float-left">
                        <div className="card">
                          <div className="card-header bg-secondary text-white">登出重定向地址</div>
                          <div className="card-body">
                                {postLogoutRedirectUriList}
                                <button className="btn btn-success btn-sm" onClick={this.postLogoutRedirectUrisAddClick}>+添加</button>
                          </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-12 float-left">
                    <div className="card">
                      <div className="card-header bg-secondary text-white">其他选项</div>
                      <div className="card-body">
                        <div className="col-md-6 float-left">
                            <h6 className="margin-buttom10">允许浏览器访问</h6>
                            <ul>
                                <li><input type="radio" name="allowAccessTokensViaBrowser" defaultValue="true" data-labelauty="允许" /></li>
                                <li><input type="radio" name="allowAccessTokensViaBrowser" defaultValue="false" data-labelauty="不允许" /></li>
                            </ul>
                        </div>
                        <div className="col-md-6 float-left">
                            <h6 className="margin-buttom10">Token类型</h6>
                            <ul>
                                <li><input type="radio" name="accessTokenType" defaultValue="jwt" data-labelauty="JWTToken" /></li>
                                <li><input type="radio" name="accessTokenType" defaultValue="reference" data-labelauty="ReferenceToken" /></li>
                            </ul>
                        </div>
                        <div className="col-md-6 float-left">
                            <h6 className="margin-buttom10">是否启用</h6>
                            <ul>
                                <li><input type="radio" name="enabled" defaultValue="true" data-labelauty="启用" /></li>
                                <li><input type="radio" name="enabled" defaultValue="false" data-labelauty="禁用" /></li>
                            </ul>
                        </div>
                        <div className="col-md-6 float-left">
                            <h6 className="margin-buttom10">离线共享</h6>
                            <ul>
                                <li><input type="radio" name="allowOfflineAccess" defaultValue="true" data-labelauty="启用" /></li>
                                <li><input type="radio" name="allowOfflineAccess" defaultValue="false" data-labelauty="禁用" /></li>
                            </ul>
                        </div>
                      </div> 
                    </div>
                </div>
              </div>
         
              <div className="modal-footer">
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