import React from 'react';
import ReactDOM from 'react-dom';
import Content from './content.jsx';

import 'bootstrap';
import 'bootstrapcss';
import 'bootstrapcssicon';
import 'commoncss';
import 'cookie';

import "./consent.css";

ReactDOM.render(
<div className="w-100 h-100">
	<div className="col-md-2"></div>
	<Content />
	<div className="col-md-2"></div>
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