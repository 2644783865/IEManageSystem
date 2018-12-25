import ResourceForm from './ResourceForm.jsx';

export default class AddResourceForm extends ResourceForm{
	constructor(props){
		super(props);

		this.submitUrl = "/api/ClientManage/AddClient";
	}
}