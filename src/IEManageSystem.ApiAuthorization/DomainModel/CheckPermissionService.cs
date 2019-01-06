using Abp.Domain.Repositories;
using Abp.Domain.Services;
using IEManageSystem.ApiAuthorization.DomainModel.ApiScopes;
using IEManageSystem.Entitys.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace IEManageSystem.ApiAuthorization.DomainModel
{
    public class CheckPermissionService: IDomainService
    {
        private IRepository<Permission> _permissionRepository { get; set; }

        public bool IsAllowAccess(ApiScope apiScope, string permissionName)
        {
            List<int> permissionIds = apiScope.ApiScopePermissions.Select(e => e.PermissionId).ToList();

            var permissions = _permissionRepository.GetAllList(e => permissionIds.Contains(e.Id)).ToList();

            if (!permissions.Where(e => e.Name == permissionName).Any())
            {
                return false;
            }

            return true;
        }
    }
}
