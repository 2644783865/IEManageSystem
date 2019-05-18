using Abp.AutoMapper;
using IEManageSystem.CMS.DomainModel.Pages;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Dtos.CMS
{
    [AutoMap(typeof(PageBase))]
    public class PageDto
    {
        public string Name { get; protected set; }

        public string DisplayName { get; set; }

        public string Description { get; set; }
    }
}
