using IEManageSystem.ApiAuthorization.DomainModel.ApiScopes;
using IEManageSystem.ApiAuthorization.DomainModel.ApiSingles;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Reflection;
using System.Text;
using System.Text.RegularExpressions;

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

        public void RegisterApiScope(string name, string displayName)
        {
            _apiScopeManager.Register(name, displayName);
        }

        public void RegisterApiSingle(Assembly assembly)
        {
            Type[] types = assembly.GetTypes();
            foreach (Type item in types)
            {
                if (IsExistApiAuthorizationAttribute(item))
                    RegisterApiSingleByType(item);
            }
        }

        private bool IsExistApiAuthorizationAttribute(Type type)
        {
            if (type == null)
            {
                return false;
            }

            foreach (var attribute in type.CustomAttributes)
            {
                if (attribute.AttributeType == typeof(ApiAuthorizationAttribute))
                {
                    return true;
                }
            }

            return false;
        }

        private void RegisterApiSingleByType(Type controllerType)
        {
            string controllerName = controllerType.Name;
            //if (Regex.IsMatch(controllerType.Name, "AppService$"))
            //{
            //    controllerName = Regex.Replace(controllerType.Name, "AppService$", "");
            //}
            //else if (Regex.IsMatch(controllerType.Name, "Controller$"))
            //{
            //    controllerName = Regex.Replace(controllerType.Name, "Controller$", "");
            //}

            // 如果api已注册过，则返回
            if (_apiSingleManager.ApiSingleRepository.FirstOrDefault(e => e.Name == controllerName) != null) {
                return;
            }

            ApiSingle apiSingle = new ApiSingle(controllerName);

            List<ApiSingleAction> apiSingleActions = new List<ApiSingleAction>();

            foreach (var methodInfo in controllerType.GetMethods(BindingFlags.Instance | BindingFlags.Public | BindingFlags.DeclaredOnly))
            {
                apiSingleActions.Add(new ApiSingleAction(methodInfo.Name)
                {
                    IsQueryAction = IsQueryMethod(methodInfo)
                });
            }

            apiSingle.ApiSingleActions = apiSingleActions;

            _apiSingleManager.Register(apiSingle);

            string apiScopeName = null;

            foreach (var attribute in controllerType.CustomAttributes)
            {
                if (attribute.AttributeType == typeof(ApiAuthorizationAttribute))
                {
                    if (attribute.ConstructorArguments.Count > 0)
                        apiScopeName = attribute.ConstructorArguments[0].Value.ToString();
                }
            }

            if (string.IsNullOrEmpty(apiScopeName))
            {
                return;
            }

            _apiScopeManager.AddApiScopeApi(apiScopeName, apiSingle);
        }

        public bool IsQueryMethod(MethodInfo methodInfo)
        {
            foreach (var attribute in methodInfo.CustomAttributes)
            {
                if (attribute.AttributeType == typeof(ApiAuthorizationQueryAttribute))
                {
                    return true;
                }
            }

            return false;
        }
    }
}
