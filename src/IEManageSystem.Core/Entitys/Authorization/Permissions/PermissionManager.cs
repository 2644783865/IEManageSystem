using Abp.Domain.Repositories;
using Abp.Domain.Services;
using IEManageSystem.Help.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace IEManageSystem.Entitys.Authorization.Permissions
{
    public class PermissionManager:IDomainService
    {
        public IRepository<Permission> PermissionRepository { get; set; }

        public PermissionManager(
            IRepository<Permission> permissionRepository)
        {
            PermissionRepository = permissionRepository;
        }

        public void Create(Permission permission)
        {
            if (PermissionRepository.GetAll().Any(e => e.Name == permission.Name))
            {
                throw new MessageException($"已有名为{permission.Name}的权限，无法重复添加");
            }

            PermissionRepository.Insert(permission);
        }
    }
}
