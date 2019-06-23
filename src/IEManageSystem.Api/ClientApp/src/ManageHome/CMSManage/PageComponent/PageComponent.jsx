import React from 'react'

import './PageComponent.css'

import PageContainer from './PageContainer/PageContainer.jsx'
import ComponentTool from './ComponentTool/ComponentTool.jsx'

export default class PageComponent extends React.Component{
    constructor(props){
		super(props);
    }
    
    render(){
        return (<div className="page">
            <ComponentTool />
            <PageContainer pageName={this.props.match.params.pageName} />
        </div>);
    }
}