
export default class ResourceDescribe
{
	// describes [{text:"", name:"", isShowOnList=true, isId=true, isName=true}]
	constructor(describes){
		this.describes = describes;
		this.idDescribes = null;
		this.nameDescribes = null;

		for(let item in this.describes){
			if(this.describes[item].isId === true){
				this.idDescribes = this.describes[item];
				break;
			}
		}

		
		for(let item in this.describes){
			if(this.describes[item].isName === true){
				this.nameDescribes = this.describes[item];
				break;
			}
		}
	}

	// 获取显示在列表上的描述
	getDescribesOfList(){

	}

	// 根据名称获取的描述
	getDescribeFormName(name){
		for(let item in this.describes){
			if(this.describes[item].name === name){
				return this.describes[item];
			}
		}

		for(let item in this.describes){
			var reg = new RegExp("." + name + "$");
			if(reg.text(this.describes[item].name)){
				return this.describes[item];
			}
		}

		return null;
	}
}