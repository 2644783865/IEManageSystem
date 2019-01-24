using IEManageSystem.ApiAuthorization;
using IEManageSystem.ApiAuthorization.Authorizations;
using IEManageSystem.ApiAuthorization.DomainModel.ApiScopes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IEManageSystem.Api.Startup
{
    public class IEApiScopeProvider
    {
        public const string Personal = "Personal";

        public const string UserManage = "UserManage";

        public const string AuthorizeManage = "AuthorizeManage";

        public const string OAuthManage = "OAuthManage";
    }
}
