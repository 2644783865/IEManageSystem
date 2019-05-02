import { ApiScope } from "../ApiScopeAuthority/ApiScope.js";
import { ApiScopeNodeType } from "../ApiScopeAuthority/ApiScopeNodeType.js";
import ApiScopeAuthorityManager from "../ApiScopeAuthority/ApiScopeAuthorityManager.js";
import Menu from "./Menu.js";

const menus = 
[
    {
        id: "Personal",
        text: "个人中心",
        icon: "oi-person",
        default: true,
        menuItems: [
            {
                id:"UserInfo",
                text: "用户信息",
                url: "/ManageHome/Personal/UserInfo",
                icon: "oi-person"
            },
            {
                id:"AccountSecurity",
                text: "账号安全",
                url: "/ManageHome/Personal/AccountSecurity",
                icon: "oi-envelope-closed"
            }
        ]
    },
    {
        id: "AuthorizeManage",
        text: "站点授权管理",
        icon: "oi-shield",
        menuItems: 
        [
            {
                id:"Admin",
                text: "管理员",
                icon: "oi-people",
                menuItems: [
                    {
                        id:"AdminManage",
                        text: "管理员管理",
                        url: "/ManageHome/AuthorizeManage/AdminManage",
                        accessScope:
                            [
                                { scopeName: ApiScope.AuthorizeManage.AdminManage, scopeNodeType: ApiScopeNodeType.manage },
                            ]
                    },
                    {
                        id:"AdminRoleManage",
                        text: "管理员角色",
                        url: "/ManageHome/AuthorizeManage/AdminRoleManage",
                        accessScope:
                            [
                                { scopeName: ApiScope.AuthorizeManage.AdminManage, scopeNodeType: ApiScopeNodeType.manage },
                                { scopeName: ApiScope.AuthorizeManage.RoleManage, scopeNodeType: ApiScopeNodeType.query },
                            ]
                    },
                    {
                        id: "AdminPermissionManage",
                        text: "管理员权限",
                        url: "/ManageHome/AuthorizeManage/AdminPermissionManage",
                        accessScope:
                            [
                                { scopeName: ApiScope.AuthorizeManage.AdminManage, scopeNodeType: ApiScopeNodeType.query },
                            ]
                    }
                ]
            },
            {
                id:"Role",
                text: "角色",
                menuItems: [
                    {
                        id:"RoleManage",
                        text: "角色管理",
                        url: "/ManageHome/AuthorizeManage/RoleManage",
                        accessScope:
                            [
                                { scopeName: ApiScope.AuthorizeManage.RoleManage, scopeNodeType: ApiScopeNodeType.manage },
                            ]
                    },
                    {
                        id:"RolePermissionManage",
                        text: "角色权限管理",
                        url: "/ManageHome/AuthorizeManage/RolePermissionManage",
                        accessScope:
                            [
                                { scopeName: ApiScope.AuthorizeManage.RoleManage, scopeNodeType: ApiScopeNodeType.manage },
                                { scopeName: ApiScope.AuthorizeManage.PermissionManage, scopeNodeType: ApiScopeNodeType.query },
                            ]
                    }
                ]
            },
            {
                id:"Permission",
                text: "权限管理",
                url: "/ManageHome/AuthorizeManage/Permission",
                icon: "oi-cog",
                accessScope:
                    [
                        { scopeName: ApiScope.AuthorizeManage.PermissionManage, scopeNodeType: ApiScopeNodeType.manage },
                    ]
            },
            {
                id:"ApiScopeManage",
                text: "功能域管理",
                icon: "oi-globe",
                menuItems: [
                    {
                        id:"ApiScopePermission",
                        text: "功能域权限管理",
                        url: "/ManageHome/AuthorizeManage/ApiScopePermission",
                        accessScope:
                            [
                                { scopeName: ApiScope.AuthorizeManage.ApiScopeManage, scopeNodeType: ApiScopeNodeType.manage },
                                { scopeName: ApiScope.AuthorizeManage.PermissionManage, scopeNodeType: ApiScopeNodeType.query },
                            ]
                    },
                    {
                        id:"ApiScopeUrl",
                        text: "功能域Url管理",
                        url: "/ManageHome/AuthorizeManage/ApiScopeUrl",
                        accessScope:
                            [
                                { scopeName: ApiScope.AuthorizeManage.ApiScopeManage, scopeNodeType: ApiScopeNodeType.query },
                            ]
                    },
                    {
                        id:"MenuPermission",
                        text:"菜单权限",
                        url:"/ManageHome/AuthorizeManage/MenuPermission",
                        icon:"oi-menu",
                        accessScope:
                            [
                                { scopeName: ApiScope.AuthorizeManage.ApiScopeManage, scopeNodeType: ApiScopeNodeType.query },
                            ]
                    }
                ]
            },
        ]
    },
    {
        id: "OAuthManage",
        text: "OAuth认证管理",
        menuItems: [
            {
                id:"IdentityResource",
                text: "身份资源",
                url: "/ManageHome/OAuthManage/IdentityResource",
                accessScope:
                    [
                        { scopeName: ApiScope.OAuthManage.IdentityResource, scopeNodeType: ApiScopeNodeType.manage },
                    ]
            },
            {
                id:"ApiResource",
                text: "API资源",
                url: "/ManageHome/OAuthManage/ApiResource",
                accessScope:
                    [
                        { scopeName: ApiScope.OAuthManage.ApiResource, scopeNodeType: ApiScopeNodeType.manage },
                    ]
            },
            {
                id:"Client",
                text: "客户端",
                url: "/ManageHome/OAuthManage/Client",
                accessScope:
                    [
                        { scopeName: ApiScope.OAuthManage.Client, scopeNodeType: ApiScopeNodeType.manage },
                    ]
            }
        ]
    },
    {
        id: "CMSManage",
        text: "CMS管理",
        url: "/ManageHome/CMSManage",
        menuItems: [
            {
                id:"Menu",
                text: "菜单管理",
                url: "/ManageHome/CMSManage/Menu",
                accessScope:
                    [
                        { scopeName: ApiScope.CMSManage.Menu, scopeNodeType: ApiScopeNodeType.manage },
                    ]
            }
        ]
    }
];

