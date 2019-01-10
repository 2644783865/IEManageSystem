import React from 'react';
import ReactDOM from 'react-dom';
import './Preview.css';

export default class Preview extends React.Component
{
	constructor(props){
		super(props);
	}

    toggleSearch()
    {
        $("#previewSearch").toggle(300, function(){
            if($("#previewSearch").css("display") != "none"){
                $("#previewSearchBtn").removeClass("oi-chevron-buttom");
                $("#previewSearchBtn").addClass("oi-chevron-top");
            }
            else{
                $("#previewSearchBtn").removeClass("oi-chevron-top");
                $("#previewSearchBtn").addClass("oi-chevron-bottom");
            }
        });
    }
	
	render(){
		return (
		    <div className="preview">
                <h6 className="d-flex justify-content-between">
                    <span className="mt-auto mb-auto">Api域名</span>
                    <span>
                        <a href="javascript:void(0)" className="text-white">
                            <span id="previewSearchBtn" onClick={this.toggleSearch} className="oi oi-chevron-bottom" title="icon name" aria-hidden="true"></span>
                        </a>
                    </span>
                </h6>
                <h6 id="previewSearch" className="preview-hide">
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Search" />
                        <div className="input-group-append">
                            <button className="btn btn-success btn-sm" type="submit">
                                <span className="oi oi-magnifying-glass" title="icon name" aria-hidden="true"></span>
                            </button> 
                        </div>
                    </div>
                </h6>
                <div className="">
                    <ul className="list-group">
                        <li className="list-group-item d-flex justify-content-between">
                            <span className="mt-auto mb-auto">选项名称</span>
                            <span className="mt-auto mb-auto">
                                <button className="btn btn-info btn-sm"><span class="oi oi-zoom-in" title="icon name" aria-hidden="true"></span>查看</button>
                            </span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between">
                            <span className="mt-auto mb-auto">选项名称</span>
                            <span className="mt-auto mb-auto">
                                <button className="btn btn-info btn-sm"><span class="oi oi-zoom-in" title="icon name" aria-hidden="true"></span>查看</button>
                            </span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between">
                            <span className="mt-auto mb-auto">选项名称</span>
                            <span className="mt-auto mb-auto">
                                <button className="btn btn-info btn-sm"><span class="oi oi-zoom-in" title="icon name" aria-hidden="true"></span>查看</button>
                            </span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between">
                            <span className="mt-auto mb-auto">选项名称</span>
                            <span className="mt-auto mb-auto">
                                <button className="btn btn-info btn-sm"><span class="oi oi-zoom-in" title="icon name" aria-hidden="true"></span>查看</button>
                            </span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between">
                            <span className="mt-auto mb-auto">选项名称</span>
                            <span className="mt-auto mb-auto">
                                <button className="btn btn-info btn-sm"><span class="oi oi-zoom-in" title="icon name" aria-hidden="true"></span>查看</button>
                            </span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between">
                            <span className="mt-auto mb-auto">选项名称</span>
                            <span className="mt-auto mb-auto">
                                <button className="btn btn-info btn-sm"><span class="oi oi-zoom-in" title="icon name" aria-hidden="true"></span>查看</button>
                            </span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between">
                            <span className="mt-auto mb-auto">选项名称</span>
                            <span className="mt-auto mb-auto">
                                <button className="btn btn-info btn-sm"><span class="oi oi-zoom-in" title="icon name" aria-hidden="true"></span>查看</button>
                            </span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between">
                            <span className="mt-auto mb-auto">选项名称</span>
                            <span className="mt-auto mb-auto">
                                <button className="btn btn-info btn-sm"><span class="oi oi-zoom-in" title="icon name" aria-hidden="true"></span>查看</button>
                            </span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between">
                            <span className="mt-auto mb-auto">选项名称</span>
                            <span className="mt-auto mb-auto">
                                <button className="btn btn-info btn-sm"><span class="oi oi-zoom-in" title="icon name" aria-hidden="true"></span>查看</button>
                            </span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between">
                            <span className="mt-auto mb-auto">选项名称</span>
                            <span className="mt-auto mb-auto">
                                <button className="btn btn-info btn-sm"><span class="oi oi-zoom-in" title="icon name" aria-hidden="true"></span>查看</button>
                            </span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between">
                            <span className="mt-auto mb-auto">选项名称</span>
                            <span className="mt-auto mb-auto">
                                <button className="btn btn-info btn-sm"><span class="oi oi-zoom-in" title="icon name" aria-hidden="true"></span>查看</button>
                            </span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between">
                            <span className="mt-auto mb-auto">选项名称</span>
                            <span className="mt-auto mb-auto">
                                <button className="btn btn-info btn-sm"><span class="oi oi-zoom-in" title="icon name" aria-hidden="true"></span>查看</button>
                            </span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between">
                            <span className="mt-auto mb-auto">选项名称</span>
                            <span className="mt-auto mb-auto">
                                <button className="btn btn-info btn-sm"><span class="oi oi-zoom-in" title="icon name" aria-hidden="true"></span>查看</button>
                            </span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between">
                            <span className="mt-auto mb-auto">选项名称</span>
                            <span className="mt-auto mb-auto">
                                <button className="btn btn-info btn-sm"><span class="oi oi-zoom-in" title="icon name" aria-hidden="true"></span>查看</button>
                            </span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between">
                            <span className="mt-auto mb-auto">选项名称</span>
                            <span className="mt-auto mb-auto">
                                <button className="btn btn-info btn-sm"><span class="oi oi-zoom-in" title="icon name" aria-hidden="true"></span>查看</button>
                            </span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between">
                            <span className="mt-auto mb-auto">选项名称</span>
                            <span className="mt-auto mb-auto">
                                <button className="btn btn-info btn-sm"><span class="oi oi-zoom-in" title="icon name" aria-hidden="true"></span>查看</button>
                            </span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between">
                            <span className="mt-auto mb-auto">选项名称</span>
                            <span className="mt-auto mb-auto">
                                <button className="btn btn-info btn-sm"><span class="oi oi-zoom-in" title="icon name" aria-hidden="true"></span>查看</button>
                            </span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between">
                            <span className="mt-auto mb-auto">选项名称</span>
                            <span className="mt-auto mb-auto">
                                <button className="btn btn-info btn-sm"><span class="oi oi-zoom-in" title="icon name" aria-hidden="true"></span>查看</button>
                            </span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between">
                            <span className="mt-auto mb-auto">选项名称</span>
                            <span className="mt-auto mb-auto">
                                <button className="btn btn-info btn-sm"><span class="oi oi-zoom-in" title="icon name" aria-hidden="true"></span>查看</button>
                            </span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between">
                            <span className="mt-auto mb-auto">选项名称</span>
                            <span className="mt-auto mb-auto">
                                <button className="btn btn-info btn-sm"><span class="oi oi-zoom-in" title="icon name" aria-hidden="true"></span>查看</button>
                            </span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between">
                            <span className="mt-auto mb-auto">选项名称</span>
                            <span className="mt-auto mb-auto">
                                <button className="btn btn-info btn-sm"><span class="oi oi-zoom-in" title="icon name" aria-hidden="true"></span>查看</button>
                            </span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between">
                            <span className="mt-auto mb-auto">选项名称</span>
                            <span className="mt-auto mb-auto">
                                <button className="btn btn-info btn-sm"><span class="oi oi-zoom-in" title="icon name" aria-hidden="true"></span>查看</button>
                            </span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between">
                            <span className="mt-auto mb-auto">选项名称</span>
                            <span className="mt-auto mb-auto">
                                <button className="btn btn-info btn-sm"><span class="oi oi-zoom-in" title="icon name" aria-hidden="true"></span>查看</button>
                            </span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between">
                            <span className="mt-auto mb-auto">选项名称</span>
                            <span className="mt-auto mb-auto">
                                <button className="btn btn-info btn-sm"><span class="oi oi-zoom-in" title="icon name" aria-hidden="true"></span>查看</button>
                            </span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between">
                            <span className="mt-auto mb-auto">选项名称</span>
                            <span className="mt-auto mb-auto">
                                <button className="btn btn-info btn-sm"><span class="oi oi-zoom-in" title="icon name" aria-hidden="true"></span>查看</button>
                            </span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between">
                            <span className="mt-auto mb-auto">选项名称</span>
                            <span className="mt-auto mb-auto">
                                <button className="btn btn-info btn-sm"><span class="oi oi-zoom-in" title="icon name" aria-hidden="true"></span>查看</button>
                            </span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between">
                            <span className="mt-auto mb-auto">选项名称</span>
                            <span className="mt-auto mb-auto">
                                <button className="btn btn-info btn-sm"><span class="oi oi-zoom-in" title="icon name" aria-hidden="true"></span>查看</button>
                            </span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between">
                            <span className="mt-auto mb-auto">选项名称</span>
                            <span className="mt-auto mb-auto">
                                <button className="btn btn-info btn-sm"><span class="oi oi-zoom-in" title="icon name" aria-hidden="true"></span>查看</button>
                            </span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between">
                            <span className="mt-auto mb-auto">选项名称</span>
                            <span className="mt-auto mb-auto">
                                <button className="btn btn-info btn-sm"><span class="oi oi-zoom-in" title="icon name" aria-hidden="true"></span>查看</button>
                            </span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between">
                            <span className="mt-auto mb-auto">选项名称</span>
                            <span className="mt-auto mb-auto">
                                <button className="btn btn-info btn-sm"><span class="oi oi-zoom-in" title="icon name" aria-hidden="true"></span>查看</button>
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
		);
	}
}