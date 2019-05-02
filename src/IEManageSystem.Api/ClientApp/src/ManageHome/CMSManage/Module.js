import BaseModule from 'Core/BaseModule'
import MenuProvider from 'Core/Menu/MenuProvider'
import { ApiScope } from "Core/ApiScopeAuthority/ApiScope.js";
import { ApiScopeNodeType } from "Core/ApiScopeAuthority/ApiScopeNodeType.js";

export default class Module extends BaseModule
{
    initialize()
    {
        super.initialize();

        MenuProvider.registerMenu(
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
        );
    }
}