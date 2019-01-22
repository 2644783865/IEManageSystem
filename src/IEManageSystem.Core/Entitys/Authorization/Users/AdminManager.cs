using Abp.Domain.Services;
using IEManageSystem.Entitys.Authorization.Roles;
using IEManageSystem.Help.Exceptions;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using System.Threading.Tasks;
using System.Linq.Expressions;

namespace IEManageSystem.Entitys.Authorization.Users
{
    public class AdminManager:IDomainService
    {
        private UserManager _userManager { get; set; }

        public AdminManager(
            UserManager userManager)
        {
            _userManager = userManager;
        }

        public User GetAdmin(int id) => _userManager.GetUser(id);

        public IQueryable<User> GetAdmins() => _userManager.UserRepository.GetAll();

        public IQueryable<User> GetAdminsIncluding(Expression<Func<User, object>>[] propertySelectors) => _userManager.UserRepository.GetAllIncluding(propertySelectors);

        public async Task<User> CreateAdmin(string userName, string password, string name = null, int? tenantId = null)
        {
            var user = await  _userManager.CreateUser(userName, password, name, tenantId);

            _userManager.AddUserRole(user, Role.Admin);

            return user;
        }

        public void DeleteAdmin(int id)
        {
            _userManager.DeleteUser(id);
        }

        public void UpdatePassword(int id, string password)
        {
            var user = _userManager.GetUser(id);

            if (user == null) {
                throw new MessageException("找不到需要更新密码的管理员");
            }

            _userManager.UpdatePassword(user, password);
        }

        public void UpdatePassword(User user, string password)
        {
            _userManager.UpdatePassword(user, password);
        }

        public void AddRole(User user, Role role)
        {
            _userManager.AddUserRole(user, role);
        }

        public void Remove(User user, Role role)
        {
            _userManager.RemoveRole(user, role);
        }
    }
}
