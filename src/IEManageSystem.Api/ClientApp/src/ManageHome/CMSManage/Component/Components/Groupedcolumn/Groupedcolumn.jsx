import React from "react";
import PropTypes from 'prop-types';
import {
    G2,
    Chart,
    Geom,
    Axis,
    Tooltip,
    Coord,
    Label,
    Legend,
    View,
    Guide,
    Shape,
    Facet,
    Util
} from "bizcharts";
import DataSet from "@antv/data-set";

import BaseLeafComponent from '../BaseComponent/BaseLeafComponent/BaseLeafComponent.jsx'

class CustomizeField extends React.Component {
    constructor(props) {
        super(props)

        let fieldValue = props.fieldValue ? JSON.parse(props.fieldValue) : {};
        this.type = fieldValue.type;
        this.value1 = fieldValue.value1;
        this.value2 = fieldValue.value2;
    }

    setFieldValue() {
        let fieldValue = {
            type: this.type,
            value1: this.value1,
            value2: this.value2
        };

        this.props.setFieldValue(JSON.stringify(fieldValue));
    }

    render() {
        return (
            <div>
                <label>{this.props.text}</label>
                <div>
                    <div className="input-group mb-3 col-md-4 float-left">
                        <input value={this.type} type="text" className="form-control" placeholder={`请输入类型`}
                            onChange={
                                (event) => {
                                    this.type = event.target.value;
                                    this.setFieldValue();
                                }
                            }
                        />
                        <div className="input-group-append">
                            <span className="input-group-text">类型</span>
                        </div>
                    </div>
                    <div className="input-group mb-3 col-md-4 float-left">
                        <input value={this.value1} type="text" className="form-control" placeholder={`请输入值`}
                            onChange={
                                (event) => {
                                    this.value1 = event.target.value;
                                    this.setFieldValue();
                                }
                            }
                        />
                        <div className="input-group-append">
                            <span className="input-group-text">柱1</span>
                        </div>
                    </div>
                    <div className="input-group mb-3 col-md-4 float-left">
                        <input value={this.value2} type="text" className="form-control" placeholder={`请输入值`}
                            onChange={
                                (event) => {
                                    this.value2 = event.target.value;
                                    this.setFieldValue();
                                }
                            }
                        />
                        <div className="input-group-append">
                            <span className="input-group-text">柱2</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

CustomizeField.propTypes = {
    text: PropTypes.string.isRequired,
    fieldValue: PropTypes.string,
    setFieldValue: PropTypes.func.isRequired
}

// 柱状图
class Groupedcolumn extends BaseLeafComponent {
    static preview() {
        return (<p>柱状图</p>);
    }

    static getConfig() {
        return {
            field1: (props) => <CustomizeField text="字段1" fieldValue={props.fieldValue} setFieldValue={props.setFieldValue} />,
            field2: (props) => <CustomizeField text="字段2" fieldValue={props.fieldValue} setFieldValue={props.setFieldValue} />,
            field3: (props) => <CustomizeField text="字段3" fieldValue={props.fieldValue} setFieldValue={props.setFieldValue} />,
            field4: (props) => <CustomizeField text="字段4" fieldValue={props.fieldValue} setFieldValue={props.setFieldValue} />,
            field5: (props) => <CustomizeField text="字段5" fieldValue={props.fieldValue} setFieldValue={props.setFieldValue} />,
        };
    }

    render() {
        let data = [];
        let fields = [];
        if(this.props.componentData != null && this.props.componentData != undefined)
        {
            let parse = (field)=>{
                let parseData = JSON.parse(field)

                return {
                    type: parseData.type,
                    value1: parseInt(parseData.value1),
                    value2: parseInt(parseData.value2),
                }
            };

            let value1s = {
                name: "柱1"
            };
            let value2s = {
                name: "柱2"
            };

            if(this.props.componentData.field1){
                let parseData = parse(this.props.componentData.field1);
                value1s[parseData.type] = parseData.value1;
                value2s[parseData.type] = parseData.value2;

                fields.push(parseData.type);
            }
            if(this.props.componentData.field2){
                let parseData = parse(this.props.componentData.field2);
                value1s[parseData.type] = parseData.value1;
                value2s[parseData.type] = parseData.value2;

                fields.push(parseData.type);
            }
            if(this.props.componentData.field3){
                let parseData = parse(this.props.componentData.field3);
                value1s[parseData.type] = parseData.value1;
                value2s[parseData.type] = parseData.value2;

                fields.push(parseData.type);
            }
            if(this.props.componentData.field4){
                let parseData = parse(this.props.componentData.field4);
                value1s[parseData.type] = parseData.value1;
                value2s[parseData.type] = parseData.value2;

                fields.push(parseData.type);
            }
            if(this.props.componentData.field5){
                let parseData = parse(this.props.componentData.field5);
                value1s[parseData.type] = parseData.value1;
                value2s[parseData.type] = parseData.value2;

                fields.push(parseData.type);
            }

            data.push(value1s);
            data.push(value2s);
        }
        else{
            data = [
                {
                    name: "柱1",
                    "Jan.": 18.9,
                    "Feb.": 28.8,
                    "Mar.": 39.3,
                    "Apr.": 81.4,
                    "May.": 47
                },
                {
                    name: "柱2",
                    "Jan.": 12.4,
                    "Feb.": 23.2,
                    "Mar.": 34.5,
                    "Apr.": 99.7,
                    "May.": 52.6
                }
            ];

            fields = ["Jan.", "Feb.", "Mar.", "Apr.", "May."]
        }
        const ds = new DataSet();
        const dv = ds.createView().source(data);
        dv.transform({
            type: "fold",
            fields: fields,
            // 展开字段集
            key: "x",
            // key字段
            value: "y" // value字段
        });
        return (
            <div>
                <Chart height={300} data={dv} forceFit>
                    <Axis name="x" />
                    <Axis name="y" />
                    <Legend />
                    <Tooltip
                        crosshairs={{
                            type: "y"
                        }}
                    />
                    <Geom
                        type="interval"
                        position="x*y"
                        color={"name"}
                        adjust={[
                            {
                                type: "dodge",
                                marginRatio: 1 / 32
                            }
                        ]}
                    />
                </Chart>
            </div>
        );
    }
}

export default Groupedcolumn;
