using Abp.AutoMapper;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Dtos.CMS
{
    //[AutoMap()]
    public class PageComponentDto
    {
        public string Name { get; set; }

        public string Sign { get; set; }

        public string Col { get; set; }

        public string Height { get; set; }

        public string Padding { get; set; }

        /// <summary>
        /// CompositeComponent, ContentLeafComponent
        /// </summary>
        public string ComponentType { get; set; }

        public List<PageComponentDto> PageComponents { get; set; }
    }
}
