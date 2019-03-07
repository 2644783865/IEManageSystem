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
    public class IEPersistedGrantDbContext : DbContext, IPersistedGrantDbContext, ITransientDependency
    {
        public IEPersistedGrantDbContext(DbContextOptions<IEPersistedGrantDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ConfigurePersistedGrantContext(new OperationalStoreOptions());

            base.OnModelCreating(modelBuilder);
        }

        public DbSet<PersistedGrant> PersistedGrants { get; set; }

        public Task<int> SaveChangesAsync()
        {
            return base.SaveChangesAsync();
        }
    }
}
