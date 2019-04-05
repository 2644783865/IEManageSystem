using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.CMS.DomainModel.Pages
{
    public abstract class PageComponentBase:Entity
    {
        public PageComponentBase(string name) {
            Name = name;
        }

        public string Name { get; protected set; }

        public CmsComponent CmsComponent { get; set; }
    }
}
