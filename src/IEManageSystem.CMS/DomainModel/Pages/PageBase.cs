using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace IEManageSystem.CMS.DomainModel.Pages
{
    public abstract class PageBase:Entity
    {
        public PageBase(string name)
        {
            Name = name;
        }

        [Required]
        public string Name { get; protected set; }

        public ICollection<PageComponentBase> PageComponents { get; set; }

        public ICollection<PageData> PageDatas { get; set; }
    }
}
