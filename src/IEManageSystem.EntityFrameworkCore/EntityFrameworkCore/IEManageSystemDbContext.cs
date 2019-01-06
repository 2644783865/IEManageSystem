using Abp.EntityFrameworkCore;
using IEManageSystem.Entitys.Authorization;
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

        public DbSet<User> Users { get; set; }

        public DbSet<Role> Roles { get; set; }

        public DbSet<Permission> Permissions { get; set; }
    }
}
