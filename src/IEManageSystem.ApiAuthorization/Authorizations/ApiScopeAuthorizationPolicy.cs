using IEManageSystem.ApiAuthorization.DomainModel;
using IEManageSystem.ApiAuthorization.DomainModel.ApiScopes;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authorization.Infrastructure;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Linq;
using System.Security.Claims;

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

            // 获取当前用户拥有的权限
            List<Claim> permissionClaims = context.User.Claims.Where(e => e.Type == ApiAuthorizationConfigure.ApiPermissiionClaimName).ToList();

            // 获取要访问的Api
            var apiSingle = _apiSingleManager.GetApiSingleForControllerName(requirement.ControllerName);

            // 获取要访问的Api域s
            var apiScopes = _apiScopeManager.GetApiScopesForApiSingleName(apiSingle.Name);

            foreach (var apiScope in apiScopes)
            {
                if (CheckPermission(apiScope, permissionClaims))
                {
                    // 授权通过
                    context.Succeed(requirement);
                    return Task.CompletedTask;
                }
            }

            return Task.CompletedTask;
        }

        private bool CheckPermission(ApiScope apiScope, List<Claim> permissionClaims)
        {
            foreach (var permissionClaim in permissionClaims)
            {
                // 检查权限
                if (_checkPermissionService.IsAllowAccess(apiScope, permissionClaim.Value))
                {
                    return true;
                }
            }

            return false;
        }
    }
}
