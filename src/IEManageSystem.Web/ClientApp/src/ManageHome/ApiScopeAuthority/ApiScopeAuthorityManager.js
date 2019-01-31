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
            url: "/api/ApiScopeManage/GetUserScopeAccessAuthorities",
            type: 'post',
            data: JSON.stringify(postData),
            contentType: 'application/json',
            dataType: 'json',
            async: false,
            success: function (data) {
                if (data.isSuccess == true) {
                    userScopeAccessAuthorities = data.value.userScopeAccessAuthoritys;
                }
            }.bind(this)
        });
    }

    isAllowAccessScope(scopeName, scopeNodeType)
    {
        for (var item in userScopeAccessAuthorities)
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