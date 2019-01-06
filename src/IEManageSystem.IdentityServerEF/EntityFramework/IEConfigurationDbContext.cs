using Abp.Dependency;
using IdentityServer4.EntityFramework.DbContexts;
using IdentityServer4.EntityFramework.Entities;
using IdentityServer4.EntityFramework.Extensions;
using IdentityServer4.EntityFramework.Interfaces;
using IdentityServer4.EntityFramework.Options;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IEManageSystem.IdentityServerEF.EntityFramework
{
    public class IEConfigurationDbContext : DbContext, IConfigurationDbContext, ITransientDependency
    {
        public IEConfigurationDbContext(DbContextOptions<IEConfigurationDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ConfigureClientContext(new ConfigurationStoreOptions());
            modelBuilder.ConfigureResourcesContext(new ConfigurationStoreOptions());

            base.OnModelCreating(modelBuilder);
        }

        public DbSet<Client> Clients { get; set; }

        public DbSet<IdentityResource> IdentityResources { get; set; }

        public DbSet<ApiResource> ApiResources { get; set; }

        public Task<int> SaveChangesAsync()
        {
            return base.SaveChangesAsync();
        }
    }
}
