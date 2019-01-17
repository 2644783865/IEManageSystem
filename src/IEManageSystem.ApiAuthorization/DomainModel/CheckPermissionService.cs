using Abp.Domain.Repositories;
using Abp.Domain.Services;
using IEManageSystem.ApiAuthorization.DomainModel.ApiScopes;
using IEManageSystem.Entitys.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;

namespace IEManageSystem.ApiAuthorization.DomainModel
{
    public class CheckPermissionService : IDomainService
    {
        private ApiScopeManager _apiScopeManager { get; set; }

        private IRepository<Permission> _permissionRepository { get; set; }

        public CheckPermissionService(
            ApiScopeManager apiScopeManager,
            IRepository<Permission> permissionRepository)
        {
            _apiScopeManager = apiScopeManager;

            _permissionRepository = permissionRepository;
        }

        public bool IsAllowAccess(ApiScope apiScope, string permissionName)
        {
            Expression<Func<ApiScope, object>>[] propertySelectors = new Expression<Func<ApiScope, object>>[] {
                e=>e.ApiScopePermissions
            };
            _apiScopeManager.GetApiScopes(propertySelectors).FirstOrDefault(e=>e.Id == apiScope.Id);

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
