using Abp.Domain.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace IEManageSystem.ApiAuthorization.DomainModel.ApiScopes
{
    public class ApiScopeManager:IDomainService
    {
        private static List<ApiScope> _apiScopes { get; set; } = new List<ApiScope>();

        public ApiScopeManager() {
        }

        public void Register(string name)
        {
            if (_apiScopes.Where(e => e.Name == name).Any())
            {
                throw new Exception("已存在名为" + name + "的Api域");
            }

            _apiScopes.Add(new ApiScope(name));
        }

        public ApiScope GetApiSingleForControllerName(string controllerName)
        {
            return _apiScopes.FirstOrDefault(e => e.ApiSingles.Where(ie => ie.ControllerName == controllerName).Any());
        }
    }
}
