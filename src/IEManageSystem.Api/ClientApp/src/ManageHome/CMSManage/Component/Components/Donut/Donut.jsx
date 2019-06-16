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
        this.value = fieldValue.value;
    }

    setFieldValue() {
        let fieldValue = {
            type: this.type,
            value: this.value
        };

        this.props.setFieldValue(JSON.stringify(fieldValue));
    }

    render() {
        return (
            <div>
                <label>{this.props.text}</label>
                <div>
                    <div className="input-group mb-3 col-md-6 float-left">
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
                    <div className="input-group mb-3 col-md-6 float-left">
                        <input value={this.value} type="text" className="form-control" placeholder={`请输入占比（0~100）`}
                            onChange={
                                (event) => {
                                    this.value = event.target.value;
                                    this.setFieldValue();
                                }
                            }
                        />
                        <div className="input-group-append">
                            <span className="input-group-text">占比</span>
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

// 环图
class Donut extends BaseLeafComponent {
    static preview() {
        return (<p>环图</p>);
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
        const { DataView } = DataSet;
        let data = [];
        if(this.props.componentData != null && this.props.componentData != undefined)
        {
            let parse = (field)=>{
                let parseData = JSON.parse(field)

                return {
                    type: parseData.type,
                    value: parseInt(parseData.value)
                }
            };

            if(this.props.componentData.field1){
                data.push(parse(this.props.componentData.field1));
            }
            if(this.props.componentData.field2){
                data.push(parse(this.props.componentData.field2));
            }
            if(this.props.componentData.field3){
                data.push(parse(this.props.componentData.field3));
            }
            if(this.props.componentData.field4){
                data.push(parse(this.props.componentData.field4));
            }
            if(this.props.componentData.field5){
                data.push(parse(this.props.componentData.field5));
            }
        }
        else{
            data = [
                {
                    type: "事例一",
                    value: 40
                },
                {
                    type: "事例二",
                    value: 30
                },
                {
                    type: "事例三",
                    value: 20
                },
                {
                    type: "事例四",
                    value: 10
                },
                {
                    type: "事例五",
                    value: 0
                }
            ];
        }
        const dv = new DataView();
        dv.source(data).transform({
            type: "percent",
            field: "value",
            dimension: "type",
            as: "percent"
        });
        const cols = {
            percent: {
                formatter: val => {
                    val = val * 100 + "%";
                    return val;
                }
            }
        };
        return (
            <div>
                <Chart
                    height={300}
                    data={dv}
                    scale={cols}
                    padding={[0, 0, 0, 0]}
                    forceFit
                >
                    <Coord type={"theta"} radius={0.75} innerRadius={0.6} />
                    <Axis name="percent" />
                    <Tooltip
                        showTitle={false}
                        itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
                    />
                    <Geom
                        type="intervalStack"
                        position="percent"
                        color="type"
                        tooltip={[
                            "type*percent",
                            (type, percent) => {
                                percent = percent * 100 + "%";
                                return {
                                    name: type,
                                    value: percent
                                };
                            }
                        ]}
                        style={{
                            lineWidth: 1,
                            stroke: "#fff"
                        }}
                    >
                        <Label
                            content="percent"
                            formatter={(val, item) => {
                                return item.point.type + ": " + val;
                            }}
                        />
                    </Geom>
                </Chart>
            </div>
        );
    }
}

export default Donut;
