import React from 'react';
import ReactDOM from 'react-dom';

require("./js/jquery-labelauty.js");
require("./Client.css");
require("./css/jquery-labelauty.css");

export default class Client extends React.Component
{
	constructor(props){
		super(props);
	}

	componentDidMount(){
		$(':input').labelauty();
	}

	componentDidUpdate(){
		$(':input').labelauty();
	}
	
	render(){
		return (
		<div className="row">
            <div className="data-list w-100">
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Search" />
                    <div className="input-group-append">
                      <button className="btn btn-info" type="submit">搜索一下</button>  
                    </div>
                </div>
                <h5>客户端列表</h5>
                <table className="table table-hover table-dark table-striped text-white">
                    <thead>
                        <tr>
                            <th>客户端Id</th>
                            <th>认证类型</th>
                            <th>Token类型</th>
                            <th>启用状态</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Default</td>
                            <td>Defaultson</td>
                            <td>Defaultson</td>
                            <td>def@somemail.com</td>
                            <td>
                                <div className="btn-group btn-group-sm">
                                    <button type="button" className="btn btn-primary">编辑</button>
                                    <button type="button" className="btn btn-danger" data-toggle="modal" data-target="#dataDelete">删除</button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>Default</td>
                            <td>Defaultson</td>
                            <td>Defaultson</td>
                            <td>def@somemail.com</td>
                            <td>
                                <div className="btn-group btn-group-sm">
                                    <button type="button" className="btn btn-primary">编辑</button>
                                    <button type="button" className="btn btn-danger" data-toggle="modal" data-target="#dataDelete">删除</button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="data-paging d-flex justify-content-between w-100">
                <ul className="pagination pagination-md">
                    <li className="page-item"><a className="page-link" href="#">上一页</a></li>
                    <li className="page-item"><a className="page-link" href="#">1</a></li>
                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                    <li className="page-item"><a className="page-link" href="#">下一页</a></li>
                </ul>
                <div>
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
                                <input type="text" className="form-control" placeholder="客户端Id" />
                            </div>
                            <div className="input-group mb-3 col-md-12">
                                <div className="input-group-prepend">
                                  <span className="input-group-text">客户端密钥</span>
                                </div>
                                <input type="text" className="form-control" placeholder="密钥（如不填写则无需修改）" />
                            </div>
                            <div className="col-md-12 float-left">
                                <div className="card">
                                  <div className="card-header bg-secondary text-white">认证类型</div>
                                  <div className="card-body">
                                        <ul>
                                            <li><input type="radio" name="radio0" data-labelauty="CSS" /></li>
                                            <li><input type="radio" name="radio0" data-labelauty="JavaScript" /></li>
                                            <li><input type="radio" name="radio0" data-labelauty="SEO" /></li>
                                            <li><input type="radio" name="radio0" data-labelauty="PHP" /></li>
                                            <li><input type="radio" name="radio0" data-labelauty="JAVA" /></li>
                                            <li><input type="radio" name="radio0" data-labelauty=".NET" /></li>
                                        </ul>
                                  </div> 
                                </div>
                            </div>
                            <div className="col-md-12 float-left">
                                <div className="card">
                                  <div className="card-header bg-secondary text-white">身份资源域</div>
                                  <div className="card-body">
                                        <ul>
                                            <li><input type="checkbox" name="checkbox" disabled checked data-labelauty="HTML" /></li>
                                            <li><input type="checkbox" name="checkbox" data-labelauty="CSS" /></li>
                                            <li><input type="checkbox" name="checkbox" data-labelauty="JavaScript" /></li>
                                            <li><input type="checkbox" name="checkbox" data-labelauty="SEO" /></li>
                                            <li><input type="checkbox" name="checkbox" data-labelauty="PHP" /></li>
                                            <li><input type="checkbox" name="checkbox" data-labelauty="JAVA" /></li>
                                            <li><input type="checkbox" name="checkbox" data-labelauty=".NET" /></li>
                                        </ul>
                                  </div> 
                                </div>
                            </div>
                            <div className="col-md-12 float-left">
                                <div className="card">
                                  <div className="card-header bg-secondary text-white">Api资源域</div>
                                  <div className="card-body">
                                      <ul>
                                            <li><input type="checkbox" name="checkbox" disabled checked data-labelauty="HTML" /></li>
                                            <li><input type="checkbox" name="checkbox" data-labelauty="CSS" /></li>
                                            <li><input type="checkbox" name="checkbox" data-labelauty="JavaScript" /></li>
                                            <li><input type="checkbox" name="checkbox" data-labelauty="SEO" /></li>
                                            <li><input type="checkbox" name="checkbox" data-labelauty="PHP" /></li>
                                            <li><input type="checkbox" name="checkbox" data-labelauty="JAVA" /></li>
                                            <li><input type="checkbox" name="checkbox" data-labelauty=".NET" /></li>
                                        </ul>
                                  </div> 
                                </div>
                            </div>
                            
                            <div className="w-100 float-left">
                                <div className="col-md-6 float-left">
                                    <div className="card">
                                      <div className="card-header bg-secondary text-white">登录重定向地址</div>
                                      <div className="card-body">
                                            <div className="d-flex margin-buttom10">
                                                <input type="text" className="form-control" id="pwd" />
                                                <button className="btn btn-danger btn-sm">删除</button>
                                            </div>
                                            <button className="btn btn-success btn-sm">+添加</button>
                                      </div> 
                                    </div>
                                </div>
                                <div className="col-md-6 float-left">
                                    <div className="card">
                                      <div className="card-header bg-secondary text-white">登出重定向地址</div>
                                      <div className="card-body">
                                            <div className="d-flex margin-buttom10">
                                                <input type="text" className="form-control" id="pwd" />
                                                <button className="btn btn-danger btn-sm">删除</button>
                                            </div>
                                            <button className="btn btn-success btn-sm">+添加</button>
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
                                            <li><input type="radio" name="radio1" data-labelauty="允许" /></li>
                                            <li><input type="radio" name="radio1" data-labelauty="不允许" /></li>
                                        </ul>
                                    </div>
                                    <div className="col-md-6 float-left">
                                        <h6 className="margin-buttom10">Token类型</h6>
                                        <ul>
                                            <li><input type="radio" name="radio2" data-labelauty="JWTToken" /></li>
                                            <li><input type="radio" name="radio2" data-labelauty="ReferenceToken" /></li>
                                        </ul>
                                    </div>
                                    <div className="col-md-6 float-left">
                                        <h6 className="margin-buttom10">是否启用</h6>
                                        <ul>
                                            <li><input type="radio" name="radio3" data-labelauty="启用" /></li>
                                            <li><input type="radio" name="radio3" data-labelauty="禁用" /></li>
                                        </ul>
                                    </div>
                                  </div> 
                                </div>
                            </div>
                          </div>
                     
                          <div className="modal-footer">
                            <button type="button" className="btn btn-info">提交</button>
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">关闭</button>
                          </div>
                     
                        </div>
                      </div>
                    </div>
                    <button type="button" className="btn btn-info" data-toggle="modal" data-target="#dataForm">+添加</button>
                </div>
            </div>
            
            <div className="modal fade data-delete" id="dataDelete">
              <div className="modal-dialog">
                <div className="modal-content">
             
                  <div className="modal-header">
                    <h4 className="modal-title">删除客户端</h4>
                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                  </div>
             
                  <div className="modal-body">
                    你正要删除XXXX，删除后无法恢复，确定删除吗？
                  </div>
             
                  <div className="modal-footer">
                    <button type="button" className="btn btn-danger btn-sm">删除</button>
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">关闭</button>
                  </div>
             
                </div>
              </div>
            </div>
        </div>
		);
	}
}