var mainMenu = null;

export default class MenuProvider
{
    constructor()
    {
        this.enableAuthorityFilter = false;

        if(mainMenu == null){
            this.apiScopeAuthorityManager = new ApiScopeAuthorityManager();
            mainMenu = this.createMenu({ menuItems: menus });
            if(mainMenu == null){
                mainMenu = new Menu();
            }
        }
	}

	createMenu(menuData)
	{
		let menu = new Menu();
		menu.id = menuData.id;
		menu.text = menuData.text;
		menu.url = menuData.url;
        menu.default = menuData.default;
        menu.icon = menuData.icon;
        menu.accessScope = menuData.accessScope;

        // 如果不允许访问这个菜单，则访问null
        if(this.apiScopeAuthorityManager.isAllowAccessMenu(menu) == false && this.enableAuthorityFilter == true)
        {
            return null;
        }

        // 如果菜单为节点菜单，则返回这个菜单
        if(menuData.menuItems == undefined || menuData.menuItems == null){
            return menu;
        }

        for(let item in menuData.menuItems){
            let childMenu = this.createMenu(menuData.menuItems[item]);
            if(childMenu != null){
                menu.menuItems.push(childMenu);
            }
        }

        // 如果菜单不为节点菜单，但又没有子项，返回null
        if(menu.menuItems.length == 0){
            return null;
        }

		return menu;
	}

    getmainMenu(){
        return mainMenu;
    }

    getTopLevelMenus()
    {
        return mainMenu.menuItems;
    }
}