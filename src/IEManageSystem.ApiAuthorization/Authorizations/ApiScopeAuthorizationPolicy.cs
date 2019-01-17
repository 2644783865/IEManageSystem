using IEManageSystem.ApiAuthorization.DomainModel;
using IEManageSystem.ApiAuthorization.DomainModel.ApiScopes;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authorization.Infrastructure;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace IEManageSystem.ApiAuthorization.Authorizations
{
    public class ApiScopeAuthorizationPolicy : AuthorizationHandler<ApiAuthorizationRequirement>
    {
        private CheckPermissionService _checkPermissionService { get; set; }

        private ApiScopeManager _apiScopeManager { get; set; }

        private ApiSingleManager _apiSingleManager { get; set; }

        public ApiScopeAuthorizationPolicy(
            ApiScopeManager apiScopeManager,
            ApiSingleManager apiSingleManager,
            CheckPermissionService checkPermissionService)
        {
            _apiScopeManager = apiScopeManager;

            _apiSingleManager = apiSingleManager;

            _checkPermissionService = checkPermissionService;
        }
        

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, ApiAuthorizationRequirement requirement)
        {
            if (context.User == null)
            {
                return Task.CompletedTask;
            }

            if(!context.User.HasClaim(c => c.Type == ApiAuthorizationConfigure.ApiPermissiionClaimName))
            {
                return Task.CompletedTask;
            }

            // 获取要访问的Api
            var apiSingle = _apiSingleManager.GetApiSingleForControllerName(requirement.ControllerName);

            // 获取Api所在的Api域
            var apiScope = _apiScopeManager.GetApiScopeForApiSingleName(apiSingle.Name);

            // 检查权限
            if (!_checkPermissionService.IsAllowAccess(apiScope, requirement.PermissionName))
            {
                return Task.CompletedTask;
            }

            // 授权通过
            context.Succeed(requirement);
            return Task.CompletedTask;
        }
    }
}
