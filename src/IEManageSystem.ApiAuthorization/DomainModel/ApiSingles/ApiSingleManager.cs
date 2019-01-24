using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using Abp.Domain.Services;
using Abp.Domain.Repositories;
using Microsoft.AspNetCore.Mvc;
using System.Reflection;
using IEManageSystem.ApiAuthorization.DomainModel.ApiScopes;
using System.Linq.Expressions;

namespace IEManageSystem.ApiAuthorization.DomainModel.ApiSingles
{
    public class ApiSingleManager: IDomainService
    {
        public IRepository<ApiSingle> ApiSingleRepository { get; set; }

        private IRepository<ApiScope> _apiScopeRepository { get; set; }

        public ApiSingleManager(
            IRepository<ApiSingle> apiSingleRepository,
            IRepository<ApiScope> apiScopeRepository)
        {
            ApiSingleRepository = apiSingleRepository;

            _apiScopeRepository = apiScopeRepository;
        }

        public ApiSingleManager() {
        }

        /// <summary>
        /// 注册Api
        /// </summary>
        /// <param name="controllerType"></param>
        public void Register(Type controllerType)
        {
            ApiSingle apiSingle = ApiSingleRepository.FirstOrDefault(e => e.Name == controllerType.Name);

            if (apiSingle == null)
            {
                apiSingle = new ApiSingle(controllerType.Name);

                ApiSingleRepository.Insert(apiSingle);
            }
            else
            {
                ApiSingleRepository.EnsureCollectionLoaded(apiSingle, e => e.ApiSingleActions);
            }

            foreach (var attribute in controllerType.CustomAttributes)
            {
                if (attribute.AttributeType == typeof(ApiAuthorizationAttribute))
                {
                    string apiScopeName = attribute.ConstructorArguments[0].Value.ToString();

                    var apiScope = _apiScopeRepository.FirstOrDefault(e=>e.Name == apiScopeName);

                    if (apiScope == null) {
                        throw new Exception($"{controllerType.Name}尝试指定一个未注册的api域{apiScopeName}");
                    }

                    apiScope.AddApiScopeApi(apiSingle);
                }
            }

            List<ApiSingleAction> apiSingleActions = new List<ApiSingleAction>();
            foreach (var methodInfo in controllerType.GetMethods())
            {
                if (IsQueryMethod(methodInfo))
                {
                    apiSingleActions.Add(new ApiSingleAction(methodInfo.Name)
                    {
                        IsQueryAction = true
                    });
                }
                else {
                    apiSingleActions.Add(new ApiSingleAction(methodInfo.Name));
                }
            }

            apiSingle.ApiSingleActions = apiSingleActions;
        }

        public bool IsQueryMethod(MethodInfo methodInfo)
        {
            foreach (var attribute in methodInfo.CustomAttributes) {
                if (attribute.AttributeType == typeof(ApiAuthorizationQueryAttribute))
                {
                    return true;
                }
            }

            return false;
        }

        public ApiSingle GetApiSingleForControllerName(string controllerName)
        {
            return ApiSingleRepository.FirstOrDefault(e => e.Name == controllerName);
        }
    }
}
