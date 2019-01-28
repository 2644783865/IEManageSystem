using Abp.Domain.Repositories;
using IEManageSystem.ApiAuthorization.DomainModel;
using IEManageSystem.ApiAuthorization.DomainModel.ApiScopes;
using IEManageSystem.ApiAuthorization.DomainModel.ApiSingles;
using IEManageSystem.Dtos.ApiAuthorization;
using IEManageSystem.Dtos.Core;
using IEManageSystem.Entitys.Authorization;
using IEManageSystem.Entitys.Authorization.Permissions;
using IEManageSystem.Services.ManageHome.AuthorizeManage.ApiScopes.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace IEManageSystem.Services.ManageHome.AuthorizeManage.ApiScopes
{
    public class ApiScopeManageAppService: IEManageSystemAppServiceBase, IApiScopeManageAppService
    {
        private ApiScopeManager _apiScopeManager { get; set; }

        private IRepository<Permission> _permissionRepository { get; set; }

        private ApiSingleManager _apiSingleManager { get; set; }

        public ApiScopeManageAppService(
            ApiScopeManager apiScopeManager,
            IRepository<Permission> permissionRepository,
            ApiSingleManager apiSingleManager)
        {
            _apiScopeManager = apiScopeManager;

            _permissionRepository = permissionRepository;

            _apiSingleManager = apiSingleManager;
        }

        public async Task<GetApiScopesOutput> GetApiScopes(GetApiScopesInput input)
        {
            return new GetApiScopesOutput() {
                ApiScopes = AutoMapper.Mapper.Map<List<ApiScopeDto>>(_apiScopeManager.GetApiScopes().ToList())
            };
        }

        public async Task<GetManagePermissionsOutput> GetManagePermissions(GetManagePermissionsInput input)
        {
            Expression<Func<ApiScope, object>>[] propertySelectors = new Expression<Func<ApiScope, object>>[] {
                e => e.ApiManageScope.ApiScopePermissions
            };

            var apiScope = _apiScopeManager.GetApiScopes(propertySelectors).FirstOrDefault(e=>e.Id == input.Id);
            if (apiScope == null) {
                return new GetManagePermissionsOutput() { ErrorMessage = "未找到Api域" };
            }

            var permissionIds = apiScope.ApiManageScope.ApiScopePermissions.Select(e => e.PermissionId).ToList();

            var apiScopePermissions = _permissionRepository.GetAllList(e=>permissionIds.Contains(e.Id));

            return new GetManagePermissionsOutput() {
                Permissions = AutoMapper.Mapper.Map<List<PermissionDto>>(apiScopePermissions)
            };
        }

        public async Task<AddManagePermissionOutput> AddManagePermission(AddManagePermissionInput input)
        {
            _apiScopeManager.AddManagePermission(input.ApiScopeId, input.PermissionId);

            return new AddManagePermissionOutput();
        }

        public async Task<RemoveManagePermissionOutput> RemoveManagePermission(RemoveManagePermissionInput input)
        {
            _apiScopeManager.RemoveManagePermission(input.ApiScopeId, input.PermissionId);

            return new RemoveManagePermissionOutput();
        }

        public async Task<GetQueryPermissionsOutput> GetQueryPermissions(GetQueryPermissionsInput input)
        {
            Expression<Func<ApiScope, object>>[] propertySelectors = new Expression<Func<ApiScope, object>>[] {
                e => e.ApiQueryScope.ApiScopePermissions
            };

            var apiScope = _apiScopeManager.GetApiScopes(propertySelectors).FirstOrDefault(e => e.Id == input.Id);
            if (apiScope == null)
            {
                return new GetQueryPermissionsOutput() { ErrorMessage = "未找到Api域" };
            }

            var permissionIds = apiScope.ApiQueryScope.ApiScopePermissions.Select(e => e.PermissionId).ToList();

            var apiScopePermissions = _permissionRepository.GetAllList(e => permissionIds.Contains(e.Id));

            return new GetQueryPermissionsOutput()
            {
                Permissions = AutoMapper.Mapper.Map<List<PermissionDto>>(apiScopePermissions)
            };
        }

        public async Task<AddQueryPermissionOutput> AddQueryPermission(AddQueryPermissionInput input)
        {
            _apiScopeManager.AddQueryPermission(input.ApiScopeId, input.PermissionId);

            return new AddQueryPermissionOutput();
        }

        public async Task<RemoveQueryPermissionOutput> RemoveQueryPermission(RemoveQueryPermissionInput input)
        {
            _apiScopeManager.RemoveQueryPermission(input.ApiScopeId, input.PermissionId);

            return new RemoveQueryPermissionOutput();
        }

        public async Task<GetApiSinglesOutput> GetApiSingles(GetApiSinglesInput input)
        {
            Expression<Func<ApiScope, object>>[] propertySelectors = new Expression<Func<ApiScope, object>>[] {
                e => e.ApiSingles
            };

            var apiScope = _apiScopeManager.GetApiScopes(propertySelectors).FirstOrDefault(e => e.Id == input.Id);
            if (apiScope == null)
            {
                return new GetApiSinglesOutput() { ErrorMessage = "未找到Api域" };
            }

            return new GetApiSinglesOutput() { ApiSingles = AutoMapper.Mapper.Map<List<ApiSingleDto>>(apiScope.ApiSingles) };
        }

        public async Task<AddApiSingleOutput> AddApiSingle(AddApiSingleInput input)
        {
            _apiScopeManager.AddApiScopeApi(input.ApiScopeId, input.ApiSingleId);

            return new AddApiSingleOutput();
        }

        public async Task<RemoveApiSingleOutput> RemoveApiSingle(RemoveApiSingleInput input)
        {
            _apiScopeManager.RemoveApiScopeApi(input.ApiScopeId, input.ApiSingleId);

            return new RemoveApiSingleOutput();
        }
    }
}
