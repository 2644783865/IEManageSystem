import React from 'react';
import ReactDOM from 'react-dom';
import Content from './content.jsx';

import 'bootstrap';
import 'bootstrapcss';
import 'bootstrapcssicon';
import 'commoncss';
import 'iemedia';
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