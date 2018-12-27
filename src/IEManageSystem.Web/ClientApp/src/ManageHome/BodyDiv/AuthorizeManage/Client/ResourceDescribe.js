import {ResourceDescribeValueType} from './ResourceDescribeValueType.js';

export default class ResourceDescribe
{
	// describes [{
	// 	text:"", 
	// 	name:"", 
	// 	isShowOnList=false, 
	// 	isAddShow=true,
	//	isEditShow=true,
	// 	isId=true, 
	// 	isName=true, 
	// 	valueType="", 
	// 	valueTexts=[{value:"", text:""}]
	// }]
	constructor(describes){
		this.describes = describes;
		this.idDescribes = null;
		this.nameDescribes = null;

		for(let item in this.describes){
			if(this.describes[item].text === undefined){
				this.describes[item].text = this.describes[item].name;
			}

			if(this.describes[item].isShowOnList === undefined){
				this.describes[item].isShowOnList = false;
			}

			if(this.describes[item].isAddShow === undefined){
				this.describes[item].isAddShow = true;
			}

			if(this.describes[item].isEditShow === undefined){
				this.describes[item].isEditShow = true;
			}

			if(this.describes[item].isId === undefined){
				this.describes[item].isId = false;
			}

			if(this.describes[item].isName === undefined){
				this.describes[item].isName = false;
			}

			if(this.describes[item].valueType === undefined){
				this.describes[item].valueType = ResourceDescribeValueType.text;
			}

			if(this.describes[item].valueTexts === undefined){
				this.describes[item].valueTexts = new Array();
			}
		}

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
		let listDescribes = new Array();

		for(let item in this.describes){
			if(this.describes[item].isShowOnList === true){
				listDescribes.push(this.describes[item]);
			}
		}

		return listDescribes;
	}

	// 获取显示在添加上的描述
	getDescribesOfAdd(){
		let listDescribes = new Array();

		for(let item in this.describes){
			if(this.describes[item].isAddShow === true){
				listDescribes.push(this.describes[item]);
			}
		}

		return listDescribes;
	}

	// 获取显示在编辑上的描述
	getDescribesOfEdit(){
		let listDescribes = new Array();

		for(let item in this.describes){
			if(this.describes[item].isEditShow === true){
				listDescribes.push(this.describes[item]);
			}
		}

		return listDescribes;
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