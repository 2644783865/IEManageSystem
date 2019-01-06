using Abp.Domain.Entities;
using IEManageSystem.Entitys.Authorization.Roles;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Entitys.Authorization.Users
{
    public class UserRole : Entity
    {
        public int UserId { get; set; }

        public int RoleId { get; set; }

        public Role Role { get; set; }
    }
}
