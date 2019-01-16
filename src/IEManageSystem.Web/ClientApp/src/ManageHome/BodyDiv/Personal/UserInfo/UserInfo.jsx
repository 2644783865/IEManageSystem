import React from 'react';
import ReactDOM from 'react-dom';
import UserInfoCss from './UserInfo.css';

export default class UserInfo extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        return(
            <div className="row d-flex">
	            <div className="card w-25">
	                <div className="w-100">
	                    <div className="inputfile-img">
	                        <button className="btn btn-outline-info text-white">修改头像</button>
	                        <input type="file" id="customFile"/>
	                    </div>
	                    <img className="card-img-top w-100" src={require('./img_avatar.png')} alt="Card image" />
	                </div>
	                <div className="card-body">
	                  <h6 className="card-title">昵称</h6>
	                  <p className="card-text">Some example text some example text. John Doe is an architect and engineer</p>
	                </div>
	            </div>
	            <div className="card text-white flex-grow-1">
	                <div className="card-body">
	                    <div className="input-group mb-3 w-75 float-left">
	                        <div className="input-group-prepend">
	                          <span className="input-group-text">账号</span>
	                        </div>
	                        <input type="text" className="form-control" placeholder="AccountNo" readonly="readonly"/>
	                        <div className="input-group-append">
	                            <button className="btn btn-outline-secondary" type="button">修改登录密码</button>
	                        </div>
	                    </div>
	                    <div className="input-group mb-3">
	                        <div className="input-group-prepend">
	                          <span className="input-group-text">手机号</span>
	                        </div>
	                        <input type="text" className="form-control" placeholder="PhoneNum"/>
	                        <div className="input-group-append">
	                          <button className="btn btn-info" type="button">编辑</button>  
	                        </div>
	                    </div>
	                    <div className="input-group mb-3">
	                        <div className="input-group-prepend">
	                          <span className="input-group-text">邮箱号</span>
	                        </div>
	                        <input type="text" className="form-control" placeholder="电子邮箱"/>
	                        <div className="input-group-append">
	                          <button className="btn btn-info" type="button">编辑</button>  
	                        </div>
	                    </div>
	                </div>
	                <div className="card-footer">
	                    <button className="btn btn-info float-right" type="button">提交修改</button>
	                </div>
	            </div>
	        </div>
        );
    }
}