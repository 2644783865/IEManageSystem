import BaseModule from 'Core/Modules/BaseModule'
import ModuleFactory from 'Core/Modules/ModuleFactory'
import MenuProvider from 'Core/Menu/MenuProvider'
import { ApiScope } from "Core/ApiScopeAuthority/ApiScope.js";
import { ApiScopeNodeType } from "Core/ApiScopeAuthority/ApiScopeNodeType.js";

import CMSManage from './CMSManage.jsx';
import { reducer } from './Reducers'
import {CmsRedux} from './CmsRedux'
import {RootRedux} from 'Core/IEReduxs/RootRedux'
import 'Core/Module'

class Module extends BaseModule {
    initialize() {
        MenuProvider.registerMenu(
            {
                id: "CMSManage",
                text: "CMS管理",
                icon: "oi-document",
                url: "/ManageHome/CMSManage",
                menuItems: [
                    {
                        id: "Menu",
                        text: "菜单管理",
                        icon: "oi-menu",
                        url: "/ManageHome/CMSManage/Menu",
                        accessScope:
                            [
                                { scopeName: ApiScope.CMSManage.Menu, scopeNodeType: ApiScopeNodeType.manage },
                            ]
                    },
                    {
                        id: "Page",
                        text: "站点页面",
                        icon: "oi-file",
                        menuItems: [
                            {
                                id: "PageManage",
                                text: "页面管理",
                                url: "/ManageHome/CMSManage/PageManage"
                            },
                            {
                                id: "PageData",
                                text: "页面数据",
                                url: "/ManageHome/CMSManage/PageData"
                            }
                        ],
                        accessScope:
                            [
                                { scopeName: ApiScope.CMSManage.Page, scopeNodeType: ApiScopeNodeType.manage },
                            ]
                    },
                    {
                        id: "TestPage",
                        text: "测试页面",
                        url: "/ManageHome/CMSManage/TestPage",
                        accessScope:
                            [
                                { scopeName: ApiScope.CMSManage.Page, scopeNodeType: ApiScopeNodeType.manage },
                            ]
                    }
                ]
            },
            "/ManageHome/CMSManage",
            CMSManage
        );

        CmsRedux.setReducer(reducer);
        RootRedux.register(CmsRedux);
    }
}

new ModuleFactory().register(new Module(), "CMSManageModule", [
    "CoreModule"
]);