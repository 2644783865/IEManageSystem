using IEManageSystem.CMS.DomainModel.Pages;
using IEManageSystem.Repositorys;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.CMS.Repositorys
{
    public interface IPageRepository : IEfRepository<PageBase, int>
    {
        void AddPage(PageBase page);

        PageData GetPageDataIncludeComponentDatas(int pageId, int? pageDataId);

        void SetContentComponentDatas(int pageId, int? pageDataId, List<ContentComponentData> contentComponentDatas);
    }
}
