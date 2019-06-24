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

        void DeletePage(string name);

        PageData GetPageDataIncludeComponentDatas(string pageName, string pageDataName);

        void SetContentComponentDatas(string pageName, string pageDataName, List<ContentComponentData> contentComponentDatas);
    }
}
