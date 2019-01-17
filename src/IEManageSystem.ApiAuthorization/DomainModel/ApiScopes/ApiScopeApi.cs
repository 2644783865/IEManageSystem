using Abp.Domain.Entities;
using IEManageSystem.ApiAuthorization.DomainModel.ApiScopes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace IEManageSystem.ApiAuthorization.DomainModel.ApiScopes
{
    [Table("ApiScopeApi")]
    public class ApiScopeApi : Entity
    {
        protected ApiScopeApi() {
        }

        public ApiScopeApi(ApiScope apiScope, ApiSingle apiSingle)
        {
            ApiScopeId = apiScope.Id;

            ApiScope = apiScope;

            ApiSingleName = apiSingle.Name;
        }

        public int ApiScopeId { get; set; }

        public string ApiSingleName { get; set; }

        public ApiScope ApiScope { get; set; }
    }
}
