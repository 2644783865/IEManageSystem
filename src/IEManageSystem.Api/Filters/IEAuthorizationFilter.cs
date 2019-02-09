using Abp.Dependency;
using Abp.Runtime.Session;
using IEManageSystem.Api.Help.ClaimHelp;
using IEManageSystem.Entitys.Authorization.LoginManagers;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace IEManageSystem.Api.Filters
{
    public class IEAuthorizationFilter : IAsyncAuthorizationFilter, ITransientDependency
    {
        private IAbpSession _AbpSession { get; set; }

        public IEAuthorizationFilter(
            IAbpSession abpSession)
        {
            _AbpSession = abpSession;
        }

        public async Task OnAuthorizationAsync(AuthorizationFilterContext context)
        {
        }
    }
}
