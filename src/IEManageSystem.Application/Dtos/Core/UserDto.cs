using Abp.AutoMapper;
using IEManageSystem.Entitys.Authorization.Users;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Dtos.Core
{
    [AutoMap(typeof(User))]
    public class UserDto
    {
        public int Id { get; set; }

        /// <summary>
        /// 用户名
        /// </summary>
        public string UserName { get; set; }

        /// <summary>
        /// 邮箱
        /// </summary>
        public string EmailAddress { get; set; }

        /// <summary>
        /// 昵称
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// 手机号
        /// </summary>
        public string Phone { get; set; }

        /// <summary>
        /// 个性签名
        /// </summary>
        public string PersonSignature { get; set; }

        /// <summary>
        /// 头像
        /// </summary>
        public string HeadSculpture { get; set; }

        public int? TenantId { get; set; }
    }
}
