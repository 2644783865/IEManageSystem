using IEManageSystem.ApiAuthorization.DomainModel;
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
        private CheckPermissionService _checkPermissionService = new CheckPermissionService();

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, ApiAuthorizationRequirement requirement)
        {
            if (context.User != null &&
                context.User.HasClaim(c => c.Type == ""))
            {
                // 授权通过
                context.Succeed(requirement);
            }
            return Task.CompletedTask;
        }
    }
}
