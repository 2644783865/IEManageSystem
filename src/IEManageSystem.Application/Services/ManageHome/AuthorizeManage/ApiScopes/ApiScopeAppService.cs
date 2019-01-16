using Abp.Domain.Repositories;
using IEManageSystem.ApiAuthorization.DomainModel;
using IEManageSystem.ApiAuthorization.DomainModel.ApiScopes;
using IEManageSystem.Dtos.ApiAuthorization;
using IEManageSystem.Dtos.Core;
using IEManageSystem.Entitys.Authorization;
using IEManageSystem.Services.ManageHome.AuthorizeManage.ApiScopes.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;

namespace IEManageSystem.Services.ManageHome.AuthorizeManage.ApiScopes
{
    public class ApiScopeAppService: IApiScopeAppService
    {
        private ApiScopeManager _apiScopeManager { get; set; }

        private IRepository<Permission> _permissionRepository { get; set; }

        private ApiSingleManager _apiSingleManager { get; set; }

        public ApiScopeAppService(
            ApiScopeManager apiScopeManager,
            IRepository<Permission> permissionRepository,
            ApiSingleManager apiSingleManager)
        {
            _apiScopeManager = apiScopeManager;

            _permissionRepository = permissionRepository;

            _apiSingleManager = apiSingleManager;
        }

        public GetApiScopesOutput GetApiScopes(GetApiScopesInput input)
        {
            return new GetApiScopesOutput() {
                ApiScopes = AutoMapper.Mapper.Map<List<ApiScopeDto>>(_apiScopeManager.GetApiScopes().ToList())
            };
        }

        public GetApiScopePermissionOutput GetApiScopePermissions(GetApiScopePermissionInput input)
        {
            Expression<Func<ApiScope, object>>[] propertySelectors = new Expression<Func<ApiScope, object>>[] {
                e => e.ApiScopePermissions
            };

            var apiScope = _apiScopeManager.GetApiScopes(propertySelectors).FirstOrDefault(e=>e.Id == input.Id);
            if (apiScope == null) {
                return new GetApiScopePermissionOutput() { ErrorMessage = "为找到Api域" };
            }

            var permissionIds = apiScope.ApiScopePermissions.Select(e => e.PermissionId).ToList();

            var apiScopePermissions = _permissionRepository.GetAllList(e=>permissionIds.Contains(e.Id));

            return new GetApiScopePermissionOutput() {
                Permissions = AutoMapper.Mapper.Map<List<PermissionDto>>(apiScopePermissions)
            };
        }

        public GetApiScopeApiSinglesOutput GetApiScopeApiSingles(GetApiScopeApiSinglesInput input)
        {
            Expression<Func<ApiScope, object>>[] propertySelectors = new Expression<Func<ApiScope, object>>[] {
                e => e.ApiScopeApis
            };

            var apiScope = _apiScopeManager.GetApiScopes(propertySelectors).FirstOrDefault(e => e.Id == input.Id);
            if (apiScope == null)
            {
                return new GetApiScopeApiSinglesOutput() { ErrorMessage = "为找到Api域" };
            }

            var apiSingleNames = apiScope.ApiScopeApis.Select(e => e.ApiSingleName).ToList();
            var apiSingles = _apiSingleManager.GetApiSingles().Where(e => apiSingleNames.Contains(e.Name)).ToList();

            return new GetApiScopeApiSinglesOutput() { ApiSingles = AutoMapper.Mapper.Map<List<ApiSingleDto>>(apiSingles) };
        }
    }
}
