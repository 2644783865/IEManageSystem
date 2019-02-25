using Abp.Domain.Repositories;
using Abp.Domain.Services;
using Abp.Domain.Uow;
using Castle.Core.Logging;
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
        public ILogger Logger { get; set; }

        private IUnitOfWorkManager _unitOfWorkManager { get; set; }

        private UserManager _userManager { get; set; }

        private RoleManager _roleManager { get; set; }

        public InitializeSuperAdmin(
            UserManager userManager,
            RoleManager roleManager,
            IUnitOfWorkManager unitOfWorkManager)
        {
            Logger = NullLogger.Instance;

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

                    _roleManager.AddPermission(superAdminRole, Permission.SuperPermission);

                    User superAdmin = _userManager.CreateUser("SuperAdmin", "123456", "超级管理员").Result;

                    _userManager.AddUserRole(superAdmin, superAdminRole);

                    unitOfWork.Complete();
                }
                catch(Exception ex)
                {
                    Logger.Error(ex.Message);
                }
            }
        }
    }
}
