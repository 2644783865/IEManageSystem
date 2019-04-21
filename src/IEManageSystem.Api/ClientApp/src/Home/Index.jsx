import 'bootstrap';
import 'bootstrapcss';
import 'bootstrapcssicon';

import 'mousewheel';

import 'commoncss';
import 'iemedia';

import 'cookie';

import React from 'react';
import ReactDOM from 'react-dom';

import Logo from 'Logo/Logo.jsx';

import Menu from "./Menu/Menu.jsx";

require('./Index.css');

class Home extends React.Component{
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
            <Menu />
            <div className="h-100 d-flex">
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

ReactDOM.render( 
    <Home /> , 
    document.getElementById('Home') );