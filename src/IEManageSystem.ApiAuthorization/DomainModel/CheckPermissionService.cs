using Abp.Domain.Repositories;
using Abp.Domain.Services;
using IEManageSystem.ApiAuthorization.DomainModel.ApiScopes;
using IEManageSystem.ApiAuthorization.DomainModel.ApiSingles;
using IEManageSystem.Entitys.Authorization;
using IEManageSystem.Entitys.Authorization.Permissions;
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

        private ApiSingleManager _apiSingleManager { get; set; }

        private IRepository<Permission> _permissionRepository { get; set; }

        public CheckPermissionService(
            ApiScopeManager apiScopeManager,
            ApiSingleManager apiSingleManager,
            IRepository<Permission> permissionRepository)
        {
            _apiScopeManager = apiScopeManager;

            _apiSingleManager = apiSingleManager;

            _permissionRepository = permissionRepository;
        }

        public bool IsAllowAccess(string apiSingleName, string actionName, List<string> permissionNames)
        {
            // 获取要访问的Api方法
            Expression<Func<ApiSingle, object>>[] apiSingleSelectors = new Expression<Func<ApiSingle, object>>[] {
                e => e.ApiSingleActions
            };
            var apiSingle = _apiSingleManager.ApiSingleRepository.GetAllIncluding(apiSingleSelectors).FirstOrDefault(e => e.Name == apiSingleName);

            if (apiSingle == null) {
                return false;
            }

            var apiSingleAction = apiSingle.ApiSingleActions.FirstOrDefault(e => e.Name == actionName);

            if (apiSingleAction == null) {
                return false;
            }

            // 获取要访问的Api域
            Expression<Func<ApiScope, object>>[] apiScopeSelectors = new Expression<Func<ApiScope, object>>[]
            {
                e => e.ApiManageScope,
                e => e.ApiManageScope.ApiScopePermissions,
                e => e.ApiQueryScope,
                e => e.ApiQueryScope.ApiScopePermissions,
            };
            var apiScope = _apiScopeManager.ApiScopeRepository.GetAllIncluding(apiScopeSelectors).FirstOrDefault(e => e.ApiSingles.Where(ie => ie.Id == apiSingle.Id).Any());

            // 获取拥有的权限
            var permissions = _permissionRepository.GetAllList(e => permissionNames.Contains(e.Name)).ToList();

            if (apiSingleAction.IsQueryAction == true)
            {
                return apiScope.ApiQueryScope.IsAllowAccess(permissions);
            }

            return apiScope.ApiManageScope.IsAllowAccess(permissions);
        }
    }
}
