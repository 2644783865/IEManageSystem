using IEManageSystem.Dtos;
using IEManageSystem.Dtos.CMS;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Services.ManageHome.CMS.Pages.Dto
{
    public class GetPageComponentOutput:OutputDtoBase
    {
        public List<PageComponentDto> PageComponents { get; set; }
    }
}
