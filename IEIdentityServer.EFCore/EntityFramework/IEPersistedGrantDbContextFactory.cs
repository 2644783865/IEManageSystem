using IdentityServer4.EntityFramework.DbContexts;
using IEManageSystem;
using IEManageSystem.Configuration;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace IEIdentityServer.EFCore.EntityFramework
{
    public class IEPersistedGrantDbContextFactory : IDesignTimeDbContextFactory<IEPersistedGrantDbContext>
    {
        public IEPersistedGrantDbContext CreateDbContext(string[] args)
        {
            var builder = new DbContextOptionsBuilder<IEPersistedGrantDbContext>();

            var configuration = AppConfigurations.Get(WebContentDirectoryFinder.CalculateContentRootFolder());
            builder.UseSqlServer(configuration.GetConnectionString("IdentityServer"));

            return new IEPersistedGrantDbContext(builder.Options);
        }
    }
}
