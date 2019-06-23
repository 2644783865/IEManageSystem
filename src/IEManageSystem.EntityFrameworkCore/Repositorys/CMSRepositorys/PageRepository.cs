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
        public PageRepository(IDbContextProvider<IEManageSystemDbContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public void AddPage(PageBase page)
        {
            if (GetAll().Any(e => e.Name == page.Name)) {
                throw new MessageException($"已存在名为{page.Name}的页面，请重新命名");
            }

            Insert(page);
        }

        public PageData GetPageDataIncludeComponentDatas(int pageId, int? pageDataId)
        {
            var page = ThenInclude(e => e.PageDatas, e => e.ContentComponentDatas).FirstOrDefault(e => e.Id == pageId);

            PageData pageData = null;
            if (page is StaticPage)
            {
                pageData = page.PageDatas.FirstOrDefault();
            }
            else
            {
                pageData = page.PageDatas.FirstOrDefault(e => e.Id == pageDataId);
            }

            return pageData;
        }

        public void SetContentComponentDatas(int pageId, int? pageDataId, List<ContentComponentData> contentComponentDatas)
        {
            var pageData = GetPageDataIncludeComponentDatas(pageId, pageDataId);

            pageData.ContentComponentDatas = contentComponentDatas;
        }
    }
}
