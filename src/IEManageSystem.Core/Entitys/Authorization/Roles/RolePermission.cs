using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Entitys.Authorization.Roles
{
    public class RolePermission : Entity
    {
        public int RoleId { get; set; }

        public int PermissionId { get; set; }

        public Permission Permission { get; set; }
    }
}
