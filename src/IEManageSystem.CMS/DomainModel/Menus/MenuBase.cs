using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace IEManageSystem.CMS.DomainModel.Menus
{
    public class MenuBase:Entity
    {
        public MenuBase(string name, string displayName)
        {
            Name = name;

            DisplayName = displayName;
        }

        [Required]
        public string Name { get; set; }

        [Required]
        public string DisplayName { get; set; }

        public string Icon { get; set; }

        public int? CompositeMenuId { get; set; }
    }
}
