using Abp.Domain.Entities;
using IEManageSystem.Entitys.Authorization;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace IEManageSystem.ApiAuthorization.DomainModel.ApiScopes
{
    [Table("ApiScopePermission")]
    public class ApiScopePermission : Entity
    {
        public int ApiScopeId { get; set; }

        public int PermissionId { get; set; }

        public Permission Permission { get; set; }
    }
}
