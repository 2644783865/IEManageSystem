import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'Modal/Modal.jsx'

import Tab from 'Tab/Tab.jsx'

class EditFrame extends React.Component {
    // props.close()
    // props.show
    constructor(props) {
        super(props);

        this.tabs = [{ index: 0, text: "基本设置" }];
        this.nameField = "text";
        this.selectIndex = 0;

        this.newPageComponent = { ...{}, ...this.props.pageComponent };

        this.submit = this.submit.bind(this);
    }

    submit() {
        this.props.close();
        this.props.editComponent(this.newPageComponent);
    }

    render() {
        return (
            <Modal
                show={this.props.show}
            >
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header bg-info text-white">
                            <h4 className="modal-title">{this.props.title}编辑组件</h4>
                            <button type="button" className="close" data-dismiss="modal" onClick={this.props.close}>&times;</button>
                        </div>

                        <div className="modal-body jumbotron">
                            <Tab
                                tabs={this.tabs}
                                nameField={this.nameField}
                                selectIndex={this.selectIndex}
                                selectOnclick={() => { }}
                            >
                                <div class="d-flex flex-md-wrap">
                                    <div className="col-md-6 float-left">
                                        <label>请输入1~12网格宽度：</label>
                                        <div className="input-group mb-3">
                                            <input defaultValue={this.props.pageComponent.col} type="text" className="form-control" placeholder="网格宽度"
                                                onChange={
                                                    (event) => {
                                                        this.newPageComponent.col = event.target.value;
                                                    }
                                                }
                                            />
                                            <div className="input-group-append">
                                                <span className="input-group-text">网格宽度</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 float-left">
                                        <label>请输入组件高度（例：9rem）：</label>
                                        <div className="input-group mb-3">
                                            <input defaultValue={this.props.pageComponent.height} type="text" className="form-control" placeholder="组件高度"
                                                onChange={
                                                    (event) => {
                                                        this.newPageComponent.height = event.target.value;
                                                    }
                                                }
                                            />
                                            <div className="input-group-append">
                                                <span className="input-group-text">组件高度</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 float-left">
                                        <label>请输入内边距（例：0.3rem 或 0rem 0.3rem）：</label>
                                        <div className="input-group mb-3">
                                            <input defaultValue={this.props.pageComponent.padding} type="text" className="form-control" placeholder="内边距"
                                                onChange={
                                                    (event) => {
                                                        this.newPageComponent.padding = event.target.value;
                                                    }
                                                }
                                            />
                                            <div className="input-group-append">
                                                <span className="input-group-text">内边距</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 float-left">
                                        <label>请输入外边距（例：0.3rem 或 0rem 0.3rem）：</label>
                                        <div className="input-group mb-3">
                                            <input defaultValue={this.props.pageComponent.margin} type="text" className="form-control" placeholder="外边距"
                                                onChange={
                                                    (event) => {
                                                        this.newPageComponent.margin = event.target.value;
                                                    }
                                                }
                                            />
                                            <div className="input-group-append">
                                                <span className="input-group-text">外边距</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 float-left">
                                        <label>请输入背景颜色（例：#ffffff）：</label>
                                        <div className="input-group mb-3">
                                            <input defaultValue={this.props.pageComponent.backgroundColor} type="text" className="form-control" placeholder="背景颜色"
                                                onChange={
                                                    (event) => {
                                                        this.newPageComponent.backgroundColor = event.target.value;
                                                    }
                                                }
                                            />
                                            <div className="input-group-append">
                                                <span className="input-group-text">背景颜色</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 float-left">
                                        <label>请输入class：</label>
                                        <div className="input-group mb-3">
                                            <input defaultValue={this.props.pageComponent.className} type="text" className="form-control" placeholder="样式类"
                                                onChange={
                                                    (event) => {
                                                        this.newPageComponent.className = event.target.value;
                                                    }
                                                }
                                            />
                                            <div className="input-group-append">
                                                <span className="input-group-text">样式类</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </Tab>
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-info" onClick={this.submit}>提交</button>
                            <button type="button" className="btn btn-secondary" onClick={this.props.close}>关闭</button>
                        </div>

                    </div>
                </div>
            </Modal>
        );
    }
}

EditFrame.propTypes = {
    pageComponent: PropTypes.object.isRequired,
    editComponent: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired,
    show: PropTypes.func.isRequired
}

export default EditFrame