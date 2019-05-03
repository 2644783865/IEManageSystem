import React from 'react'

import './Page.css'

import PageContainer from './PageContainer/PageContainer.jsx'
import ComponentTool from './ComponentTool/ComponentTool.jsx'

export default class Page extends React.Component{
    render(){
        return (<div className="page">
            <ComponentTool />
            <PageContainer />
        </div>);
    }
}