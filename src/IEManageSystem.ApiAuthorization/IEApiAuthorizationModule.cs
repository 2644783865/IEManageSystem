using Abp.Modules;
using Abp.Reflection.Extensions;
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
    }
}
