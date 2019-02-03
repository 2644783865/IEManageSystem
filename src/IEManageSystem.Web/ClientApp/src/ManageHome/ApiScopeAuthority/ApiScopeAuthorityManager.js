import { ApiScopeNodeType } from "./ApiScopeNodeType.js";

var userScopeAccessAuthorities = null;

export default class ApiScopeAuthorityManager
{
    constructor() {
        if (userScopeAccessAuthorities == null)
        {
            this._getUserScopeAccessAuthorities();
        }
    }

    _getUserScopeAccessAuthorities() {
        let postData = {};

        $.ajax({
            url: "/api/User/GetUserScopeAccessAuthorities",
            type: 'post',
            data: JSON.stringify(postData),
            contentType: 'application/json',
            dataType: 'json',
            async: false,
            success: function (data) {
                if (data.isSuccess == true) {
                    userScopeAccessAuthorities = data.value.userScopeAccessAuthoritys;
                }
            }.bind(this),
        });
    }

    isAllowAccessMenu(menu)
    {
        // 如果没有指定需求的域，则允许访问
        if(menu.accessScope == undefined){
            return true;
        }

        for(let item in menu.accessScope)
        {
            // 如果需求的域中其中一个没有访问权限，则没有这个菜单的访问权限
            if(this.isAllowAccessScope(menu.accessScope[item].scopeName, menu.accessScope[item].scopeNodeType) == false)
            {
                return false;   
            }
        }

        return true;
    }

    isAllowAccessScope(scopeName, scopeNodeType)
    {
        for(let item in userScopeAccessAuthorities)
        {
            if (userScopeAccessAuthorities[item].scopeName != scopeName)
            {
                continue;
            }

            if (scopeNodeType == ApiScopeNodeType.manage) {
                return userScopeAccessAuthorities[item].manageAuthority;
            }
            else {
                return userScopeAccessAuthorities[item].queryAuthority;
            }
        }

        return false;
    }
}