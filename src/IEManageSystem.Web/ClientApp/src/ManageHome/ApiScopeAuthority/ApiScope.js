
// Api域，需要域服务器上的域保持一致
export const ApiScope =
    {
        AuthorizeManage: {
            AdminManage: "AuthorizeManage.AdminManage",
            RoleManage: "AuthorizeManage.RoleManage",
            PermissionManage: "AuthorizeManage.PermissionManage",
            ApiScopeManage: "AuthorizeManage.ApiScopeManage"
        },
        OAuthManage: {
            IdentityResource: "OAuthManage.IdentityResource",
            ApiResource: "OAuthManage.ApiResource",
            Client: "OAuthManage.Client"
        }
    }