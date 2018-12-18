using IdentityServer4.EntityFramework.DbContexts;
using IEManageSystem;
using IEManageSystem.Configuration;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IEIdentityServer.EFCore.EntityFramework
{
    public class IEConfigurationDbContextFactory : IDesignTimeDbContextFactory<IEConfigurationDbContext>
    {
        public IEConfigurationDbContext CreateDbContext(string[] args)
        {
            var builder = new DbContextOptionsBuilder<IEConfigurationDbContext>();

            var configuration = AppConfigurations.Get(WebContentDirectoryFinder.CalculateContentRootFolder());
            builder.UseSqlServer(configuration.GetConnectionString("IdentityServer"));

            return new IEConfigurationDbContext(builder.Options);
        }
    }
}
