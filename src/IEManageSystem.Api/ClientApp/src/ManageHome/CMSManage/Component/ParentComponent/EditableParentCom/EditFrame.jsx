import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'Modal/Modal.jsx'

import Tab from 'Tab/Tab.jsx'

class BaseSetting extends React.Component {
    // this.props.pageComponentSetting
    // this.props.setPageComponentSetting
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div class="d-flex flex-md-wrap">
                <div className="col-md-6 float-left">
                    <label>请输入1~12网格宽度：</label>
                    <div className="input-group mb-3">
                        <input defaultValue={this.props.pageComponentSetting.col} type="text" className="form-control" placeholder="网格宽度"
                            onChange={
                                (event) => {
                                    this.props.setPageComponentSetting({
                                        ...this.props.pageComponentSetting,
                                        ...{ col: event.target.value }
                                    })
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
                        <input defaultValue={this.props.pageComponentSetting.height} type="text" className="form-control" placeholder="组件高度"
                            onChange={
                                (event) => {
                                    this.props.setPageComponentSetting({
                                        ...this.props.pageComponentSetting,
                                        ...{ height: event.target.value }
                                    })
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
                        <input defaultValue={this.props.pageComponentSetting.padding} type="text" className="form-control" placeholder="内边距"
                            onChange={
                                (event) => {
                                    this.props.setPageComponentSetting({
                                        ...this.props.pageComponentSetting,
                                        ...{ padding: event.target.value }
                                    })
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
                        <input defaultValue={this.props.pageComponentSetting.margin} type="text" className="form-control" placeholder="外边距"
                            onChange={
                                (event) => {
                                    this.props.setPageComponentSetting({
                                        ...this.props.pageComponentSetting,
                                        ...{ margin: event.target.value }
                                    })
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
                        <input defaultValue={this.props.pageComponentSetting.backgroundColor} type="text" className="form-control" placeholder="背景颜色"
                            onChange={
                                (event) => {
                                    this.props.setPageComponentSetting({
                                        ...this.props.pageComponentSetting,
                                        ...{ backgroundColor: event.target.value }
                                    })
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
                        <input defaultValue={this.props.pageComponentSetting.className} type="text" className="form-control" placeholder="样式类"
                            onChange={
                                (event) => {
                                    this.props.setPageComponentSetting({
                                        ...this.props.pageComponentSetting,
                                        ...{ className: event.target.value }
                                    })
                                }
                            }
                        />
                        <div className="input-group-append">
                            <span className="input-group-text">样式类</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class EditFrame extends React.Component {
    // props.close()
    // props.show
    constructor(props) {
        super(props);

        this.tabs = [{ index: 0, text: "基本设置" }];
        this.nameField = "text";

        this.state = {
            selectIndex: 0,
            newPageComponent: { ...{}, ...this.props.pageComponent }
        }

        let index = 1
        this.props.pageComponentSettingConfigs.forEach(element => {
            this.tabs.push({ index: index, text: element.displayName, name: element.name })
            index++;
        });

        this.submit = this.submit.bind(this);
    }

    submit() {
        this.props.close();
        this.props.editComponent(this.state.newPageComponent);
    }

    render() {
        let ContentComponent
        if (this.state.selectIndex == 0) {
            ContentComponent = <BaseSetting
                pageComponentSetting={this.state.newPageComponent}
                setPageComponentSetting={(d) => {
                    this.setState({newPageComponent: d})
                }}
            />
        }
        else{
            // 设置对象
            let objectConfig = this.props.pageComponentSettingConfigs[this.state.selectIndex - 1];
            // 设置数据
            let pageComponentSetting = this.state.newPageComponent.pageComponentSettings.find(item=>item.name == objectConfig.name) || {}
            // 设置使用组件
            let Component = objectConfig.component;
            ContentComponent = <Component 
                pageComponentSetting={pageComponentSetting}
                setPageComponentSetting={(d) => {
                    let data = this.state.newPageComponent.pageComponentSettings.find(item=>item.name == objectConfig.name)
                    data.field1 = d.field1
                    data.field2 = d.field2
                    data.field3 = d.field3
                    data.field4 = d.field4
                    data.field5 = d.field5
                    this.setState({});
                }}
            />
        }

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
                                selectIndex={this.state.selectIndex}
                                selectOnclick={(data) => {
                                    this.setState({ selectIndex: data.index })
                                }}
                            >
                                {ContentComponent}
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
    pageComponentSettingConfigs: PropTypes.object.isRequired,
    editComponent: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired,
    show: PropTypes.func.isRequired
}

export default EditFrame