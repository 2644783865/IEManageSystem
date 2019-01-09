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
        public string Name { get; set; }
    }
}
