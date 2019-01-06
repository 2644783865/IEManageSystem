using Abp.Authorization;
using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.ApiAuthorization.DomainModel.ApiScopes
{
    public class ApiScopePermission : Entity
    {
        public int ApiScopeId { get; set; }

        public int PermissionId { get; set; }

        public Permission Permission { get; set; }
    }
}
