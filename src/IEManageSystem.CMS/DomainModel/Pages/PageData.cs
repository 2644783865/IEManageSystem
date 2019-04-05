using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.CMS.DomainModel.Pages
{
    public class PageData:Entity
    {
        public ICollection<ContentComponentData> ContentComponentDatas { get; set; }
    }
}
