using IEManageSystem.ApiAuthorization.Authorizations;
using IEManageSystem.ApiAuthorization.DomainModel;
using IEManageSystem.ApiAuthorization.DomainModel.ApiSingles;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Reflection;
using System.Text;

namespace IEManageSystem.ApiAuthorization
{
    public static class ApiAuthorizationExtensions
    {
        public static IServiceCollection AddApiAuthorization(this IServiceCollection services)
        {
            return services.AddScoped<IAuthorizationHandler, ApiScopeAuthorizationPolicy>();
        }
    }
}
