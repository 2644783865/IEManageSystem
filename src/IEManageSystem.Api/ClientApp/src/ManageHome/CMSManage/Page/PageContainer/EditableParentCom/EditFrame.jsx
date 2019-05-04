import React from 'react';
import Tab from 'Tab/Tab.jsx'

export default class EditFrame extends React.Component 
{
    constructor(props) {
        super(props);

        this.tabs = [{index:0, text:"基本设置"}];
        this.nameField = "text";
        this.selectIndex = 0;

    }

    componentDidMount() {
        this.showModal();
    }

    componentWillReceiveProps(nextProps) {
        this.showModal();
    }

    showModal() {
        $("body").addClass("modal-open");
        $("body").append('<div class="modal-backdrop fade show"></div>');
        $("#EditFrame").addClass("show");
        $("#EditFrame").show(500);
    }

    hideModal() {
        $("body").removeClass("modal-open");
        $("div.modal-backdrop").remove();
        $("#EditFrame").removeClass("show");
        $("#EditFrame").hide(500);
    }

    render() {
        return (
            <div className="">
                <div className="modal fade data-form" id="EditFrame">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header bg-info text-white">
                                <h4 className="modal-title">{this.props.title}编辑组件</h4>
                                <button type="button" className="close" data-dismiss="modal" onClick={this.hideModal}>&times;</button>
                            </div>

                            <div className="modal-body jumbotron">
                                <Tab 
                                    tabs={this.tabs} 
                                    nameField={this.nameField} 
                                    selectIndex={this.selectIndex} 
                                    selectOnclick={()=>{}}
                                >
                                    <div>
                                        <label>请输入1~12网格宽度：</label>
                                        <div className="input-group mb-3">
                                            <input type="text" className="form-control" placeholder="网格宽度" />
                                            <div className="input-group-append">
                                                <span className="input-group-text">网格宽度</span>
                                            </div>
                                        </div>
                                    </div>
                                </Tab>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-info" onClick={this.submit}>提交</button>
                                <button id="dataFormCloseBtn" type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.hideModal}>关闭</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}