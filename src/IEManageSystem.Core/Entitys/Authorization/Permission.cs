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
        protected Permission() {
        }

        public Permission(string name) {
            Name = name;
        }

        public string Name { get; set; }

        public string DisplayName { get; set; }
    }
}
