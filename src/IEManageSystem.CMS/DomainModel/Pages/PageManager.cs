using Abp.Dependency;
using IEManageSystem.CMS.Repositorys;
using IEManageSystem.Help.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace IEManageSystem.CMS.DomainModel.Pages
{
    public class PageManager : ITransientDependency
    {
        public const string HomeName = "home";

        public PageManager(IPageRepository pageRepository)
        {
            PageRepository = pageRepository;
        }

        public IPageRepository PageRepository { get; }

        public void AddPage(PageBase page)
        {
            if (PageRepository.GetAll().Any(e => e.Name == page.Name))
            {
                throw new MessageException($"已存在名为{page.Name}的页面，请重新命名");
            }

            PageRepository.Insert(page);
        }

        public void DeletePage(string name)
        {
            if (name.ToLower() == HomeName)
            {
                throw new MessageException("不能删除主页");
            }

            PageRepository.Delete(item => item.Name == name);
        }

        public List<PageComponentBase> GetPageComponents(string name)
        {
            var page = PageRepository.ThenInclude(e => e.PageComponents, e => e.PageComponentSettings).FirstOrDefault(e => e.Name == name);

            if (page == null)
            {
                throw new MessageException("未找到页面");
            }

            if (page.PageComponents == null)
            {
                return new List<PageComponentBase>();
            }

            return page.PageComponents.Where(e => e.CompositeComponentId == null).ToList();
        }

        public void UpdatePageComponents(string name, List<PageComponentBase> pageComponents)
        {
            var page = PageRepository.GetAllIncluding(e => e.PageComponents).FirstOrDefault(e => e.Name == name);
            page.PageComponents = new List<PageComponentBase>();

            foreach (var item in pageComponents) {
                AddPageComponentForPage(page, item);
            }
        }

        private void AddPageComponentForPage(PageBase page, PageComponentBase pageComponent)
        {
            page.PageComponents.Add(pageComponent);

            if (!(pageComponent is CompositeComponent)) {
                return;
            }

            CompositeComponent compositeComponent = (CompositeComponent) pageComponent;
            if (compositeComponent.PageComponents == null || compositeComponent.PageComponents.Count == 0) {
                return;
            }

            foreach (var item in compositeComponent.PageComponents) {
                AddPageComponentForPage(page, item);
            }
        }

        public void AddPageData(string name, PageData pageData)
        {
            var page = PageRepository.GetAllIncluding(e => e.PageDatas).FirstOrDefault(e => e.Name == name);
            if (page is StaticPage)
            {
                throw new MessageException("无法为单页添加文章");
            }

            ((ContentPage)page).AddPageData(pageData);
        }
    }
}
