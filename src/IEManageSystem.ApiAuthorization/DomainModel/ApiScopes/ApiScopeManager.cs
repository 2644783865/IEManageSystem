using Abp.Domain.Repositories;
using Abp.Domain.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace IEManageSystem.ApiAuthorization.DomainModel.ApiScopes
{
    public class ApiScopeManager:IDomainService
    {
        private List<ApiScope> _apiScopes { get; set; }

        private IRepository<ApiScope> _repository { get; set; }

        public ApiScopeManager(
            IRepository<ApiScope> repository
            )
        {
            _repository = repository;

            _apiScopes = _repository.GetAllList();
        }

        public void Register(string name)
        {
            if (!_apiScopes.Any(e => e.Name == name))
            {
                ApiScope apiScope = new ApiScope(name);
                _repository.Insert(apiScope);
            }
        }

        public IQueryable<ApiScope> GetApiScopes()
        {
            return _repository.GetAll();
        }

        public ApiScope GetApiScopeForApiSingleName(string name)
        {
            return _repository.FirstOrDefault(e => e.ApiScopeApis.Where(ie => ie.ApiSingleName == name).Any());
        }
    }
}
