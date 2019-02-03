using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Help.IEApiScopeHelp
{
    public class IEApiScopeProvider
    {
        public const string AdminManage = "AuthorizeManage.AdminManage";
        public const string RoleManage = "AuthorizeManage.RoleManage";
        public const string PermissionManage = "AuthorizeManage.PermissionManage";
        public const string ApiScopeManage = "AuthorizeManage.ApiScopeManage";
        public const string IdentityResource = "OAuthManage.IdentityResource";
        public const string ApiResource = "OAuthManage.ApiResource";
        public const string Client = "OAuthManage.Client";

        public List<ApiScopeGroupDescribe> ApiScopeGroupDescribes { get; set; } = new List<ApiScopeGroupDescribe>();

        public IEApiScopeProvider()
        {
            ApiScopeProvide();
        }

        protected void ApiScopeProvide()
        {
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
