using IEManageSystem.ApiAuthorization.DomainModel.ApiScopes;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.ApiAuthorization.Authorizations
{
    public abstract class ApiScopeProvider
    {
        protected ApiScopeManager _apiScopeManager { get; set; }

        public ApiScopeProvider(ApiScopeManager apiScopeManager)
        {
            _apiScopeManager = apiScopeManager;
        }

        public abstract void SetApiScope();
    }
}
