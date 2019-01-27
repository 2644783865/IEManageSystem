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
        public void Register(ApiSingle apiSingle)
        {
            if (ApiSingleRepository.FirstOrDefault(e => e.Name == apiSingle.Name) != null)
            {
                return;
            }

            ApiSingleRepository.Insert(apiSingle);
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
