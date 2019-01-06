using Abp.AutoMapper;
using Abp.Modules;
using Abp.Reflection.Extensions;
using IEManageSystem.ApiAuthorization;
using IEManageSystem.IdentityServer;

namespace IEManageSystem
{
    [DependsOn(
        typeof(IEManageSystemCoreModule), 
        typeof(IEIdentityServerModule),
        typeof(AbpAutoMapperModule),
        typeof(IEApiAuthorizationModule))]
    public class IEManageSystemApplicationModule : AbpModule
    {
        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(IEManageSystemApplicationModule).GetAssembly());
        }
    }
}