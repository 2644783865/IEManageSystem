using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.CMS.DomainModel.Pages
{
    public class CompositeComponent : PageComponentBase
    {
        public CompositeComponent(string name) : base(name)
        {
        }

        public ICollection<PageComponentBase> PageComponents { get; set; }
    }
}
