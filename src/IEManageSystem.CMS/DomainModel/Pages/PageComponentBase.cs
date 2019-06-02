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

        public int? CompositeComponentId { get; protected set; }

        public string Name { get; protected set; }

        public string Sign { get; set; }

        public string Col { get; set; }

        public string Height { get; set; }

        public string Padding { get; set; }

        public CmsComponent CmsComponent { get; set; }
    }
}
