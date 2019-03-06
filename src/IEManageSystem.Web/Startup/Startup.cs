using System;
using Abp.AspNetCore;
using Abp.Castle.Logging.Log4Net;
using Abp.EntityFrameworkCore;
using Castle.Facilities.Logging;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.FileProviders;
using System.IO;
using Microsoft.AspNetCore.Http;
using IEManageSystem.Api.Help;
using IEManageSystem.Api.Help.IdentityServerHelp;
using IEManageSystem.Api.Middlewares;
using Microsoft.AspNetCore.Mvc.Razor;
using IdentityServer4.EntityFramework.DbContexts;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using IdentityServer4.EntityFramework.Mappers;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using IEManageSystem.Configuration;
using IEManageSystem.IdentityServerEF.EntityFramework;
using IEManageSystem.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using IEManageSystem.ApiAuthorization;
using IEManageSystem.ApiAuthorization.Authorizations;
using IEManageSystem.Api.Startup;
using IEManageSystem.Web.Filters;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using IdentityModel;
using System.Text;
using IEManageSystem.Api.Configuration;
using IEManageSystem.JwtAuthentication.DomainModel;
using IEManageSystem.JwtAuthentication.Configuration;
using IEManageSystem.JwtAuthentication;

namespace IEManageSystem.Web.Startup
{
    public class Startup
    {
        private IConfigurationRoot _configurationRoot { get; set; }

        public Startup(IHostingEnvironment env)
        {
            _configurationRoot = AppConfigurations.Get(env.ContentRootPath, env.EnvironmentName);

            WebConfiguration.Init(_configurationRoot);
        }

        public IServiceProvider ConfigureServices(IServiceCollection services)
        {
            //Configure DbContext
            services.AddAbpDbContext<IEManageSystemDbContext>(options =>
            {
                IEManageSystem.EntityFrameworkCore.DbContextOptionsConfigurer.Configure(options.DbContextOptions, options.ConnectionString);
            });

            services.AddAbpDbContext<IEConfigurationDbContext>(options =>
            {
                IEManageSystem.IdentityServerEF.EntityFramework.DbContextOptionsConfigurer.Configure(options.DbContextOptions, _configurationRoot.GetConnectionString("IdentityServer"));
            });

            services.AddMvc(options =>
            {
                // options.Filters.Add(new AutoValidateAntiforgeryTokenAttribute());
                options.Filters.Add<IEResultFilter>();
                options.Filters.Add<IEExceptionFilter>();
                options.Filters.Add<IEValidationActionFilter>();
            })
            .AddJsonOptions(options =>
            {
                options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
            });

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });

            services.AddSession();

            services.AddApiAuthorization();

            // 配置IdentityService
            services
                .ConfigurationIdentityServer(_configurationRoot.GetConnectionString("IdentityServer"))
                .AddResourceOwnerValidator<ResourceOwnerPasswordValidator>()
                .AddProfileService<ProfileService>();

            services.AddIEJwtBearer(WebConfiguration.SymmetricKey);

            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

            services.AddScoped<ValidateCodeHelper>();

            return services.AddAbp<IEManageSystemWebModule>(options =>
            {
                options.IocManager.IocContainer.AddFacility<LoggingFacility>(
                    f => f.UseAbpLog4Net().WithConfig("log4net.config")
                );
            });
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            app.UseAbp(); //Initializes ABP framework.

            InitializeDatabase(app);

            app.UseDeveloperExceptionPage();

            app.UseDatabaseErrorPage();

            //if (env.IsDevelopment())
            //{
            //    app.UseDeveloperExceptionPage();
            //    app.UseDatabaseErrorPage();
            //}
            //else
            //{
            //    app.UseExceptionHandler("/Error");
            //}

            //app.UseExceptionHandleEx();

            app.UseSession();

            app.UseIdentityServer();

            app.UseAuthentication();

            app.Use(async (context, next) => 
            {
                string requestPath = context.Request.Path.Value;

                if (requestPath.StartsWith("/ManageHome/"))
                {
                    context.Request.Path = new PathString("/ManageHome/Index.html");
                }

                await next.Invoke();
            });

            app.UseDefaultFiles(new DefaultFilesOptions(new Microsoft.AspNetCore.StaticFiles.Infrastructure.SharedOptions() {
                FileProvider = new PhysicalFileProvider(
                    Path.Combine(Directory.GetCurrentDirectory(), @"ClientApp/build")),
                RequestPath = new PathString("")
            }));

            app.UseStaticFiles();

            app.UseSpaStaticFiles();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });

            //app.UseSpa(spa =>
            //{
            //    spa.Options.SourcePath = "ClientApp";
            //});
        }

        private void InitializeDatabase(IApplicationBuilder app)
        {
            using (var serviceScope = app.ApplicationServices.GetService<IServiceScopeFactory>().CreateScope())
            {
                serviceScope.ServiceProvider.GetRequiredService<PersistedGrantDbContext>().Database.Migrate();

                var context = serviceScope.ServiceProvider.GetRequiredService<ConfigurationDbContext>();
                context.Database.Migrate();
                if (!context.Clients.Any())
                {
                    foreach (var client in IdentityServerConfigure.GetClients())
                    {
                        var entity = client.ToEntity();
                        context.Clients.Add(entity);
                    }
                    context.SaveChanges();
                }

                if (!context.IdentityResources.Any())
                {
                    foreach (var resource in IdentityServerConfigure.GetIdentityResourceResources())
                    {
                        context.IdentityResources.Add(resource.ToEntity());
                    }
                    context.SaveChanges();
                }

                if (!context.ApiResources.Any())
                {
                    foreach (var resource in IdentityServerConfigure.GetApiResources())
                    {
                        context.ApiResources.Add(resource.ToEntity());
                    }
                    context.SaveChanges();
                }
            }
        }
    }
}
