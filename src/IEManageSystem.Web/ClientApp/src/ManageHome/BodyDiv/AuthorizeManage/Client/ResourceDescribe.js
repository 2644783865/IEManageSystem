
export default class ResourceDescribe
{
	// describes [{text:"", name:"", isId=true, isName=true}]
	constructor(describes){
		this.describes = describes;
		this.idName = "id";
		for(let item in this.describes){
			if(this.describes[item].isId === true){
				this.idName = this.describes[item].name;
				break;
			}
		}

		this.nameName = "name";
		for(let item in this.describes){
			if(this.describes[item].isName === true){
				this.nameName = this.describes[item].name;
				break;
			}
		}
	}

	getTextFormName(name){
		for(let item in this.describes){
			if(this.describes[item].name === name){
				return this.describes[item].text;
			}
		}

		for(let item in this.describes){
			var reg = new RegExp("." + name + "$");
			if(reg.text(this.describes[item].name)){
				return this.describes[item].text;
			}
		}

		return null;
	}

	getResourceId(resource)
	{
		if(this.idName === null){
			return null;
		}

		return resource[this.idName];
	}

	getResourceName(resource){
		if(this.nameName === null){
			return null;
		}

		return resource[this.nameName];
	}
}