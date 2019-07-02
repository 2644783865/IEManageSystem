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
                        <input value={this.value} type="text" className="form-control" placeholder={`请输入占比（1~24）`}
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

// 日常作息可视图
class Clock extends BaseLeafComponent {
    static preview() {
        return (<p>日常作息可视图</p>);
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
        const { Text } = Guide;

        const data = [];
        for (let i = 0; i < 24; i++) {
            const item = {};
            item.type = i + "";
            item.value = 10;
            data.push(item);
        }
        const { DataView } = DataSet;
        const dv = new DataView();
        dv.source(data).transform({
            type: "percent",
            field: "value",
            dimension: "type",
            as: "percent"
        });

        let userData = [];
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
                userData.push(parse(this.props.componentData.field1));
            }
            if(this.props.componentData.field2){
                userData.push(parse(this.props.componentData.field2));
            }
            if(this.props.componentData.field3){
                userData.push(parse(this.props.componentData.field3));
            }
            if(this.props.componentData.field4){
                userData.push(parse(this.props.componentData.field4));
            }
            if(this.props.componentData.field5){
                userData.push(parse(this.props.componentData.field5));
            }
        }
        else{
            userData = [
                {
                    type: "睡眠",
                    value: 8
                },
                {
                    type: "上班",
                    value: 8
                },
                {
                    type: "午休",
                    value: 2
                },
                {
                    type: "娱乐",
                    value: 4
                },
                {
                    type: "学习",
                    value: 2
                }
            ];
        }
        const userDv = new DataView();
        userDv.source(userData).transform({
            type: "percent",
            field: "value",
            dimension: "type",
            as: "percent"
        });
        const cols = {
            percent: {
                formatter: val => {
                    return (val * 100).toFixed(2) + "%";
                }
            }
        };
        return (
            <div>
                <Chart height={300} data={data} padding={40} forceFit>
                    <Coord type="theta" radius={0.8} />
                    <Tooltip showTitle={false} />
                    <View data={dv}>
                        <Coord type="theta" innerRadius={0.9} />
                        <Geom
                            type="intervalStack"
                            position="percent"
                            color={["type", ["rgba(255, 255, 255, 0)"]]}
                            style={{
                                stroke: "#444",
                                lineWidth: 1
                            }}
                        />
                        <Guide>
                            <Text
                                position={["50%", "50%"]}
                                content="24 hours"
                                style={{
                                    lineHeight: "240px",
                                    fontSize: "48",
                                    fill: "#262626",
                                    textAlign: "center"
                                }}
                            />
                        </Guide>
                    </View>
                    <View data={userDv} scale={cols}>
                        <Coord type="theta" innerRadius={0.75} />
                        <Geom type="intervalStack" position="percent" color={"type"}>
                            <Label content="type" offset={40} />
                        </Geom>
                    </View>
                </Chart>
            </div>
        );
    }
}

export default Clock;
