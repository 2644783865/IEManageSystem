import React from 'react';
import ReactDOM from 'react-dom';
import UserInfoCss from './AccountSecurity.css';
import imgAvatar from 'images/default_avatar.png';

import ErrorModal from 'ErrorModal/ErrorModal.jsx';
import LoadingModal from 'LoadingModal/LoadingModal.jsx';

export default class AccountSecurity extends React.Component {
    constructor(props) {
        super(props);

        this.headSculptureBase64 = "";

        this.state = {
            userName: "",
            emailAddress: "",
            name: "",
            phone: "",
            personSignature: "",
            headSculpture: "",
            problem: "",
            problemReadonly: true,
            answer: "",
            answerReadonly: true,
            oldPassword: "",
            newPassword: ""
        };

        this._getUserInfo = this._getUserInfo.bind(this);
        this._setSafetyProblem = this._setSafetyProblem.bind(this);
        this._setPassage = this._setPassage.bind(this);

        this._getUserInfo();
    }

    componentDidMount() {
        $(':input:not(.labelauty)').labelauty();
    }

    componentDidUpdate() {
        $(':input:not(.labelauty)').labelauty();
    }

    _getUserInfo() {
        let postData = {};

        IETool.ieAjax({
            url: "/api/User/GetUserInfo",
            type: 'post',
            data: JSON.stringify(postData),
            contentType: 'application/json',
            dataType: 'json',
            success: function (data) {
                if (data.isSuccess === true) {
                    let birthDate = new Date();
                    if (data.value.user.birthDate !== null) {
                        birthDate = new Date(data.value.user.birthDate);
                    }
                    this.setState({
                        userName: data.value.user.account.userName,
                        emailAddress: data.value.user.emailAddress,
                        name: data.value.user.name,
                        phone: data.value.user.phone,
                        personSignature: data.value.user.personSignature,
                        headSculpture: data.value.user.headSculpture,
                        problem: data.value.user.account.safetyProblem.problem,
                        answer: data.value.user.account.safetyProblem.answer
                    });
                }
                else {
                    ErrorModal.showErrorModal("获取用户信息错误", data.message);
                }
            }.bind(this),
        });
    }

    _setSafetyProblem()
    {
        LoadingModal.showModal();

        let postData = {
            problem: this.state.problem,
            answer: this.state.answer
        };

        IETool.ieAjax({
            url: "/api/User/SetSafetyProblem",
            type: 'post',
            data: JSON.stringify(postData),
            contentType: 'application/json',
            dataType: 'json',
            success: function (data)
            {
                LoadingModal.hideModal();

                if (data.isSuccess === true) {
                    return;
                }
                else {
                    ErrorModal.showErrorModal("表单提交错误", data.message);
                }
            }.bind(this),
        });
    }

    _setPassage()
    {
        LoadingModal.showModal();

        let postData = {
            oldPassword: this.state.oldPassword,
            newPassword: this.state.newPassword
        };

        IETool.ieAjax({
            url: "/api/User/SetPassage",
            type: 'post',
            data: JSON.stringify(postData),
            contentType: 'application/json',
            dataType: 'json',
            success: function (data) {
                LoadingModal.hideModal();

                if (data.isSuccess === true) {
                    return;
                }
                else {
                    ErrorModal.showErrorModal("表单提交错误", data.message);
                }
            }.bind(this),
        });
    }

