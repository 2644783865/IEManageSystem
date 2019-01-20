using Abp.Domain.Repositories;
using Abp.Domain.Services;
using IEManageSystem.Entitys.Authorization.Roles;
using IEManageSystem.Help.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UtilityAction.Other;

namespace IEManageSystem.Entitys.Authorization.Users
{
    public class UserManager:IDomainService
    {
        public IRepository<User> UserRepository { get; private set; }

        private IRepository<Role> _roleRepository { get; set; }

        public UserManager(
            IRepository<User> userRepository,
            IRepository<Role> roleRepository
            )
        {
            UserRepository = userRepository;

            _roleRepository = roleRepository;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public User GetUser(int id)
        {
            return UserRepository.Get(id);
        }

        /// <summary>
        /// 添加用户
        /// </summary>
        /// <param name="userName"></param>
        /// <param name="password"></param>
        /// <param name="name"></param>
        /// <param name="tenantId"></param>
        /// <returns></returns>
        public User AddUser(string userName, string password, string name = null, int? tenantId = null)
        {
            if ((UserRepository.GetAllList(e => e.UserName == userName)).Any())
            {
                throw new MessageException("已存在[" + userName + "]的账号，请重新注册");
            }

            password = Encrypt.MD5Utf8(password);

            User user = new User()
            {
                UserName = userName,
                Password = password,
                Name = !string.IsNullOrEmpty(name) ? name : userName,
                TenantId = tenantId
            };

            UserRepository.Insert(user);

            return user;
        }

        /// <summary>
        /// 删除用户
        /// </summary>
        public void DeleteUser(int id)
        {
            UserRepository.Delete(id);
        }

        /// <summary>
        /// 添加权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="role"></param>
        public void AddUserRole(User user, Role role)
        {
            UserRepository.EnsureCollectionLoaded(user, e => e.UserRoles);

            List<int> roleIds = user.UserRoles.Select(e => e.RoleId).ToList();

            List<Role> roles = _roleRepository.GetAllList(e => roleIds.Contains(e.Id));

            foreach (var item in roles)
            {
                if (item == role)
                {
                    return;
                }
            }

            user.AddRole(role);
        }

        /// <summary>
        /// 移除权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="role"></param>
        public void RemoveRole(User user, Role role)
        {
            UserRepository.EnsureCollectionLoaded(user, e => e.UserRoles);

            var userRole = user.UserRoles.FirstOrDefault(e => e.RoleId == role.Id);

            user.UserRoles.Remove(userRole);
        }
    }
}
