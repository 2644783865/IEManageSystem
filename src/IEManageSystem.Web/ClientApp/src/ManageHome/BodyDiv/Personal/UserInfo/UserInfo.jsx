import React from 'react';
import ReactDOM from 'react-dom';
import UserInfoCss from './UserInfo.css';
import imgAvatar from 'images/default_avatar.png';

export default class UserInfo extends React.Component
{
    constructor(props)
    {
        super(props);

        this.headSculptureBase64 = "";

        this.state = {
        	userName:"",
        	emailAddress:"",
        	emailAddressReadonly:true,
        	name:"",
        	nameReadonly:true,
        	phone:"",
        	phoneReadonly:true,
        	personSignature:"",
        	headSculpture:"",
        };

        this._readFile = this._readFile.bind(this);
        this._getUserInfo = this._getUserInfo.bind(this);
        this._setUserInfo = this._setUserInfo.bind(this);

        this._getUserInfo();
    }

    _readFile(event) 
    {
        var file = event.target.files[0];

        //判断是否是图片类型
        if (!/image\/\w+/.test(file.type)) 
        {
            alert("只能选择图片");
            return false;
        }

        var reader = new FileReader();
        reader.onload = function(e){
        	this.headSculptureBase64 = e.target.result;
        	this.setState({headSculpture:e.target.result});
        }.bind(this);
        reader.readAsDataURL(file);
    }

    _getUserInfo(){
    	let postData = {};

        $.ajax({
            url: "/api/User/GetUserInfo",
            type: 'post',
            data: JSON.stringify(postData),
            contentType: 'application/json',
            dataType: 'json',
            success: function (data) {
                if (data.isSuccess == true) {
                    this.setState({
			        	userName:data.value.user.userName,
			        	emailAddress:data.value.user.emailAddress,
			        	name:data.value.user.name,
			        	phone:data.value.user.phone,
			        	personSignature:data.value.user.personSignature,
			        	headSculpture:data.value.user.headSculpture,
			        });
                }
            }.bind(this),
        });
    }

    _setUserInfo(){
    	let postData = {
    		userName:this.state.userName,
			emailAddress:this.state.emailAddress,
			name:this.state.name,
			phone:this.state.phone,
			personSignature:this.state.personSignature,
			headSculpture:this.headSculptureBase64,
    	};

        $.ajax({
            url: "/api/User/SetUserInfo",
            type: 'post',
            data: JSON.stringify(postData),
            contentType: 'application/json',
            dataType: 'json',
            success: function (data) {
                if (data.isSuccess == true) {
                    this._getUserInfo();
                }
            }.bind(this),
        });
    }

    render()
    {
    	let userInfoHeadSculpture = (this.state.headSculpture == null || this.state.headSculpture == "") ? imgAvatar:this.state.headSculpture;
        return(
            <div className="row d-flex userinfo">
	            <div className="card border-right-0 w-25">
	                <div className="w-100">
	                    <div className="inputfile-img">
	                        <button className="btn text-white">修改头像</button>
	                        <input name="headSculpture" type="file" onChange={this._readFile}/>
	                    </div>
	                    <img id="userInfoHeadSculpture" className="card-img-top w-100" 
	                    	src={ userInfoHeadSculpture} alt="Card image" />
	                </div>
	                <div className="card-body">
	                  <h6 className="card-title">{this.state.name}</h6>
	                  <p className="card-text">{this.state.personSignature}</p>
	                </div>
	            </div>
	            <div className="card text-white flex-grow-1">
	                <div className="card-body">
	                    <div className="input-group mb-3 w-75 float-left">
	                        <div className="input-group-prepend userinfo-lable">
	                          <span className="input-group-text">账号</span>
	                        </div>
	                        <input value={this.state.userName} name="userName" type="text" className="form-control" placeholder="AccountNo" readonly="readonly"
	                        	onChange={
	                        		(event)=>{
	                        			this.setState({userName:event.target.value});
	                        		}
	                        	}
	                        />
	                        <div className="input-group-append">
	                            <button className="btn btn-outline-secondary" type="button">修改登录密码</button>
	                        </div>
	                    </div>
	                    <div className="input-group mb-3">
	                        <div className="input-group-prepend userinfo-lable">
	                          <span className="input-group-text">昵称</span>
	                        </div>
	                        <input value={this.state.name} name="name" type="text" className="form-control" placeholder="请输入昵称"
	                        	readOnly={this.state.nameReadonly}
	                        	onChange={
	                        		(event)=>{
	                        			this.setState({name:event.target.value});
	                        		}
	                        	}
	                        />
	                        <div className="input-group-append">
	                          <button className="btn btn-info" type="button"
	                          	onClick={
	                          		()=>{
	                          			this.setState((preState)=>({nameReadonly:!preState.nameReadonly}));
	                          		}
	                          	}
	                          ><span class="oi oi-pencil padding-right-10" title="icon name" aria-hidden="true"></span>{this.state.nameReadonly ? "编辑":"保存"}</button>  
	                        </div>
	                    </div>
	                    <div className="input-group mb-3">
	                        <div className="input-group-prepend userinfo-lable">
	                          <span className="input-group-text">手机号</span>
	                        </div>
	                        <input value={this.state.phone} name="phone" type="text" className="form-control" placeholder="请输入手机号"
	                        	readOnly={this.state.phoneReadonly}
	                        	onChange={
	                        		(event)=>{
	                        			this.setState({phone:event.target.value});
	                        		}
	                        	}
	                        />
	                        <div className="input-group-append">
	                          <button className="btn btn-info" type="button"
	                          	onClick={
	                          		()=>{
	                          			this.setState((preState)=>({phoneReadonly:!preState.phoneReadonly}));
	                          		}
	                          	}
	                          ><span class="oi oi-pencil padding-right-10" title="icon name" aria-hidden="true"></span>{this.state.phoneReadonly ? "编辑":"保存"}</button>  
	                        </div>
	                    </div>
	                    <div className="input-group mb-3">
	                        <div className="input-group-prepend userinfo-lable">
	                          <span className="input-group-text">邮箱号</span>
	                        </div>
	                        <input value={this.state.emailAddress} name="emailAddress" type="text" className="form-control" placeholder="请输入电子邮箱"
	                        	readOnly={this.state.emailAddressReadonly}
	                        	onChange={
	                        		(event)=>{
	                        			this.setState({emailAddress:event.target.value});
	                        		}
	                        	}
	                        />
	                        <div className="input-group-append">
	                          <button className="btn btn-info" type="button"
	                          	onClick={
	                          		()=>{
	                          			this.setState((preState)=>({emailAddressReadonly:!preState.emailAddressReadonly}));
	                          		}
	                          	}
	                          ><span class="oi oi-pencil padding-right-10" title="icon name" aria-hidden="true"></span>{this.state.emailAddressReadonly ? "编辑":"保存"}</button>  
	                        </div>
	                    </div>
	                    <div className="input-group mb-3">
	                        <div className="input-group-prepend userinfo-lable">
	                          <span className="input-group-text">个性签名</span>
	                        </div>
	                        <textarea class="form-control" rows="4" id="comment" placeholder="请输入个性签名" 
	                        	value={this.state.personSignature}
	                        	onChange={
	                        		(event)=>{
	                        			this.setState({personSignature:event.target.value});
	                        		}
	                        	}
	                        ></textarea>
	                    </div>
	                </div>
	                <div className="card-footer">
	                    <button className="btn btn-info float-right" type="button" onClick={this._setUserInfo}>提交修改</button>
	                </div>
	            </div>
	        </div>
        );
    }
}