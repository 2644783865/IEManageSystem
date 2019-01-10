import Menu from "./Menu.js";

const menus = 
[
    {
        id: "Personal",
        text: "个人中心",
        url: "/ManageHome/Personal",
        menuItems: [
            {
                id:"UserInfo",
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
                id:"GeneralUser",
                text: "普通用户管理",
                url: "/ManageHome/UserManage/GeneralUser"
            }
        ]
    },
    {
        id: "AuthorizeManage",
        text: "站点授权管理",
        url: "/ManageHome/AuthorizeManage",
        menuItems: [
            {
                id:"ApiScopePermission",
                text: "Api域权限管理",
                url: "/ManageHome/AuthorizeManage/ApiScopePermission"
            }
        ]
    },
    {
        id: "OAuthManage",
        text: "OAuth认证管理",
        url: "/ManageHome/OAuthManage",
        menuItems: [
            {
                id:"IdentityResource",
                text: "身份资源",
                url: "/ManageHome/OAuthManage/IdentityResource"
            },
            {
                id:"ApiResource",
                text: "API资源",
                url: "/ManageHome/OAuthManage/ApiResource"
            },
            {
                id:"Client",
                text: "客户端",
                url: "/ManageHome/OAuthManage/Client"
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