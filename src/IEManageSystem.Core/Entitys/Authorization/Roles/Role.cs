using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;

namespace IEManageSystem.Entitys.Authorization.Roles
{
    [Table("Role")]
    public class Role : Entity
    {
        public static Role SuperAdmin { get { return new Role("SuperAdmin") { DisplayName = "超级管理员", Describe = "拥有站点最高权限" }; } }

        protected Role() {
        }

        public Role(string name)
        {
            Name = name;
        }

        public string Name { get; protected set; }

        public string DisplayName { get; set; }

        public string Describe { get; set; }

        public ICollection<RolePermission> RolePermissions { get; set; }

        public void AddPermission(Permission permission)
        {
            RolePermission rolePermission = new RolePermission(this, permission);

            RolePermissions.Add(rolePermission);
        }
    }
}
