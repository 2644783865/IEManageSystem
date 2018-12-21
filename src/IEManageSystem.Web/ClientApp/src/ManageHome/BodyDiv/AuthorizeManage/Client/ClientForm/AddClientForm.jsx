import ClientForm from './ClientForm.jsx';

export default class AddClientForm extends ClientForm{
	constructor(props){
		super(props);

		this.submitUrl = "/api/ClientManage/AddClient";
	}
}