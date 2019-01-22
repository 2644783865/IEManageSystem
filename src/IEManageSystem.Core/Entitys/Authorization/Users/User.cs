using Abp.Domain.Entities;
using IEManageSystem.Entitys.Authorization.Roles;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;

namespace IEManageSystem.Entitys.Authorization.Users
{
    [Table("User")]
    public class User:Entity
    {
        protected User() {
        }

        public User(string userName) {
            UserName = userName;
        }

        /// <summary>
        /// 用户名
        /// </summary>
        [Required]
        [MaxLength(15)]
        [MinLength(6)]
        public string UserName { get; protected set; }

        /// <summary>
        /// 密码
        /// </summary>
        [Required]
        [MaxLength(60)]
        [MinLength(6)]
        public string Password { get; set; }

        /// <summary>
        /// 邮箱
        /// </summary>
        [EmailAddress]
        public string EmailAddress { get; set; }

        /// <summary>
        /// 昵称
        /// </summary>
        [MaxLength(20)]
        public string Name { get; set; }

        /// <summary>
        /// 手机号
        /// </summary>
        [Phone]
        public string Phone { get; set; }

        /// <summary>
        /// 头像
        /// </summary>
        public string HeadSculpture { get; set; }

        /// <summary>
        /// 权限
        /// </summary>
        public ICollection<UserRole> UserRoles { get; set; }

        public int? TenantId { get; set; }

        public void AddRole(Role role)
        {
            UserRole userRole = new UserRole(this, role);

            UserRoles.Add(userRole);
        }
    }
}
