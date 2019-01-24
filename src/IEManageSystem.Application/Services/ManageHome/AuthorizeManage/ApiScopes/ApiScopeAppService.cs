using Abp.Domain.Repositories;
using IEManageSystem.ApiAuthorization.DomainModel;
using IEManageSystem.ApiAuthorization.DomainModel.ApiScopes;
using IEManageSystem.ApiAuthorization.DomainModel.ApiSingles;
using IEManageSystem.Dtos.ApiAuthorization;
using IEManageSystem.Dtos.Core;
using IEManageSystem.Entitys.Authorization;
using IEManageSystem.Services.ManageHome.AuthorizeManage.ApiScopes.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

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

        public async Task<GetApiScopesOutput> GetApiScopes(GetApiScopesInput input)
        {
            return new GetApiScopesOutput() {
                ApiScopes = AutoMapper.Mapper.Map<List<ApiScopeDto>>(_apiScopeManager.GetApiScopes().ToList())
            };
        }

        public async Task<GetApiScopePermissionOutput> GetApiScopePermissions(GetApiScopePermissionInput input)
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

        public async Task<AddApiScopePermissionOutput> AddApiScopePermission(AddApiScopePermissionInput input)
        {
            _apiScopeManager.AddPermission(input.ApiScopeId, input.PermissionId);

            return new AddApiScopePermissionOutput();
        }

        public async Task<RemoveApiScopePermissionOutput> RemoveApiScopePermission(RemoveApiScopePermissionInput input)
        {
            _apiScopeManager.RemovePermission(input.ApiScopeId, input.PermissionId);

            return new RemoveApiScopePermissionOutput();
        }

        public async Task<GetApiScopeApiSinglesOutput> GetApiScopeApiSingles(GetApiScopeApiSinglesInput input)
        {
            Expression<Func<ApiScope, object>>[] propertySelectors = new Expression<Func<ApiScope, object>>[] {
                e => e.ApiScopeApis
            };

            var apiScope = _apiScopeManager.GetApiScopes(propertySelectors).FirstOrDefault(e => e.Id == input.Id);
            if (apiScope == null)
            {
                return new GetApiScopeApiSinglesOutput() { ErrorMessage = "为找到Api域" };
            }

            var apiSingleIds = apiScope.ApiScopeApis.Select(e => e.ApiSingleId).ToList();
            var apiSingles = await _apiSingleManager.ApiSingleRepository.GetAllListAsync(e => apiSingleIds.Contains(e.Id));

            return new GetApiScopeApiSinglesOutput() { ApiSingles = AutoMapper.Mapper.Map<List<ApiSingleDto>>(apiSingles) };
        }

        public async Task<AddApiScopeApiSingleOutput> AddApiScopeApiSingle(AddApiScopeApiSingleInput input)
        {
            _apiScopeManager.AddApiScopeApi(input.ApiScopeId, input.ApiSingleId);

            return new AddApiScopeApiSingleOutput();
        }

        public async Task<RemoveApiScopeApiSingleOutput> RemoveApiScopeApiSingle(RemoveApiScopeApiSingleInput input)
        {
            _apiScopeManager.RemoveApiScopeApi(input.ApiScopeId, input.ApiSingleId);

            return new RemoveApiScopeApiSingleOutput();
        }
    }
}
