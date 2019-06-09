using IEManageSystem.Dtos.CMS;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Services.ManageHome.CMS.Pages.Dto
{
    public class UpdateComponentDataInput
    {
        public int PageId { get; set; }

        public int PageDataId { get; set; }

        public List<ContentComponentDataDto> ComponentDatas { get; set; }
    }
}
