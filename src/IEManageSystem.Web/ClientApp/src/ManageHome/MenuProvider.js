import Menu from "./Menu.js";

const menus = 
[
    {
        id: "Personal",
        text: "个人中心",
        url: "/ManageHome/Personal",
        default: true,
        menuItems: [
            {
                id:"UserInfo",
                text: "用户信息",
                url: "/ManageHome/Personal/UserInfo"
            },
            {
                id:"UserSecurity",
                text: "账号安全",
                url: "/ManageHome/Personal/UserSecurity"
            },
            {
                id:"Other",
                text: "其他",
                url: "/ManageHome/Personal/Other",
                menuItems: [
                    {
                        id:"Other1",
                        text: "其他功能1",
                        url: "/ManageHome/Personal/Other1"
                    },
                    {
                        id:"Other2",
                        text: "其他功能2",
                        url: "/ManageHome/Personal/Other2"
                    }
                ]
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
        menuItems: 
        [
            {
                id:"ApiScopeManage",
                text: "Api域管理",
                url: "/ManageHome/AuthorizeManage/ApiScopeManage",
                menuItems: [
                    {
                        id:"ApiScopePermission",
                        text: "Api域权限管理",
                        url: "/ManageHome/AuthorizeManage/ApiScopePermission"
                    },
                    {
                        id:"ApiScopeApi",
                        text: "Api域Api管理",
                        url: "/ManageHome/AuthorizeManage/ApiScopeApi"
                    }
                ]
            },
            {
                id:"UserPermissionManage",
                text: "用户权限管理",
                url: "/ManageHome/AuthorizeManage/UserPermissionManage"
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

var mainMenu = null;

export default class MenuProvider
{
	constructor(){
        if(mainMenu == null){
            mainMenu = this.createMenu({ menuItems: menus });
        }
	}

	createMenu(menuData)
	{
		let menu = new Menu();
		menu.id = menuData.id;
		menu.text = menuData.text;
		menu.url = menuData.url;
        menu.default = menuData.default;
		if(menuData.menuItems != undefined && menuData.menuItems != null){
			for(let item in menuData.menuItems){
				menu.menuItems.push(this.createMenu(menuData.menuItems[item]));
			}
		}

		return menu;
	}

    getTopLevelMenus()
    {
        return mainMenu.menuItems;
    }

    // 获取默认顶级菜单项
    getDefaultTopLevelMenu()
    {
        for(let item in mainMenu.menuItems)
        {
            if(mainMenu.menuItems[item].default == true){
                return mainMenu.menuItems[item];
            }
        }
    }

    // 获取菜单项
    getMenuItem(menuIds)
    {
        let curMenu = mainMenu;

        for(let item in menuIds)
        {
            curMenu = this._getChildMenu(curMenu, menuIds[item]);
            if(curMenu == null){
                return null;
            }
        }

        return curMenu;
    }

    // 模糊匹配获取菜单完整路经
    getMenuPath(menuIds)
    {
        return this.getMenuPathIteration(mainMenu, menuIds);
    }

    // 模糊匹配获取菜单完整路经
    getMenuPathIteration(menu, menuIds)
    {
        let paths = new Array();

        for(let item in menuIds)
        {
            let oldMenu = menu;
            menu = this._getChildMenu(menu, menuIds[item]);

            // 如果未找到菜单，则推测菜单可能属于下一级菜单
            if(menu == null)
            {
                let newMenuIds = new Array();

                for(let n = item; n < menuIds.length; n++)
                {
                    newMenuIds.push(menuIds[n]);
                }

                for(let itemChild in oldMenu.menuItems)
                {
                    let childPaths = this.getMenuPathIteration(oldMenu.menuItems[itemChild], newMenuIds);

                    // 有找到
                    if(childPaths.length > 0){
                        paths.push(oldMenu.menuItems[itemChild].id);
                        childPaths.map(childPath=>paths.push(childPath));

                        return paths;
                    }
                }

                return new Array();
            }
            else{
                paths.push(menuIds[item]);
            }
        }

        return paths;
    }

    // 获取子菜单
    _getChildMenu(menu, menuId)
    {
        for(let item in menu.menuItems)
        {
            if(menu.menuItems[item].id == menuId){
                return menu.menuItems[item];
            }
        }
        
        // 如果菜单id未index
        if(menuId.toLowerCase() === "index"){
            for(let item in menu.menuItems)
            {
                if(menu.menuItems[item].default == true){
                    return menu.menuItems[item];
                }
            }
        }

        return null;
    }
}