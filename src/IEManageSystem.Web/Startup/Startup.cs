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
using IEManageSystem.Api.Help.ClaimHelp;

namespace IEManageSystem.Web.Startup
{
    public class Startup
    {
        private IHostingEnvironment _env { get; set; }

        private IConfigurationRoot _configurationRoot { get; set; }

        public Startup(IHostingEnvironment env)
        {
            _env = env;

            _configurationRoot = AppConfigurations.Get(_env.ContentRootPath, _env.EnvironmentName);
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
            .AddRazorOptions(opt =>
            {
                opt.ViewLocationFormats.Add("/Views/ManageHome/{1}/{0}" + RazorViewEngine.ViewExtension);
                opt.ViewLocationFormats.Add("/ClientApp/build/{1}/{0}" + RazorViewEngine.ViewExtension);
                opt.ViewLocationFormats.Add("/ClientApp/build/ManageHome/{1}/{0}" + RazorViewEngine.ViewExtension);

            }).AddJsonOptions(options =>
            {
                options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
            });

            services.AddMvc();

            services.AddSession();

            services.AddApiAuthorization();

            // 配置IdentityService
            services
                .ConfigurationIdentityServer(_configurationRoot.GetConnectionString("IdentityServer"))
                .AddResourceOwnerValidator<ResourceOwnerPasswordValidator>()
                .AddProfileService<ProfileService>();

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    NameClaimType = ClaimBuilder.UserName.ClaimName,
                    //RoleClaimType = JwtClaimTypes.Role,
                    ValidIssuer = WebConfiguration.Issuer,
                    ValidAudience = WebConfiguration.Audience,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(WebConfiguration.SymmetricKey))
                };

                options.IncludeErrorDetails = true;

                options.Events = new JwtBearerEvents() {

                };
            });

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

            app.UseStaticFiles();

            app.UseStaticFiles(new StaticFileOptions()
            {
                FileProvider = new PhysicalFileProvider(
                Path.Combine(Directory.GetCurrentDirectory(), @"wwwroot")),
                RequestPath = new PathString("/wwwroot")
            });

            app.UseStaticFiles(new StaticFileOptions()
            {
                FileProvider = new PhysicalFileProvider(
                Path.Combine(Directory.GetCurrentDirectory(), @"ClientApp/build")),
                RequestPath = new PathString("")
            });

            //app.UseSpaStaticFiles();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });

            //app.UseSpa(spa =>
            //{
            //    spa.Options.SourcePath = "ClientApp";

            //    if (env.IsDevelopment())
            //    {
            //        spa.UseReactDevelopmentServer(npmScript: "start");
            //    }
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
