using IEManageSystem.ApiAuthorization.DomainModel.ApiScopes;
using IEManageSystem.ApiAuthorization.DomainModel.ApiSingles;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Reflection;
using System.Text;

namespace IEManageSystem.ApiAuthorization
{
    public class ApiAuthorizationConfiguration
    {
        private ApiScopeManager _apiScopeManager { get; set; }

        private ApiSingleManager _apiSingleManager { get; set; }

        public ApiAuthorizationConfiguration(
            ApiScopeManager apiScopeManager,
            ApiSingleManager apiSingleManager)
        {
            _apiScopeManager = apiScopeManager;

            _apiSingleManager = apiSingleManager;
        }

        public void RegisterApiScope(string name)
        {
            _apiScopeManager.Register(name);
        }

        public void RegisterApiSingle(Assembly assembly)
        {
            Type[] types = assembly.GetTypes();
            foreach (Type item in types)
            {
                if (IsController(item))
                {
                    _apiSingleManager.Register(item);
                }
            }
        }

        private bool IsController(Type type)
        {
            if (type == null)
            {
                return false;
            }

            if (type == typeof(Controller))
            {
                return true;
            }

            return IsController(type.BaseType);
        }
    }
}
