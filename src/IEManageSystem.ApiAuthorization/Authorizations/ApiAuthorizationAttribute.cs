using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace IEManageSystem.ApiAuthorization.Authorizations
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, AllowMultiple = true, Inherited = true)]
    public class ApiAuthorizationAttribute : Attribute, IAsyncAuthorizationFilter
    {
        public async Task OnAuthorizationAsync(AuthorizationFilterContext context)
        {
            var requirement = new ApiAuthorizationRequirement(
                ((Microsoft.AspNetCore.Mvc.Controllers.ControllerActionDescriptor)context.ActionDescriptor).ControllerName);

            var authorizationService = context.HttpContext.RequestServices.GetRequiredService<IAuthorizationService>();

            var authorizationResult = await authorizationService.AuthorizeAsync(context.HttpContext.User, null, requirement);

            if (!authorizationResult.Succeeded)
            {
                // context.Result = new ForbidResult();
            }
        }
    }
}
