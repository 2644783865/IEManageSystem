using Abp.Domain.Entities;
using Abp.Domain.Values;
using IEManageSystem.ApiAuthorization.DomainModel.ApiScopes;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.ApiAuthorization.DomainModel.ApiSingles
{
    public class ApiSingle : Entity
    {
        public ApiSingle(string name) {
            Name = name;
        }

        public string Name { get; protected set; }

        public int ApiScopeId { get; set; }

        public ICollection<ApiSingleAction> ApiSingleActions { get; set; }
    }
}
