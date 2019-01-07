using Abp.Domain.Entities;
using IEManageSystem.ApiAuthorization.DomainModel.ApiScopes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace IEManageSystem.ApiAuthorization.DomainModel.ApiScopes
{
    public class ApiScope:Entity
    {
        public ApiScope(string name) {
            Name = name;
        }

        public string Name { get; private set; }

        public IQueryable<ApiScopeApi> ApiScopeApis { get; set; }

        public IQueryable<ApiScopePermission> ApiScopePermissions { get; set; }
    }
}
