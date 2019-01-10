using Abp.Modules;
using Abp.Reflection.Extensions;
using IEManageSystem.ApiAuthorization.Authorizations;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.ApiAuthorization
{
    [DependsOn(
        typeof(IEManageSystemCoreModule))]
    public class IEApiAuthorizationModule : AbpModule
    {
        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(IEApiAuthorizationModule).GetAssembly());
        }

        public override void PostInitialize()
        {
            ApiScopeProvider apiScopeProvider = IocManager.Resolve<ApiScopeProvider>();

            apiScopeProvider.SetApiScope();
        }
    }
}
