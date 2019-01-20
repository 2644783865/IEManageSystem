using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace IEManageSystem.Entitys.Authorization
{
    [Table("Permission")]
    public class Permission : Entity
    {
        public static Permission SuperPermission { get { return new Permission("SuperPermission") { DisplayName = "超级权限", Describe = "站点最高权限" }; } }

        protected Permission() {
        }

        public Permission(string name) {
            Name = name;
        }

        public string Name { get; protected set; }

        public string DisplayName { get; set; }

        public string Describe { get; set; }
    }
}
