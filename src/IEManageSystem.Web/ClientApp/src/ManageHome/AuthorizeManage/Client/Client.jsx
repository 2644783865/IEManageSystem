import React from 'react';
import ReactDOM from 'react-dom';
import ClientList from './ClientList.jsx';
import DeleteDataModal from './DeleteDataModal.jsx';
import ResourceDataModal from './ResourceDataModal.jsx';

class Client extends React.Component
{
	constructor(props){
		super(props);
	}	
	
	render(){
		return (
			<div class="w-100">
				<ClientList />
				<DeleteDataModal />
				<ResourceDataModal />
			</div>
		);
	}
}

ReactDOM.render( 
    <Client /> , 
    document.getElementById('clientReactDOM') );