using IEManageSystem.CMS.DomainModel.Pages;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Configures.CMS
{
    public class PageDataConfigure : IEntityTypeConfiguration<PageData>
    {
        public void Configure(Microsoft.EntityFrameworkCore.Metadata.Builders.EntityTypeBuilder<PageData> builder)
        {
            builder.HasData(new
            {
                Id = 1,
                Name = "Home",
                Title = "首页",
                PageBaseId = 1
            });
        }
    }
}
