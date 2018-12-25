import ResourceForm from './ResourceForm.jsx';

export default class EditResourceForm extends ResourceForm{
	constructor(props){
		super(props);

		this.submitUrl = "/api/ClientManage/UpdateClient";
	}
}