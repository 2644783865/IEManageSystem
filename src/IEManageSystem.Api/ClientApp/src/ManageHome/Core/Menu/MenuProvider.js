import ApiScopeAuthorityManager from "../ApiScopeAuthority/ApiScopeAuthorityManager.js";
import Menu from "./Menu.js";

var navMenuComponents = [];

var mainMenu = null;

export default class MenuProvider
{
    // 注册导航栏菜单
    static registerMenu(menu, beseUrl, component)
    {
        navMenuComponents.push({
            menu, 
            beseUrl, 
            component
        });
    }

    constructor()
    {
        this.enableAuthorityFilter = false;

        if(mainMenu == null){
            this.apiScopeAuthorityManager = new ApiScopeAuthorityManager();
            mainMenu = this.createMenu({ menuItems: navMenuComponents.map(item=>item.menu) });
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

    getTopLevelMenus()
    {
        return mainMenu.menuItems;
    }

    getNavMenuComponents(){
        return navMenuComponents;
    }
}