import BaseModule from 'Core/Modules/BaseModule'
import ModuleFactory from 'Core/Modules/ModuleFactory'
import MenuProvider from 'Core/Menu/MenuProvider'
import 'Core/Module'

import Personal from './Personal.jsx';

class Module extends BaseModule
{
    initialize()
    {
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

new ModuleFactory().register(new Module(), "PersonalModule", [
    "CoreModule"
]);