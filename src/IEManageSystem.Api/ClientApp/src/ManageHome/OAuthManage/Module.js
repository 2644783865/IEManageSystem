import BaseModule from 'Core/Modules/BaseModule'
import ModuleFactory from 'Core/Modules/ModuleFactory'
import MenuProvider from 'Core/Menu/MenuProvider'
import { ApiScope } from "Core/ApiScopeAuthority/ApiScope.js";
import { ApiScopeNodeType } from "Core/ApiScopeAuthority/ApiScopeNodeType.js";
import 'Core/Module'

import OAuthManage from "./OAuthManage.jsx";

class Module extends BaseModule
{
    initialize()
    {
        MenuProvider.registerMenu(
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
            "/ManageHome/OAuthManage",
            OAuthManage
        );
    }
}

new ModuleFactory().register(new Module(), "OAuthManageModule", [
    "CoreModule"
]);