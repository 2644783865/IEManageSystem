import React from 'react';
import ReactDOM from 'react-dom';

export default class Paging extends React.Component
{
	// props.hideAdd
	constructor(props){
		super(props);
	}
	
	render(){
		let pageNum = this.props.pageNum;

		const minIndex = this.props.pageIndex - 4;
		const maxIndex = this.props.pageIndex + 4;
		
		let lis = new Array();
		lis.push(<li className="page-item"><a onClick={()=>this.props.pageIndexChange(this.props.pageIndex - 1)} className="page-link" href="javascript:void(0)">上一页</a></li>);

		for(let min = minIndex; min <= maxIndex && min <= pageNum; min++)
		{
			if(min > 0){
                let li = null;
                if(min == this.props.pageIndex){
                    li = <li className="page-item"><a onClick={()=>this.props.pageIndexChange(min)} className="page-link bg-white text-dark" href="javascript:void(0)">{ min }</a></li>;
                }
				else{
                    li = <li className="page-item"><a onClick={()=>this.props.pageIndexChange(min)} className="page-link" href="javascript:void(0)">{ min }</a></li>;
                }

				lis.push(li);
			}
		}

		lis.push(<li className="page-item"><a onClick={()=>this.props.pageIndexChange(this.props.pageIndex + 1)} className="page-link" href="javascript:void(0)" >下一页</a></li>);

		return (
            <div className="data-paging mt-auto d-flex justify-content-between w-100">
                <ul className="pagination pagination-md">
                    {lis}
                </ul>
                {this.props.hideAdd != true && <button type="button" className="btn btn-info" onClick={this.props.resourceAddClick}>+添加</button>}
            </div>
		);
	}
}