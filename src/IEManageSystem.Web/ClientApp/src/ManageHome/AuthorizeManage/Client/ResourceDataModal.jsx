import React from 'react';
import ReactDOM from 'react-dom';

export default class ResourceDataModal extends React.Component
{
	constructor(props){
		super(props);
	}	
	
	render(){
		return (
			<div class="modal fade" id="resourceData">
			  <div class="modal-dialog modal-lg">
			    <div class="modal-content">
			 
			      <div class="modal-header bg-info text-white">
			        <h4 class="modal-title">客户端数据</h4>
			        <button type="button" class="close" data-dismiss="modal">&times;</button>
			      </div>
			 
			      <div class="modal-body">
			        <form id="resourceDataForm" data-element="dataElement" data-iP="true">
			          <input id="resourceId" type="text" class="form-control" value="" data-element="dataElement" data-n="id" hidden="hidden" />
			          <div id="resourceDataError" class="text-danger error"></div>
			          <div class="form-group">
			            <label for="text">客户端Id</label>
			            <input id="clientId" type="text" class="form-control" value="" data-element="dataElement" data-n="clientId"/>
			          </div>

			          <div class="form-group">
			            <label for="text">密匙（如果无需修改，则不要填写值）</label>
			            <input id="clientSecret" type="text" class="form-control" value="" data-element="dataElement" data-n="clientSecret"/>
			          </div>
			          <div class="checkbox-list">
			            <div class="form-group">
			              <label for="text">认证类型</label>
			            </div>
			            <div class="overflowhidden" data-element="dataElement" data-n="allowedGrantType" data-iL="true">
			              <label class="radio-inline col-md-6">
			                <input class="radio float-left" type="radio" name="allowedGrantType" value="" data-element="dataElement" data-p-n="allowedGrantType"/>
			                <span class="float-left overflowhidden" data-element="dataElement" data-p-n="allowedGrantType">
			                  &nbsp
			                </span>
			              </label>
			            </div>
			          </div>
			          
			          <div class="checkbox-list">
			            <div class="form-group">
			              <label for="text">身份资源域</label>
			            </div>
			            <div id="identityResourceScopes" class="overflowhidden" data-element="dataElement" data-n="identityResourceScopes" data-iL="true">
			              <label class="col-md-4 float-left input-text">
			                <input class="checkbox" type="checkbox" value="" data-element="dataElement" data-p-n="identityResourceScopes" >
			                <span class="" data-element="dataElement" data-p-n="identityResourceScopes">
			                  
			                </span>
			                </input>
			              </label>
			            </div>
			          </div>
			          
			          <div class="checkbox-list">
			            <div class="form-group">
			              <label for="text">Api资源域</label>
			            </div>
			            <div id="apiResourceScopes" class="overflowhidden" data-element="dataElement" data-n="apiResourceScopes" data-iL="true">
			              <label class="col-md-4 float-left input-text">
			                <input class="checkbox" type="checkbox" value="" data-element="dataElement" data-p-n="apiResourceScopes" >
			                <span class="" data-element="dataElement" data-p-n="apiResourceScopes">
			                  
			                </span>
			                </input>
			              </label>
			            </div>
			          </div>
			          

			          <div class="form-group">
			            <label for="text">登录重定向地址</label>
			            <input id="redirectUri" type="text" class="form-control" value="" data-element="dataElement" data-n="redirectUri"/>
			          </div>
			          <div class="form-group">
			            <label for="text">登出重定向地址</label>
			            <input id="postLogoutRedirectUri" type="text" class="form-control" value="" data-element="dataElement" data-n="postLogoutRedirectUri"/>
			          </div>
			          <div class="form-group">
			            <label for="text">允许离线共享</label>
			            <div>
			              <label class="radio-inline">
			                <input class="radio float-left" type="radio" name="allowOfflineAccess" value="true"/>
			                <span class="float-left">
			                  &nbsp是
			                </span>
			              </label>
			              &nbsp&nbsp&nbsp&nbsp&nbsp
			              <label class="radio-inline">
			                <input class="radio float-left" type="radio" name="allowOfflineAccess" value="false"/>
			                <span class="float-left">&nbsp否</span>
			              </label>
			            </div>
			          </div>
			        </form>
			      </div>
			 
			      <div class="modal-footer bg-info">
			        <button id="resourceDataSubmit" type="button" class="btn btn-primary" onclick="resourceDataSubmitHandle()">提交</button>
			        <button id="resourceDataClose" type="button" class="btn btn-secondary" data-dismiss="modal">关闭</button>
			      </div>
			 
			    </div>
			  </div>
			</div>
		);
	}
}