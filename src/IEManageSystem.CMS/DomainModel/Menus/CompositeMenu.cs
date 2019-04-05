using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.CMS.DomainModel.Menus
{
    public class CompositeMenu : MenuBase
    {
        public CompositeMenu(string name) : base(name)
        {
        }

        public ICollection<MenuBase> Menus { get; set; }
    }
}
