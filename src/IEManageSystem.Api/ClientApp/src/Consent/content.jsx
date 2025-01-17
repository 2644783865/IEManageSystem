import React from 'react';
import ReactDOM from 'react-dom';
import Authority from './authority.jsx';
import Logo from 'Logo/Logo.jsx';

export default class Content extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return(
			<div className="col-md-8">   
				<Authority />
				<div className="col-md-4 float-left">
                    <Logo />
                </div>
            </div>
        );
	}
}