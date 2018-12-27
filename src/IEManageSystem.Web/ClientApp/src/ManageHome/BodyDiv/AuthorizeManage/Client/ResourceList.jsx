import React from 'react';
import ReactDOM from 'react-dom';
import {ResourceDescribeValueType} from './ResourceDescribeValueType.js';

export default class ResourceList extends React.Component
{
    // props.title
    // props.resources
    // props.describes
    // props.resourceEditClick()
    // props.resourceDeleteClick()
    // props.resourceLookupClick()
	constructor(props){
		super(props);
	}

    getShowTexts(resource, describe)
    {
        let texts = new Array();
        if(describe.valueType === ResourceDescribeValueType.text){
            texts.push(resource[describe.name]);
            return texts;
        }

        if(describe.valueType === ResourceDescribeValueType.textGroup)
        {
            let values = resource[describe.name];
            for(let valueItem in values){
                texts.push(values[valueItem]);
            }
            return texts;
        }

        if(describe.valueType === ResourceDescribeValueType.radio)
        {
            let valueTexts = describe.valueTexts;
            if(valueTexts === undefined){
                texts.push(resource[describe.name]);
            }
            else{
                let value = resource[describe.name];

                valueTexts.map(valueText=>{ 
                    if(valueText.value === value) 
                        texts.push(valueText.text);  
                });
            }
            return texts;
        }

        if(describe.valueType === ResourceDescribeValueType.check)
        {
            let valueTexts = describe.valueTexts;
            if(valueTexts === undefined){
                let values = resource[describe.name];
                
                for(let valueItem in values){
                    texts.push( values[valueItem] );
                }
            }
            else{
                let values = resource[describe.name];
                
                for(let valueItem in values){
                    valueTexts.map(valueText=>{ 
                        if(valueText.value === values[valueItem]) 
                            texts.push(valueText.text);  
                    });
                }
            }
            return texts;
        }

        return texts;
    }

    createResourceTr(resource, describes){
        let resourceBodyTds = new Array();
        for(let describeItem in describes)
        {
            let showTexts = this.getShowTexts(resource, describes[describeItem]);
            let text = "";
            if(showTexts.length > 1){
                for(let showTextItem in  showTexts){
                    text = text + "[" + showTexts[showTextItem] + "]";
                }
            }
            else if(showTexts.length == 1){
                text = showTexts[0];
            }

            resourceBodyTds.push(<td>{ text }</td>);
        }

        return( <tr>
                    { resourceBodyTds }
                    <td>
                        <div className="btn-group btn-group-sm">
                            <button type="button" className="btn btn-primary" 
                                onClick={()=>this.props.resourceEditClick(resource)}>编辑</button>
                            <button type="button" className="btn btn-danger"
                                onClick={()=>this.props.resourceDeleteClick(resource)}>删除</button>
                        </div>
                    </td>
                </tr>);
    }
	
	render(){
        let describes = this.props.describes;
        let resourceHeadThs = new Array();
        for(let item in describes){
            resourceHeadThs.push(<th>{describes[item].text}</th>);
        }
        let resourceHeadTr = <tr>
                                {resourceHeadThs}
                                <th>操作</th>
                            </tr>;
    
        let resources = this.props.resources;
        let resourceBodyTrs = new Array();
        for(let item in resources){
            resourceBodyTrs.push(this.createResourceTr(resources[item], describes));
        }

		return (
		    <div className="data-list w-100">
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Search" />
                    <div className="input-group-append">
                      <button className="btn btn-info" type="submit">搜索一下</button>  
                    </div>
                </div>
                <h5>{this.props.title} 列表</h5>
                <table className="table table-hover table-dark table-striped text-white">
                    <thead>
                        { resourceHeadTr }
                    </thead>
                    <tbody>
                        { resourceBodyTrs }
                    </tbody>
                </table>
            </div>
		);
	}
}