import ClientForm from './ClientForm.jsx';

export default class LookupClientForm extends ClientForm{
	constructor(props){
		super(props);

		this.submitUrl = "";
	}
}