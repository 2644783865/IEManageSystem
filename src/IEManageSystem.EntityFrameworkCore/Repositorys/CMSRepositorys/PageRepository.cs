using Abp.EntityFrameworkCore;
using IEManageSystem.CMS.DomainModel.Pages;
using IEManageSystem.CMS.Repositorys;
using IEManageSystem.EntityFrameworkCore;
using IEManageSystem.Help.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace IEManageSystem.Repositorys.CMSRepositorys
{
    public class PageRepository : EfRepository<PageBase, int>, IPageRepository
    {
        public const string HomeName = "home";

        public PageRepository(IDbContextProvider<IEManageSystemDbContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public PageData GetPageDataIncludeComponentDatas(string pageName, string pageDataName)
        {
            var page = ThenInclude(e => e.PageDatas, e => e.ContentComponentDatas).FirstOrDefault(e => e.Name == pageName);

            PageData pageData = null;
            if (page is StaticPage)
            {
                pageData = page.PageDatas.FirstOrDefault();
            }
            else
            {
                pageData = page.PageDatas.FirstOrDefault(e => e.Name == pageDataName);
            }

            return pageData;
        }

        public void SetContentComponentDatas(string pageName, string pageDataName, List<ContentComponentData> contentComponentDatas)
        {
            var pageData = GetPageDataIncludeComponentDatas(pageName, pageDataName);

            pageData.ContentComponentDatas = contentComponentDatas;
        }
    }
}
