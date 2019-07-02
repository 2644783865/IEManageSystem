import React from 'react';
import PropTypes from 'prop-types';

import Tab from 'Tab/Tab.jsx'

class EditFrame extends React.Component 
{
    constructor(props) {
        super(props);

        this.tabs = [{index:0, text:"基本设置"}];
        this.nameField = "text";
        this.selectIndex = 0;

        this.newPageComponent = {...{}, ...this.props.pageComponent};

        this.submit = this.submit.bind(this);
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
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
        $(`#${this.newPageComponent.sign}`).addClass("show");
        $(`#${this.newPageComponent.sign}`).show(500);
    }

    hideModal() {
        $("body").removeClass("modal-open");
        $("div.modal-backdrop").remove();
        $(`#${this.newPageComponent.sign}`).removeClass("show");
        $(`#${this.newPageComponent.sign}`).hide(500);
    }

    submit(){
        this.hideModal();
        this.props.editComponent(this.newPageComponent);
    }

    render() {
        return (
            <div className="">
                <div className="modal fade data-form" id={this.newPageComponent.sign}>
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
                                            <input defaultValue={this.props.pageComponent.col} type="text" className="form-control" placeholder="网格宽度" 
                                                onChange={
                                                    (event)=>{
                                                        this.newPageComponent.col = event.target.value;
                                                    }
                                                }
                                            />
                                            <div className="input-group-append">
                                                <span className="input-group-text">网格宽度</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <label>请输入组件高度（rem）：</label>
                                        <div className="input-group mb-3">
                                            <input defaultValue={this.props.pageComponent.height} type="text" className="form-control" placeholder="网格宽度" 
                                                onChange={
                                                    (event)=>{
                                                        this.newPageComponent.height = event.target.value;
                                                    }
                                                }
                                            />
                                            <div className="input-group-append">
                                                <span className="input-group-text">网格宽度</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <label>请输入内边距（rem）：</label>
                                        <div className="input-group mb-3">
                                            <input defaultValue={this.props.pageComponent.padding} type="text" className="form-control" placeholder="网格宽度" 
                                                onChange={
                                                    (event)=>{
                                                        this.newPageComponent.padding = event.target.value;
                                                    }
                                                }
                                            />
                                            <div className="input-group-append">
                                                <span className="input-group-text">网格宽度</span>
                                            </div>
                                        </div>
                                    </div>
                                </Tab>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-info" onClick={this.submit}>提交</button>
                                <button type="button" className="btn btn-secondary" onClick={this.hideModal}>关闭</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

EditFrame.propTypes = {
    pageComponent: PropTypes.object.isRequired,
    editComponent: PropTypes.func.isRequired
}

export default EditFrame