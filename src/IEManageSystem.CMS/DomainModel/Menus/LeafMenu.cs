using IEManageSystem.CMS.DomainModel.Pages;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.CMS.DomainModel.Menus
{
    public class LeafMenu : MenuBase
    {
        public LeafMenu(string name) : base(name)
        {
        }

        public PageBase Page { get; set; }
    }
}
