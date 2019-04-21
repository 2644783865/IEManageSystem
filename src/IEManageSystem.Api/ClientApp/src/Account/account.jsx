import React from 'react';
import ReactDOM from 'react-dom';
import Title from "./Title.jsx";
import Content from "./Content.jsx";

import 'bootstrap';
import 'bootstrapcss';
import 'bootstrapcssicon';
import 'commoncss';
import 'iemedia';
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
