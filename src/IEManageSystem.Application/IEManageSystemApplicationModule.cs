using Abp.AutoMapper;
using Abp.Modules;
using Abp.Reflection.Extensions;
using IEManageSystem.ApiAuthorization;
using IEManageSystem.CMS;
using IEManageSystem.IdentityServer;
using IEManageSystem.JwtAuthentication;

namespace IEManageSystem
{
    [DependsOn(
        typeof(IEManageSystemCoreModule), 
        typeof(IEIdentityServerModule),
        typeof(AbpAutoMapperModule),
        typeof(IEApiAuthorizationModule),
        typeof(IEJwtAuthenticationModule),
        typeof(IEManageSystemCMSModule))]
    public class IEManageSystemApplicationModule : AbpModule
    {
        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(IEManageSystemApplicationModule).GetAssembly());
        }
    }
}