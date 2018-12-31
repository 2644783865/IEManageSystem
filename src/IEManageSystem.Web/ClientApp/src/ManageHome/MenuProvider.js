import Menu from "./Menu.js";

const menus = 
[
    {
        id: "Personal",
        text: "个人中心",
        url: "/ManageHome/Personal",
        menuItems: [
            {
                text: "用户信息",
                url: "/ManageHome/Personal/UserInfo"
            }
        ]
    },
    {
        id: "UserManage",
        text: "用户管理",
        url: "/ManageHome/UserManage",
        menuItems: [
            {
                text: "普通用户管理",
                url: ""
            }
        ]
    },
    {
        id: "AuthorizeManage",
        text: "OAuth认证管理",
        url: "/ManageHome/AuthorizeManage",
        menuItems: [
            {
                text: "身份资源",
                url: "/ManageHome/AuthorizeManage/IdentityResource"
            },
            {
                text: "API资源",
                url: "/ManageHome/AuthorizeManage/ApiResource"
            },
            {
                text: "客户端",
                url: "/ManageHome/AuthorizeManage/Client"
            }
        ]
    }
];

export default class MenuProvider{
	constructor(){
		this.mainMenu = this.createMenu({ menuItems: menus });
	}

	createMenu(menuData)
	{
		let menu = new Menu();
		menu.id = menuData.id;
		menu.text = menuData.text;
		menu.url = menuData.url;
		if(menuData.menuItems != undefined && menuData.menuItems != null){
			for(let item in menuData.menuItems){
				menu.menuItems.push(this.createMenu(menuData.menuItems[item]));
			}
		}

		return menu;
	}
}