using Abp.Domain.Repositories;
using Abp.Domain.Services;
using Abp.Domain.Uow;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IEManageSystem.Entitys.Authorization.Roles
{
    public class RoleManager : IDomainService
    {
        public bool AutoSaveChanges { get; set; } = true;

        private IUnitOfWorkManager _unitOfWorkManager { get; set; }

        private IRepository<Role> _roleRepository { get; set; }

        private IRepository<Permission> _permissionRepository { get; set; }

        public RoleManager(
            IRepository<Role> repository,
            IRepository<Permission> permissionRepository,
            IUnitOfWorkManager unitOfWorkManager)
        {
            _roleRepository = repository;

            _permissionRepository = permissionRepository;

            _unitOfWorkManager = unitOfWorkManager;
        }

        protected Task SaveChanges()
        {
            if (!AutoSaveChanges || _unitOfWorkManager.Current == null)
            {
                return Task.CompletedTask;
            }

            return _unitOfWorkManager.Current.SaveChangesAsync();
        }

        public async Task CreateRole(Role role)
        {
            _roleRepository.Insert(role);

            await SaveChanges();
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
