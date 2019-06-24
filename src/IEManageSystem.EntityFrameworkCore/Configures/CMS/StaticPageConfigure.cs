using IEManageSystem.CMS.DomainModel.Pages;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Configures.CMS
{
    public class StaticPageConfigure : IEntityTypeConfiguration<StaticPage>
    {
        public void Configure(EntityTypeBuilder<StaticPage> builder)
        {
            builder.HasBaseType<PageBase>();

            builder.HasData(new StaticPage[] {
                new StaticPage("Home", new PageData(){ Name="Home", Title="首页" })
            });
        }
    }
}
