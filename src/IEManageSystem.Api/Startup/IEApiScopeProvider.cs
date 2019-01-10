using IEManageSystem.ApiAuthorization.Authorizations;
using IEManageSystem.ApiAuthorization.DomainModel.ApiScopes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IEManageSystem.Api.Startup
{
    public class IEApiScopeProvider: ApiScopeProvider
    {
        public const string Personal = "Personal";

        public const string UserManage = "UserManage";

        public const string AuthorizeManage = "AuthorizeManage";

        public const string OAuthManage = "OAuthManage";

        public IEApiScopeProvider(ApiScopeManager apiScopeManager) : base(apiScopeManager)
        {
        }

        public override void SetApiScope()
        {
            _apiScopeManager.Register(Personal);
            _apiScopeManager.Register(UserManage);
            _apiScopeManager.Register(AuthorizeManage);
            _apiScopeManager.Register(OAuthManage);
        }
    }
}
