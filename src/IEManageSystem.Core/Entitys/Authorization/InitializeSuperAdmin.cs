using Abp.Domain.Repositories;
using Abp.Domain.Services;
using Abp.Domain.Uow;
using IEManageSystem.Entitys.Authorization.Permissions;
using IEManageSystem.Entitys.Authorization.Roles;
using IEManageSystem.Entitys.Authorization.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using UtilityAction.Other;

namespace IEManageSystem.Entitys.Authorization
{
    public class InitializeSuperAdmin:IDomainService
    {
        public IUnitOfWorkManager _unitOfWorkManager { get; set; }

        private UserManager _userManager { get; set; }

        private RoleManager _roleManager { get; set; }

        public InitializeSuperAdmin(
            UserManager userManager,
            RoleManager roleManager,
            IUnitOfWorkManager unitOfWorkManager)
        {
            _userManager = userManager;

            _roleManager = roleManager;

            _unitOfWorkManager = unitOfWorkManager;
        }

        public void Initialize()
        {
            if (_userManager.UserRepository.Count() > 0) {
                return;
            }

            using (var unitOfWork = _unitOfWorkManager.Begin())
            {
                try
                {
                    var superAdminRole = Role.SuperAdmin;

                    _roleManager.CreateRole(superAdminRole).Wait();

                    //_unitOfWorkManager.Current.SaveChanges();

                    _roleManager.AddPermission(superAdminRole, Permission.SuperPermission);

                    User superAdmin = _userManager.CreateUser("SuperAdmin", "123456", "超级管理员").Result;

                    //_unitOfWorkManager.Current.SaveChanges();

                    _userManager.AddUserRole(superAdmin, superAdminRole);

                    unitOfWork.Complete();
                }
                catch
                {
                }
            }
        }
    }
}
