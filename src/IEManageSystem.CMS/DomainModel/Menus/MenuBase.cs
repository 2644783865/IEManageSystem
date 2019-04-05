using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.CMS.DomainModel.Menus
{
    public class MenuBase:Entity
    {
        public MenuBase(string name)
        {
            Name = name;
        }

        public string Name { get; set; }
    }
}
