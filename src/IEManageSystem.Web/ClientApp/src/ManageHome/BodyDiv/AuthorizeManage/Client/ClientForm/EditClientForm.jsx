import ClientForm from './ClientForm.jsx';

export default class EditClientForm extends ClientForm{
	constructor(props){
		super(props);

		this.submitUrl = "";
	}
}