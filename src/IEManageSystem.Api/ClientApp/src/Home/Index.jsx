import 'bootstrap';
import 'bootstrapcss';
import 'bootstrapcssicon';

import 'mousewheel';

import 'commoncss';
import 'iemedia';

import 'cookie';

import React from 'react';
import { Route } from "react-router-dom";

import Nav from "./Nav/Nav.jsx";
import PageContainer from './PageContainer/PageContainer.jsx'

require('./Index.css');

export default class Home extends React.Component{
    constructor(props) {
        super(props);
    }

    componentDidMount()
    {
        let contentWidth = $(".content").width();

        let contentListWidth = $(".content-list").width();

        let maxoffsetx = contentListWidth - contentWidth;

        $('.content-list').on('mousewheel', function(event) 
        {
            let left = parseInt($(this).css("left").replace("px",""));
            let offsetx = event.deltaY*30;
            let newLeft = left + offsetx;
            
            if(-newLeft >= 0 && -newLeft <= maxoffsetx){
                //左右滚动时让鼠标水平移动
                $(this).css("left", newLeft + "px");
            }
        });
    }

    componentDidUpdate(){
        this.state.operationState = operationState.none;
    }

    render()
    {
        return (
        <div className="w-100 h-100">
            <Nav />
            <div className="h-100 d-flex">
                <Route path="/:pageId/:pageDataId" component={PageContainer} />
            </div>
            <nav className="navbar navbar-expand-sm bg-dark navbar-dark fixed-bottom">
                <small className="text-white">
                    Copyright © 2019 by IceEmblem. All rights reserved.
                </small>
                <small className="text-white ml-auto">
                    由冰纹工作室开发开发
                </small>
            </nav>
        </div>
        );
    }
}