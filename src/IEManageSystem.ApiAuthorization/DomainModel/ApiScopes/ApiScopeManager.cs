using Abp.Domain.Repositories;
using Abp.Domain.Services;
using IEManageSystem.Entitys.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;

namespace IEManageSystem.ApiAuthorization.DomainModel.ApiScopes
{
    public class ApiScopeManager:IDomainService
    {
        private List<ApiScope> _apiScopes { get; set; }

        private IRepository<ApiScope> _repository { get; set; }

        private IRepository<Permission> _permissionRepository { get; set; }

        private ApiSingleManager _apiSingleManager { get; set; }

        public ApiScopeManager(
            IRepository<ApiScope> repository,
            IRepository<Permission> permissionRepository,
            ApiSingleManager apiSingleManager
            )
        {
            _repository = repository;

            _apiScopes = _repository.GetAllList();

            _permissionRepository = permissionRepository;

            _apiSingleManager = apiSingleManager;
        }

        public void Register(string name)
        {
            if (!_apiScopes.Any(e => e.Name == name))
            {
                ApiScope apiScope = new ApiScope(name);
                _repository.Insert(apiScope);
            }
        }

        public IQueryable<ApiScope> GetApiScopes() => _repository.GetAll();

        public IQueryable<ApiScope> GetApiScopes(Expression<Func<ApiScope, object>>[] propertySelectors)
        {
            return _repository.GetAllIncluding(propertySelectors);
        }

        public ApiScope GetApiScopeForApiSingleName(string name)
        {
            return _repository.FirstOrDefault(e => e.ApiScopeApis.Where(ie => ie.ApiSingleName == name).Any());
        }

        public void AddPermission(int apiScopeId, int permissionId)
        {
            var apiScope = _repository.FirstOrDefault(apiScopeId);
            if (apiScope == null)
            {
                throw new Exception("找不到Api域");
            }

            var permission = _permissionRepository.FirstOrDefault(permissionId);
            if (permission == null)
            {
                throw new Exception("找不到要添加的权限");
            }

            apiScope.AddPermission(permission);
        }

        public void RemovePermission(int apiScopeId, int permissionId)
        {
            Expression<Func<ApiScope, object>>[] propertySelectors = new Expression<Func<ApiScope, object>>[] {
                e=>e.ApiScopePermissions
            };
            var apiScope = _repository.GetAllIncluding(propertySelectors).FirstOrDefault(e => e.Id == apiScopeId);

            if (apiScope == null)
            {
                throw new Exception("找不到Api域");
            }

            var permission = _permissionRepository.FirstOrDefault(permissionId);
            if (permission == null)
            {
                throw new Exception("找不到要移除的权限");
            }

            apiScope.RemovePermission(permission);
        }

        public void AddApiScopeApi(int apiScopeId, string apiSingleName)
        {
            var apiScope = _repository.FirstOrDefault(apiScopeId);
            if (apiScope == null)
            {
                throw new Exception("找不到Api域");
            }

            var apiSingle = _apiSingleManager.GetApiSingles().FirstOrDefault(e=>e.Name == apiSingleName);
            if (apiSingle == null)
            {
                throw new Exception("找不到要添加的Api");
            }

            apiScope.AddApiScopeApi(apiSingle);
        }

        public void RemoveApiScopeApi(int apiScopeId, string apiSingleName)
        {
            var apiScope = _repository.FirstOrDefault(apiScopeId);
            if (apiScope == null)
            {
                throw new Exception("找不到Api域");
            }

            var apiSingle = _apiSingleManager.GetApiSingles().FirstOrDefault(e => e.Name == apiSingleName);
            if (apiSingle == null)
            {
                throw new Exception("找不到要移除的Api");
            }

            apiScope.RemoveApiScopeApi(apiSingle);
        }
    }
}
