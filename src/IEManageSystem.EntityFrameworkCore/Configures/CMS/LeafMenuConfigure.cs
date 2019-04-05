using IEManageSystem.CMS.DomainModel.Menus;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Configures.CMS
{
    public class LeafMenuConfigure : IEntityTypeConfiguration<LeafMenu>
    {
        public void Configure(EntityTypeBuilder<LeafMenu> builder)
        {
            builder.HasBaseType<MenuBase>();
        }
    }
}
