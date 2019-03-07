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
</div>,
document.getElementById('Reactele')
);
