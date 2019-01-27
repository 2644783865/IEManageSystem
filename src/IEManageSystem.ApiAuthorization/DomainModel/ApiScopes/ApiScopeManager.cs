using Abp.Domain.Repositories;
using Abp.Domain.Services;
using IEManageSystem.ApiAuthorization.DomainModel.ApiSingles;
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
        private IRepository<ApiScope> _apiScopeRepository { get; set; }

        private IRepository<Permission> _permissionRepository { get; set; }

        private IRepository<ApiSingle> _apiSingleRepository { get; set; }

        public ApiScopeManager(
            IRepository<ApiScope> apiScopeRepository,
            IRepository<Permission> permissionRepository,
            IRepository<ApiSingle> apiSingleRepository
            )
        {
            _apiScopeRepository = apiScopeRepository;

            _permissionRepository = permissionRepository;

            _apiSingleRepository = apiSingleRepository;
        }

        public void Register(string name)
        {
            if (!_apiScopeRepository.GetAll().Any(e => e.Name == name))
            {
                ApiScope apiScope = new ApiScope(name);
                _apiScopeRepository.Insert(apiScope);
            }
        }

        public IQueryable<ApiScope> GetApiScopes() => _apiScopeRepository.GetAll();

        public IQueryable<ApiScope> GetApiScopes(Expression<Func<ApiScope, object>>[] propertySelectors)
        {
            return _apiScopeRepository.GetAllIncluding(propertySelectors);
        }

        public IQueryable<ApiScope> GetApiScopesForApiSingleName(ApiSingle apiSingle)
        {
            return _apiScopeRepository.GetAll().Where(e => e.ApiSingles.Where(ie => ie.Id == apiSingle.Id).Any());
        }

        public void AddPermission(int apiScopeId, int permissionId)
        {
            var apiScope = _apiScopeRepository.FirstOrDefault(apiScopeId);
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
            var apiScope = _apiScopeRepository.GetAllIncluding(propertySelectors).FirstOrDefault(e => e.Id == apiScopeId);

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

        public void AddApiScopeApi(int apiScopeId, int apiSingleId)
        {
            var apiScope = _apiScopeRepository.FirstOrDefault(apiScopeId);
            if (apiScope == null)
            {
                throw new Exception("找不到Api域");
            }

            var apiSingle = _apiSingleRepository.Get(apiSingleId);
            if (apiSingle == null)
            {
                throw new Exception("找不到要添加的Api");
            }

            apiScope.AddApiScopeApi(apiSingle);
        }

        public void AddApiScopeApi(string apiScopeName, ApiSingle apiSingle)
        {
            var apiScope = _apiScopeRepository.FirstOrDefault(e => e.Name == apiScopeName);
            if (apiScope == null)
            {
                throw new Exception("找不到Api域");
            }

            apiScope.AddApiScopeApi(apiSingle);
        }

        public void RemoveApiScopeApi(int apiScopeId, int apiSingleId)
        {
            var apiScope = _apiScopeRepository.FirstOrDefault(apiScopeId);
            if (apiScope == null)
            {
                throw new Exception("找不到Api域");
            }

            var apiSingle = _apiSingleRepository.Get(apiSingleId);
            if (apiSingle == null)
            {
                throw new Exception("找不到要移除的Api");
            }

            apiScope.RemoveApiScopeApi(apiSingle);
        }
    }
}
