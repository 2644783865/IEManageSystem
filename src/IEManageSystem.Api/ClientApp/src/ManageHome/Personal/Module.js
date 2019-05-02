import BaseModule from 'Core/BaseModule'
import MenuProvider from 'Core/Menu/MenuProvider'
import { ApiScope } from "Core/ApiScopeAuthority/ApiScope.js";
import { ApiScopeNodeType } from "Core/ApiScopeAuthority/ApiScopeNodeType.js";

import Personal from './Personal.jsx';

export default class Module extends BaseModule
{
    initialize()
    {
        super.initialize();

        MenuProvider.registerMenu(
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
            "/ManageHome/Personal",
            Personal
        );
    }
}