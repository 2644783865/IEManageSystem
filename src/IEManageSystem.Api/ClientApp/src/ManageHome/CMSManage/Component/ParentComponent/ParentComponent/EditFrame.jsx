import React from 'react';
import PropTypes from 'prop-types';

import Modal from 'Modal/Modal.jsx'

import Tab from 'Tab/Tab.jsx'

// props.submit
// props.close    fun
class EditFrame extends React.Component {
    constructor(props) {
        super(props);

        this.tabs = [{ index: 0, text: "基本设置" }];
        this.nameField = "text";
        this.selectIndex = 0;

        let componentData = this.props.componentData;
        if (componentData == null || componentData == undefined) {
            componentData = {}
        }

        this.state = {
            field1: componentData.field1,
            field2: componentData.field2,
            field3: componentData.field3,
            field4: componentData.field4,
            field5: componentData.field5,
        };

        this.submit = this.submit.bind(this);
    }

    componentWillUpdate(nextProps) {
        let componentData = nextProps.componentData;
        if (componentData == null || componentData) {
            componentData = {}
        }

        this.state = {
            field1: componentData.field1,
            field2: componentData.field2,
            field3: componentData.field3,
            field4: componentData.field4,
            field5: componentData.field5,
        };
    }

    submit() {
        this.props.submit({
            sign: this.props.pageComponent.sign,
            field1: this.state.field1,
            field2: this.state.field2,
            field3: this.state.field3,
            field4: this.state.field4,
            field5: this.state.field5,
        });
    }

    render() {
        return (
            <Modal
                show={this.props.show}
            >
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header bg-info text-white">
                            <h4 className="modal-title">编辑数据</h4>
                            <button type="button" className="close" data-dismiss="modal" onClick={this.props.close}>&times;</button>
                        </div>

                        <div className="modal-body jumbotron">
                            <Tab
                                tabs={this.tabs}
                                nameField={this.nameField}
                                selectIndex={this.selectIndex}
                                selectOnclick={() => { }}
                            >
                                {
                                    this.props.config.field1.customizeField ?
                                        <this.props.config.field1.customizeField
                                            fieldValue={this.state.field1}
                                            setFieldValue={(fieldValue) => { this.setState({ field1: fieldValue }) }}
                                        /> :
                                        (
                                            this.props.config.field1.show &&
                                            <div>
                                                <label>{this.props.config.field1.text}</label>
                                                <div className="input-group mb-3">
                                                    <input value={this.state.field1} type="text" className="form-control" placeholder={`请输入${this.props.config.field1.text}`}
                                                        onChange={
                                                            (event) => {
                                                                this.setState({ field1: event.target.value });
                                                            }
                                                        }
                                                    />
                                                    <div className="input-group-append">
                                                        <span className="input-group-text">{this.props.config.field1.text}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                }
                                {
                                    this.props.config.field2.customizeField ?
                                        <this.props.config.field2.customizeField
                                            fieldValue={this.state.field2}
                                            setFieldValue={(fieldValue) => { this.setState({ field2: fieldValue }) }}
                                        /> :
                                        (this.props.config.field2.show &&
                                            <div>
                                                <label>{this.props.config.field2.text}</label>
                                                <div className="input-group mb-3">
                                                    <input value={this.state.field2} type="text" className="form-control" placeholder={`请输入${this.props.config.field2.text}`}
                                                        onChange={
                                                            (event) => {
                                                                this.setState({ field2: event.target.value });
                                                            }
                                                        }
                                                    />
                                                    <div className="input-group-append">
                                                        <span className="input-group-text">{this.props.config.field2.text}</span>
                                                    </div>
                                                </div>
                                            </div>)
                                }
                                {
                                    this.props.config.field3.customizeField ?
                                        <this.props.config.field3.customizeField
                                            fieldValue={this.state.field3}
                                            setFieldValue={(fieldValue) => { this.setState({ field3: fieldValue }) }}
                                        /> :
                                        (this.props.config.field3.show &&
                                            <div>
                                                <label>{this.props.config.field3.text}</label>
                                                <div className="input-group mb-3">
                                                    <input value={this.state.field3} type="text" className="form-control" placeholder={`请输入${this.props.config.field3.text}`}
                                                        onChange={
                                                            (event) => {
                                                                this.setState({ field3: event.target.value });
                                                            }
                                                        }
                                                    />
                                                    <div className="input-group-append">
                                                        <span className="input-group-text">{this.props.config.field3.text}</span>
                                                    </div>
                                                </div>
                                            </div>)
                                }
                                {
                                    this.props.config.field4.customizeField ?
                                        <this.props.config.field4.customizeField
                                            fieldValue={this.state.field4}
                                            setFieldValue={(fieldValue) => { this.setState({ field4: fieldValue }) }}
                                        /> :
                                        (this.props.config.field4.show &&
                                            <div>
                                                <label>{this.props.config.field4.text}</label>
                                                <div className="input-group mb-3">
                                                    <input value={this.state.field4} type="text" className="form-control" placeholder={`请输入${this.props.config.field4.text}`}
                                                        onChange={
                                                            (event) => {
                                                                this.setState({ field4: event.target.value });
                                                            }
                                                        }
                                                    />
                                                    <div className="input-group-append">
                                                        <span className="input-group-text">{this.props.config.field4.text}</span>
                                                    </div>
                                                </div>
                                            </div>)
                                }
                                {
                                    this.props.config.field5.customizeField ?
                                        <this.props.config.field5.customizeField
                                            fieldValue={this.state.field5}
                                            setFieldValue={(fieldValue) => { this.setState({ field5: fieldValue }) }}
                                        /> :
                                        (this.props.config.field5.show &&
                                            <div>
                                                <label>{this.props.config.field5.text}</label>
                                                <div className="input-group mb-3">
                                                    <input value={this.state.field5} type="text" className="form-control" placeholder={`请输入${this.props.config.field5.text}`}
                                                        onChange={
                                                            (event) => {
                                                                this.setState({ field5: event.target.value });
                                                            }
                                                        }
                                                    />
                                                    <div className="input-group-append">
                                                        <span className="input-group-text">{this.props.config.field5.text}</span>
                                                    </div>
                                                </div>
                                            </div>)
                                }
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
    show: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
    submit: PropTypes.func.isRequired,
    pageComponent: PropTypes.object.isRequired,
    componentData: PropTypes.object,
    config: PropTypes.array.isRequired
}

export default EditFrame