    render() {
        let userInfoHeadSculpture = (this.state.headSculpture === null || this.state.headSculpture === "") ? imgAvatar : this.state.headSculpture;
        return (
            <div className="userinfo mb-3">
                <div className="d-flex w-100">
                    <div className="card border-right-0 w-25">
                        <div className="w-100">
                            <img id="userInfoHeadSculpture" className="card-img-top w-100"
                                src={userInfoHeadSculpture} alt="Card image" />
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
                                        (event) => {
                                            this.setState({ userName: event.target.value });
                                        }
                                    }
                                />
                                <div className="input-group-append">
                                    <button className="btn btn-outline-secondary" type="button" data-toggle="modal" data-target="#changePassword">修改登录密码</button>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend userinfo-lable">
                                    <span className="input-group-text">昵称</span>
                                </div>
                                <input value={this.state.name} name="name" type="text" className="form-control" placeholder="请输入昵称" readOnly="true" />
                            </div>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend userinfo-lable">
                                    <span className="input-group-text">手机号</span>
                                </div>
                                <input value={this.state.phone} name="phone" type="text" className="form-control" placeholder="请输入手机号"
                                    readOnly="true"
                                />
                            </div>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend userinfo-lable">
                                    <span className="input-group-text">邮箱号</span>
                                </div>
                                <input value={this.state.emailAddress} name="emailAddress" type="text" className="form-control" placeholder="请输入电子邮箱"
                                    readOnly="true"
                                />
                            </div>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend userinfo-lable">
                                    <span className="input-group-text">个性签名</span>
                                </div>
                                <textarea class="form-control" rows="4" id="comment" placeholder="请输入个性签名"
                                    value={this.state.personSignature}
                                    readOnly="true"
                                ></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-100 mt-3">
                    <h5 className="mb-3">完善账号信息</h5>
                    <div className="col-md-9">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend userinfo-lable">
                                <span className="input-group-text">安全问题</span>
                            </div>
                            <input value={this.state.problem} name="phone" type="text" className="form-control" placeholder="请输入安全问题"
                                readOnly={this.state.problemReadonly}
                                onChange={
                                    (event) => {
                                        this.setState({ problem: event.target.value });
                                    }
                                }
                            />
                            <div className="input-group-append">
                                <button className="btn btn-info" type="button"
                                    onClick={
                                        () => {
                                            this.setState((preState) => ({ problemReadonly: !preState.problemReadonly }));
                                        }
                                    }
                                ><span class="oi oi-pencil padding-right-10" title="icon name" aria-hidden="true"></span>{this.state.problemReadonly ? "编辑" : "保存"}</button>
                            </div>
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend userinfo-lable">
                                <span className="input-group-text">答案</span>
                            </div>
                            <input value={this.state.answer} name="phone" type="text" className="form-control" placeholder="请输入答案"
                                readOnly={this.state.answerReadonly}
                                onChange={
                                    (event) => {
                                        this.setState({ answer: event.target.value });
                                    }
                                }
                            />
                            <div className="input-group-append">
                                <button className="btn btn-info" type="button"
                                    onClick={
                                        () => {
                                            this.setState((preState) => ({ answerReadonly: !preState.answerReadonly }));
                                        }
                                    }
                                ><span class="oi oi-pencil padding-right-10" title="icon name" aria-hidden="true"></span>{this.state.answerReadonly ? "编辑" : "保存"}</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-100 mt-3">
                    <button className="btn btn-info float-right" type="button" onClick={this._setSafetyProblem}>提交修改</button>
                    <button className="btn btn-secondary float-right mr-3" type="button" onClick={this._getUserInfo}>取消修改</button>
                </div>
                <div className="modal fade" id="changePassword">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header bg-info text-white">
                                <h5 className="modal-title">修改用户密码</h5>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">输入原密码</span>
                                    </div>
                                    <input type="text" className="form-control" placeholder="请输入原密码" name="oldPassword"
                                        value={this.state.oldPassword}
                                        onChange={(event) => {
                                            this.setState({ oldPassword: event.target.value });
                                        }}
                                    />
                                </div>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">输入新密码</span>
                                    </div>
                                    <input type="text" className="form-control" placeholder="请输入新密码" name="newPassword"
                                        value={this.state.newPassword}
                                        onChange={(event) => {
                                            this.setState({ newPassword: event.target.value });
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">关闭</button>
                                <button type="button" className="btn btn-info" data-dismiss="modal" onClick={this._setPassage}>提交</button>
                            </div>
                        </div>
                    </div>
                </div>
                <ErrorModal />
                <LoadingModal />
            </div>
        );
    }
}