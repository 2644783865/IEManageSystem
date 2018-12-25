import React from 'react';
import ReactDOM from 'react-dom';

export default class Paging extends React.Component
{
	constructor(props){
		super(props);

		this.state = {
			pageIndex: 1
		};

        this.prePageClick = this.prePageClick.bind(this);
        this.nextPageClick = this.nextPageClick.bind(this);
        this.pageIndexClick = this.pageIndexClick.bind(this);
	}

	// 上一页单击
	prePageClick(){
		if(this.state.pageIndex > 1){
			this.setState(
				prevState => ({pageIndex: prevState.pageIndex - 1 }), 
				()=>this.props.pageIndexChange(this.state.pageIndex));
			;
		}
	}

	// 下一页单击
	nextPageClick(){
		if(this.state.pageIndex < this.props.pageNum)
		{
			this.setState(
				prevState => ({pageIndex: prevState.pageIndex + 1 }), 
				()=>this.props.pageIndexChange(this.state.pageIndex));
		}
	}

	// 页索引单击
	pageIndexClick(pageIndex){
		this.setState(
			{pageIndex: pageIndex }, 
			()=>this.props.pageIndexChange(this.state.pageIndex));
	}
	
	render(){
		let pageNum = this.props.pageNum;

		const minIndex = this.state.pageIndex - 4;
		const maxIndex = this.state.pageIndex + 4;
		
		let lis = new Array();
		lis.push(<li className="page-item"><a onClick={this.prePageClick} className="page-link" href="javascript:void(0)">上一页</a></li>);

		for(let min = minIndex; min <= maxIndex && min <= pageNum; min++)
		{
			if(min > 0){
                let li = null;
                if(min == this.state.pageIndex){
                    li = <li className="page-item"><a onClick={()=>this.pageIndexClick(min)} className="page-link bg-white text-dark" href="javascript:void(0)">{ min }</a></li>;
                }
				else{
                    li = <li className="page-item"><a onClick={()=>this.pageIndexClick(min)} className="page-link" href="javascript:void(0)">{ min }</a></li>;
                }

				lis.push(li);
			}
		}

		lis.push(<li className="page-item"><a onClick={this.nextPageClick} className="page-link" href="javascript:void(0)" >下一页</a></li>);

		return (
            <div className="data-paging d-flex justify-content-between w-100">
                <ul className="pagination pagination-md">
                    {lis}
                </ul>
                <button type="button" className="btn btn-info" onClick={this.props.resourceAddClick}>+添加</button>
            </div>
		);
	}
}