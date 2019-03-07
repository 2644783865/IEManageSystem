using Abp.EntityFrameworkCore;
using IEManageSystem.ApiAuthorization.DomainModel.ApiScopes;
using IEManageSystem.ApiAuthorization.DomainModel.ApiSingles;
using IEManageSystem.Configures.ApiAuthorization;
using IEManageSystem.Configures.Core;
using IEManageSystem.Entitys.Authorization;
using IEManageSystem.Entitys.Authorization.Permissions;
using IEManageSystem.Entitys.Authorization.Roles;
using IEManageSystem.Entitys.Authorization.Users;
using Microsoft.EntityFrameworkCore;

namespace IEManageSystem.EntityFrameworkCore
{
    public class IEManageSystemDbContext : AbpDbContext
    {
        //Add DbSet properties for your entities...

        public IEManageSystemDbContext(DbContextOptions<IEManageSystemDbContext> options) 
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new ApiScopeNodeConfigure());
            modelBuilder.ApplyConfiguration(new UserConfigure());
            modelBuilder.ApplyConfiguration(new AccountConfigure());

            base.OnModelCreating(modelBuilder);
        }

        public DbSet<User> Users { get; set; }

        public DbSet<Role> Roles { get; set; }

        public DbSet<Permission> Permissions { get; set; }

        public DbSet<ApiScope> ApiScopes { get; set; }

        public DbSet<ApiSingle> ApiSingles { get; set; }
    }
}
