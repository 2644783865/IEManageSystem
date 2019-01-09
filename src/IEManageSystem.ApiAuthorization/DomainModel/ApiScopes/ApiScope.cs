using Abp.Domain.Entities;
using IEManageSystem.ApiAuthorization.DomainModel.ApiScopes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;

namespace IEManageSystem.ApiAuthorization.DomainModel.ApiScopes
{
    [Table("ApiScope")]
    public class ApiScope:Entity
    {
        protected ApiScope() {
        }

        public ApiScope(string name) {
            Name = name;
        }

        public string Name { get; private set; }

        public IQueryable<ApiScopeApi> ApiScopeApis { get; set; }

        public IQueryable<ApiScopePermission> ApiScopePermissions { get; set; }
    }
}
