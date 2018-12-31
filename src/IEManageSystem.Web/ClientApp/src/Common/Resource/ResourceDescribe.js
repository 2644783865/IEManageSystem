import {ResourceDescribeValueType} from './ResourceDescribeValueType.js';

export default class ResourceDescribe
{
	// describes [{  字段描述
	// 	text:"",  描述显示文本
	// 	name:"",  描述名称
	// 	isShowOnList=false,  是否显示在列表上 
	// 	isAddShow=true,  是否显示在添加上
	//	isAddCanEdit=true,  添加时是否允许编辑
	//	isEditShow=true,  是否显示在编辑上
	//	isEditCanEdit=true,  编辑时是否允许编辑
	//	isLookupShow=true,  是否显示在查看上
	// 	isId=true,  是否是Id字段
	// 	isName=true,  是否是名称字段
	// 	valueType="",  字段类型
	// 	valueTexts=[{value:"", text:""}],  如果字段为单选或复选时需指定
	//	col=12  网格长度
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

			if(this.describes[item].isAddCanEdit === undefined){
				this.describes[item].isAddCanEdit = true;
			}

			if(this.describes[item].isEditShow === undefined){
				this.describes[item].isEditShow = true;
			}

			if(this.describes[item].isEditCanEdit === undefined){
				this.describes[item].isEditCanEdit = true;
			}

			if(this.describes[item].isLookupShow === undefined){
				this.describes[item].isLookupShow = true;
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

			if(this.describes[item].col === undefined){
				this.describes[item].col = 12;
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
				this.describes[item].isEdit = this.describes[item].isAddCanEdit

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
				this.describes[item].isEdit = this.describes[item].isEditCanEdit

				listDescribes.push(this.describes[item]);
			}
		}

		return listDescribes;
	}

	// 获取显示在查看上的描述
	getDescribesOfLookup(){
		let listDescribes = new Array();

		for(let item in this.describes){
			if(this.describes[item].isLookupShow === true){
				this.describes[item].isEdit = false;
				
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