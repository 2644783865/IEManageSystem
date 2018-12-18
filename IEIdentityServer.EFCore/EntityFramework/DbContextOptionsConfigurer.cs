using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEIdentityServer.EFCore.EntityFramework
{
    public static class DbContextOptionsConfigurer
    {
        public static void Configure(
            DbContextOptionsBuilder<IEConfigurationDbContext> dbContextOptions,
            string connectionString
            )
        {
            /* This is the single point to configure DbContextOptions for IEManageSystemDbContext */
            dbContextOptions.UseSqlServer(connectionString);
        }
    }
}
