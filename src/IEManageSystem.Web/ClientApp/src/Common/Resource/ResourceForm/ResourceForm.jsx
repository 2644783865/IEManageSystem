import React from 'react';
import ReactDOM from 'react-dom';
import { ResourceDescribeValueType } from '../ResourceDescribeValueType.js';
import FormRadio from './FormRadio.jsx';
import FormCheck from './FormCheck.jsx';
import TextGroup from './TextGroup.jsx';
import Text from './Text.jsx';

export default class ResourceForm extends React.Component {
    // props.title
    // props.resource  资源数据
    // props.describes  资源描述
    // props.isHideSubmit  是否隐藏提交按钮
    // props.resourceUpdate()  提交回调函数
    constructor(props) {
        super(props);

        this.resource = null;

        this.submit = this.submit.bind(this);
    }

    componentWillMount() {
        this.initClient(this.props.resource);
    }

    componentDidMount() {
        // $("#dataFormBtn").click();
        this.showModal();
    }

    componentWillReceiveProps(nextProps) {
        // $("#dataFormBtn").click();
        this.showModal();

        this.initClient(nextProps.resource);
    }

    showModal() {
        $("body").addClass("modal-open");
        $("body").append('<div class="modal-backdrop fade show"></div>');
        $("#dataForm").addClass("show");
        $("#dataForm").show(500);
    }

    hideModal() {
        $("body").removeClass("modal-open");
        $("div.modal-backdrop").remove();
        $("#dataForm").removeClass("show");
        $("#dataForm").hide(500);
    }

    initClient(inputResource) {
        if (inputResource == null) {
            this.resource = {};

            for (let item in this.props.describes) {
                if (this.props.describes[item].valueType === ResourceDescribeValueType.textGroup
                    || this.props.describes[item].valueType === ResourceDescribeValueType.check) {
                    this.resource[this.props.describes[item].name] = new Array();
                }
                else {
                    this.resource[this.props.describes[item].name] = "";
                }
            }
            return;
        }

        this.resource = Object.assign({}, inputResource);

        for (let item in this.props.describes) {
            if (this.props.describes[item].valueType === ResourceDescribeValueType.textGroup
                && this.props.describes[item].valueType === ResourceDescribeValueType.check) {
                this.resource[this.props.describes[item].name] = Object.assign([], inputResource[this.props.describes[item].name]);
            }
        }
    }

    // 提交
    submit() {
        this.hideModal();
        this.props.resourceUpdate(this.resource);
        // $("#dataFormCloseBtn").click();
    }

    createElement(describe) {
        if (describe.valueType === ResourceDescribeValueType.text) {
            return (
                <div name={describe.name} className={"col-md-" + describe.col}>
                    <Text
                        title={describe.text}
                        value={this.resource[describe.name]}
                        isEdit={describe.isEdit}
                        onChange={value => { this.resource[describe.name] = value; this.setState({}) }}
                    />
                </div>);
        }

        if (describe.valueType === ResourceDescribeValueType.textGroup) {
            return (<div name={describe.name} className={"float-left col-md-" + describe.col}>
                <TextGroup
                    title={describe.text}
                    values={this.resource[describe.name]}
                    isEdit={describe.isEdit}
                    onChange={(name, values) => { this.resource[describe.name] = values }} />
            </div>);
        }

        if (describe.valueType === ResourceDescribeValueType.radio) {
            return (<div name={describe.name} className={"float-left col-md-" + describe.col}>
                <div className="card">
                    <div className="card-header bg-secondary text-white">{describe.text}</div>
                    <div className="card-body">
                        <FormRadio
                            name={describe.name}
                            values={describe.valueTexts}
                            isEdit={describe.isEdit}
                            selectValue={this.resource[describe.name]}
                            onChange={(name, selectValue) => { this.resource[describe.name] = selectValue }} />
                    </div>
                </div>
            </div>);
        }

        if (describe.valueType === ResourceDescribeValueType.check) {
            return (<div name={describe.name} className={"float-left col-md-" + describe.col}>
                <div className="card">
                    <div className="card-header bg-secondary text-white">{describe.text}</div>
                    <div className="card-body">
                        <FormCheck
                            name={describe.name}
                            values={describe.valueTexts}
                            isEdit={describe.isEdit}
                            selectValues={this.resource[describe.name]}
                            onChange={(name, selectValues) => { this.resource[describe.name] = selectValues }} />
                    </div>
                </div>
            </div>);
        }

        return null;
    }

    render() {
        let elements = new Array();
        for (let item in this.props.describes) {
            elements.push(this.createElement(this.props.describes[item]));
        }

        return (
            <div className="">
                <div className="modal fade data-form" id="dataForm">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header bg-info text-white">
                                <h4 className="modal-title">{this.props.title}信息</h4>
                                <button type="button" className="close" data-dismiss="modal" onClick={this.hideModal}>&times;</button>
                            </div>

                            <div className="modal-body jumbotron">
                                {elements}
                            </div>

                            <div className="modal-footer">
                                <span id="dataFormError" className="text-danger"></span>
                                {
                                    !this.props.isHideSubmit &&
                                    <button type="button" className="btn btn-info" onClick={this.submit}>提交</button>
                                }
                                <button id="dataFormCloseBtn" type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.hideModal}>关闭</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}