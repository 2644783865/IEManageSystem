using IEManageSystem.ApiAuthorization.DomainModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Reflection;
using System.Text;

namespace IEManageSystem.ApiAuthorization.Authorizations
{
    public static class ApiAuthorizationConfigure
    {
        public const string ApiPermissiionClaimName = "ApiPermissiionClaim";

        public static IServiceCollection AddApiAuthorization(this IServiceCollection services)
        {
            return services.AddScoped<IAuthorizationHandler, ApiScopeAuthorizationPolicy>();
        }

        public static IServiceCollection AddApiScopeProvider<T>(this IServiceCollection services) where T: ApiScopeProvider
        {
            return services.AddScoped<ApiScopeProvider, T>();
        }

        public static void RegisterApi(Assembly assembly)
        {
            Type[] types = assembly.GetTypes();
            foreach (Type item in types) {
                if (IsController(item)) {
                    ApiSingleManager.Register(item.Name);
                }
            }
        }

        private static bool IsController(Type type)
        {
            if (type == null) {
                return false;
            }

            if (type == typeof(Controller)) {
                return true;
            }

            return IsController(type.BaseType);
        }
    }
}
