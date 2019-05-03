import BaseModule from 'Core/BaseModule'
import MenuProvider from 'Core/Menu/MenuProvider'
import { ApiScope } from "Core/ApiScopeAuthority/ApiScope.js";
import { ApiScopeNodeType } from "Core/ApiScopeAuthority/ApiScopeNodeType.js";

import CMSManage from './CMSManage.jsx';
import {reducer} from './Reducers'
import ReducerProvider from 'Core/Reducers/ReducerProvider'

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
                    },
                    {
                        id:"Page",
                        text: "页面管理",
                        url: "/ManageHome/CMSManage/Page",
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

        new ReducerProvider().register(reducer);
    }
}