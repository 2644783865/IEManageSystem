import React from 'react';
import ReactDOM from 'react-dom';
import Title from "./Title.jsx";
import Content from "./Content.jsx";

import 'bootstrap';
import 'bootstrapcss';
import 'bootstrapcssicon';
import 'commoncss';
import 'cookie';

import "./account.css";


ReactDOM.render(
<div className="row login-content">
	<Title />
	<Content />
	<nav className="navbar navbar-expand-sm bg-dark navbar-dark fixed-bottom">
        <small className="text-white">
            Copyright © 2019 by IceEmblem. All rights reserved.
        </small>
        <small className="text-white ml-auto">
            由冰纹工作室开发开发
        </small>
    </nav>
</div>,
document.getElementById('Reactele')
);

let width = document.body.clientWidth
let fontsize = parseInt(width / 113);
document.documentElement.style.fontSize = fontsize + "px";
document.body.style.fontSize = fontsize + "px";

(function () {
    window.onresize = function () {
        let width = document.body.clientWidth
        let fontsize = parseInt(width / 110);
        document.documentElement.style.fontSize = fontsize + "px";
        document.body.style.fontSize = fontsize + "px";
    };
})();