import React from 'react'

import './NewPage.css'

import PageContainer from './PageContainer/PageContainer.jsx'
import ComponentTool from './ComponentTool/ComponentTool.jsx'

export default class NewPage extends React.Component{
    render(){
        return (<div className="page">
            <ComponentTool />
            <PageContainer />
        </div>);
    }
}