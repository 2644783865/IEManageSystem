using Abp.Domain.Repositories;
using Abp.Domain.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace IEManageSystem.Entitys.Authorization.Roles
{
    public class RoleManager : IDomainService
    {
        private IRepository<Role> _roleRepository { get; set; }

        private IRepository<Permission> _permissionRepository { get; set; }

        public RoleManager(
            IRepository<Role> repository,
            IRepository<Permission> permissionRepository)
        {
            _roleRepository = repository;

            _permissionRepository = permissionRepository;
        }

        public void AddRole(Role role)
        {
            _roleRepository.Insert(role);
        }

        public void AddPermission(Role role, Permission permission)
        {
            _roleRepository.EnsureCollectionLoaded(role, e => e.RolePermissions);

            List<int> permissionIds = role.RolePermissions.Select(e => e.PermissionId).ToList();

            List<Permission> permissions = _permissionRepository.GetAllList(e => permissionIds.Contains(e.Id));

            foreach (var item in permissions)
            {
                if (item == permission) {
                    return;
                }
            }

            role.AddPermission(permission);
        }
    }
}
