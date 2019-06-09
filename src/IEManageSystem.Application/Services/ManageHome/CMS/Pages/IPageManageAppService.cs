using IEManageSystem.Services.ManageHome.CMS.Pages.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Services.ManageHome.CMS.Pages
{
    public interface IPageManageAppService
    {
        GetPagesOutput GetPages(GetPagesInput input);

        GetPageOutput GetPage(GetPageInput input);

        AddContentPageOutput AddContentPage(AddContentPageInput input);

        AddStaticPageOutput AddStaticPage(AddStaticPageInput input);

        DeletePageOutput DeletePage(DeletePageInput input);

        UpdatePageOutput UpdatePage(UpdatePageInput input);

        GetPageComponentOutput GetPageComponent(GetPageComponentInput input);

        UpdatePageComponentOutput UpdatePageComponent(UpdatePageComponentInput input);

        GetPageDatasOutput GetPageDatas(GetPageDatasInput input);

        AddPageDataOutput AddPageData(AddPageDataInput input);

        UpdatePageDataOutput UpdatePageData(UpdatePageDataInput input);

        DeletePageDataOutput DeletePageData(DeletePageDataInput input);

        GetComponentDataOutput GetComponentDatas(GetComponentDataInput input);
    }
}
