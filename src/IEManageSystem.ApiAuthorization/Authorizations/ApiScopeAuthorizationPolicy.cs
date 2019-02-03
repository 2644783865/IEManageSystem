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
using IEManageSystem.ApiAuthorization.DomainModel.ApiSingles;
using System.Linq.Expressions;
using Abp.Domain.Uow;

namespace IEManageSystem.ApiAuthorization.Authorizations
{
    public class ApiScopeAuthorizationPolicy : AuthorizationHandler<ApiAuthorizationRequirement>
    {
        private CheckPermissionService _checkPermissionService { get; set; }

        private IUnitOfWorkManager _unitOfWorkManager { get; set; }

        public ApiScopeAuthorizationPolicy(
            CheckPermissionService checkPermissionService,
            IUnitOfWorkManager unitOfWorkManager)
        {
            _checkPermissionService = checkPermissionService;
            _unitOfWorkManager = unitOfWorkManager;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, ApiAuthorizationRequirement requirement)
        {
            using (var unitOfWork = _unitOfWorkManager.Begin())
            {
                if (context.User == null)
                {
                    return Task.CompletedTask;
                }

                if (!context.User.HasClaim(c => c.Type == ApiAuthorizationExtensions.ApiPermissiionClaimName))
                {
                    return Task.CompletedTask;
                }

                // 获取当前用户拥有的权限
                List<Claim> permissionClaims = context.User.Claims.Where(e => e.Type == ApiAuthorizationExtensions.ApiPermissiionClaimName).ToList();

                if (_checkPermissionService.IsAllowAccess(requirement.ControllerName, requirement.ActionName, permissionClaims.Select(e => e.Value).ToList()))
                {
                    // 授权通过
                    context.Succeed(requirement);
                    return Task.CompletedTask;
                }
            }

            return Task.CompletedTask;
        }
    }
}
