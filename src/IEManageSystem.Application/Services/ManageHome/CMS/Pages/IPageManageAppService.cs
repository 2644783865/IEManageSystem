using IEManageSystem.Services.ManageHome.CMS.Pages.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Services.ManageHome.CMS.Pages
{
    public interface IPageManageAppService
    {
        GetPagesOutput GetPages(GetPagesInput input);
    }
}
