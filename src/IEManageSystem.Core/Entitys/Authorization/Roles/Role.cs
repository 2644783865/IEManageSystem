using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace IEManageSystem.Entitys.Authorization.Roles
{
    public class Role : Entity
    {
        public string Name { get; set; }

        public IQueryable<RolePermission> RolePermissions { get; set; }
    }
}
