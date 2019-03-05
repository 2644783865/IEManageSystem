using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Abp.Modules;
using Abp.Reflection.Extensions;
using IEManageSystem.Configuration;
using Abp.Zero.Configuration;
using Abp.AspNetCore.Configuration;
using IEManageSystem.EntityFrameworkCore;
using Abp.AspNetCore;
using IEManageSystem.Api.Configuration;
using IEManageSystem.IdentityServerEF;
using IEManageSystem.ApiAuthorization.Authorizations;
using Microsoft.AspNetCore.Mvc.ApplicationModels;
using Microsoft.AspNetCore.Mvc;
using IEManageSystem.ApiAuthorization.DomainModel.ApiSingles;
using IEManageSystem.ApiAuthorization;
using Abp.Domain.Uow;
using IEManageSystem.Help.IEApiScopeHelp;
using IEManageSystem.Api.Help;

namespace IEManageSystem.Api.Startup
{
    [DependsOn(
        typeof(IEManageSystemApplicationModule),
        typeof(IEManageSystemEntityFrameworkCoreModule),
        typeof(IEIdentityServerEFModule),
        typeof(AbpAspNetCoreModule)
    )]
    public class IEManageSystemWebHostModule: AbpModule
    {
        private readonly IConfigurationRoot _appConfiguration;

        public IEManageSystemWebHostModule(IHostingEnvironment env)
        {
            _appConfiguration = env.GetAppConfiguration();
        }

        public override void PreInitialize()
        {
            Configuration.Modules.AbpAspNetCore()
                 .CreateControllersForAppServices(
                     typeof(IEManageSystemApplicationModule).GetAssembly()
                 )
                 .ConfigureControllerModel(controllerModel =>
                 {
                     foreach (var action in controllerModel.Actions)
                     {
                         foreach (var selector in action.Selectors)
                         {
                             if (selector.AttributeRouteModel == null)
                             {
                                 // 
                                 selector.AttributeRouteModel = new AttributeRouteModel(
                                     new RouteAttribute(
                                         IEUrlHelper.CreateUrl(controllerModel.ControllerName, action.ActionName)
                                     )
                                 );
                             }
                         }
                     }
                 });
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(IEManageSystemWebHostModule).GetAssembly());
        }

        public override void PostInitialize()
        {
            IUnitOfWorkManager unitOfWorkManager = IocManager.Resolve<IUnitOfWorkManager>();

            using (var unitOfWork = unitOfWorkManager.Begin())
            {
                var apiAuthorizationConfiguration = IocManager.Resolve<ApiAuthorizationConfiguration>();

                new IEApiScopeProvider().Register((name, displayName) => 
                {
                    apiAuthorizationConfiguration.RegisterApiScope(name, displayName);
                });

                unitOfWorkManager.Current.SaveChanges();

                apiAuthorizationConfiguration.RegisterApiSingle(typeof(IEManageSystemWebHostModule).GetAssembly());

                apiAuthorizationConfiguration.RegisterApiSingle(typeof(IEManageSystemApplicationModule).GetAssembly());

                unitOfWork.Complete();
            }
        }
    }
}
