using Abp.Domain.Entities;
using IEManageSystem.Configuration;
using IEManageSystem.Entitys.Authorization.Roles;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.IO;
using System.Linq;
using System.Text;
using UtilityAction.FileHandle;

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
        /// 个性签名
        /// </summary>
        public string PersonSignature { get; set; }

        /// <summary>
        /// 头像
        /// </summary>
        public string HeadSculpture { get; protected set; }

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

        public void SetHeadSculpture(string base64Image)
        {
            string rootPath = AppConfigurations.RootPath;
            string webPath = $"\\Sonarqube\\{Id}.png";

            if (!string.IsNullOrEmpty(HeadSculpture))
            {
                File.Delete(rootPath + HeadSculpture);
            }

            string path = rootPath + webPath;

            ImageHandle.SaveImage(base64Image, path);

            HeadSculpture = webPath;
        }
    }
}
