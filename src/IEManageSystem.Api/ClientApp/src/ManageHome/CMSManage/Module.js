import BaseModule from 'Core/BaseModule'
import MenuProvider from 'Core/Menu/MenuProvider'
import { ApiScope } from "Core/ApiScopeAuthority/ApiScope.js";
import { ApiScopeNodeType } from "Core/ApiScopeAuthority/ApiScopeNodeType.js";

import CMSManage from './CMSManage.jsx';
import { reducer } from './Reducers'
import {CmsRedux} from './CmsRedux'
import {RootRedux} from 'Core/IEReduxs/RootRedux'

export default class Module extends BaseModule {
    initialize() {
        super.initialize();

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
                                id: "NewPage",
                                text: "新建页面",
                                url: "/ManageHome/CMSManage/NewPage",
                                accessScope:
                                    [
                                        { scopeName: ApiScope.CMSManage.Page, scopeNodeType: ApiScopeNodeType.manage },
                                    ]
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