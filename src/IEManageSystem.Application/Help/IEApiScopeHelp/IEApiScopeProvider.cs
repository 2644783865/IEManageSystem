﻿using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Help.IEApiScopeHelp
{
    public class IEApiScopeProvider
    {
        // personal
        public const string User = "Personal.User";

        // core域
        public const string AdminManage = "AuthorizeManage.AdminManage";
        public const string RoleManage = "AuthorizeManage.RoleManage";
        public const string PermissionManage = "AuthorizeManage.PermissionManage";

        // api域
        public const string ApiScopeManage = "AuthorizeManage.ApiScopeManage";

        // oauth域
        public const string IdentityResource = "OAuthManage.IdentityResource";
        public const string ApiResource = "OAuthManage.ApiResource";
        public const string Client = "OAuthManage.Client";

        // cms域
        public const string Menu = "CMSManage.Menu";
        public const string Page = "CMSManage.Page";


        public List<ApiScopeGroupDescribe> ApiScopeGroupDescribes { get; set; } = new List<ApiScopeGroupDescribe>();

        public IEApiScopeProvider()
        {
            ApiScopeProvide();
        }

        protected void ApiScopeProvide()
        {
            ApiScopeGroupDescribes.Add(new ApiScopeGroupDescribe() {
                Name = "Personal",
                ApiScopeDescribes = new List<ApiScopeDescribe>() {
                    new ApiScopeDescribe(){
                        Name = User,
                        DisplayName = "用户信息"
                    }
                }
            });

            ApiScopeGroupDescribes.Add(new ApiScopeGroupDescribe()
            {
                Name = "AuthorizeManage",
                ApiScopeDescribes = new List<ApiScopeDescribe>() {
                    new ApiScopeDescribe(){
                        Name = AdminManage,
                        DisplayName = "管理员管理"
                    },
                    new ApiScopeDescribe(){
                        Name = RoleManage,
                        DisplayName = "角色管理"
                    },
                    new ApiScopeDescribe(){
                        Name = PermissionManage,
                        DisplayName = "权限管理"
                    },
                    new ApiScopeDescribe(){
                        Name = ApiScopeManage,
                        DisplayName = "Api域管理"
                    },
                }
            });

            ApiScopeGroupDescribes.Add(new ApiScopeGroupDescribe()
            {
                Name = "OAuthManage",
                ApiScopeDescribes = new List<ApiScopeDescribe>() {
                    new ApiScopeDescribe(){
                        Name = IdentityResource,
                        DisplayName = "身份资源"
                    },
                    new ApiScopeDescribe(){
                        Name = ApiResource,
                        DisplayName = "Api资源管理"
                    },
                    new ApiScopeDescribe(){
                        Name = Client,
                        DisplayName = "客户端"
                    },
                }
            });

            ApiScopeGroupDescribes.Add(new ApiScopeGroupDescribe()
            {
                Name = "CMSManage",
                ApiScopeDescribes = new List<ApiScopeDescribe>() {
                    new ApiScopeDescribe(){
                        Name = Menu,
                        DisplayName = "菜单管理"
                    },
                    new ApiScopeDescribe(){
                        Name = Page,
                        DisplayName = "页面管理"
                    }
                }
            });
        }

        public void Register(Action<string, string> action)
        {
            foreach (var apiScopeGroupDescribe in ApiScopeGroupDescribes)
            {
                foreach (var apiScopeDescribe in apiScopeGroupDescribe.ApiScopeDescribes)
                {
                    action(apiScopeDescribe.Name, apiScopeDescribe.DisplayName);
                }
            }
        }
    }
}
