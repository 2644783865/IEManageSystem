﻿using Abp.Modules;
using Abp.Reflection.Extensions;
using Castle.MicroKernel.Registration;
using IEManageSystem.IdentityServer;
using IEManageSystem.IdentityServer.Repositories;
using IEManageSystem.IdentityServerEF.Repositories;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.IdentityServerEF
{
    [DependsOn(
        typeof(IEIdentityServerModule))]
    public class IEIdentityServerEFModule : AbpModule
    {
        public override void PreInitialize()
        {
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(IEIdentityServerEFModule).GetAssembly());

            IocManager.IocContainer.Register(
                    Component.For(typeof(IIEIdentityServerRepository<>)).ImplementedBy(typeof(IEIdentityServerRepository<>)).LifestyleTransient()
                );
        }
    }
}
