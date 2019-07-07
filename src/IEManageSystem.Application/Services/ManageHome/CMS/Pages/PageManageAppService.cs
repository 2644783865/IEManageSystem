using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using Abp.Domain.Repositories;
using IEManageSystem.ApiAuthorization;
using IEManageSystem.CMS.DomainModel.Pages;
using IEManageSystem.CMS.Repositorys;
using IEManageSystem.Dtos.CMS;
using IEManageSystem.Help.Exceptions;
using IEManageSystem.Help.IEApiScopeHelp;
using IEManageSystem.Repositorys;
using IEManageSystem.Services.ManageHome.CMS.Pages.Dto;

namespace IEManageSystem.Services.ManageHome.CMS.Pages
{
    [ApiAuthorization(IEApiScopeProvider.Page)]
    public class PageManageAppService : IEManageSystemAppServiceBase, IPageManageAppService
    {
        private PageManager _pageManager { get; set; }

        private IPageRepository _repository => _pageManager.PageRepository;

        public PageManageAppService(
            PageManager pageManager
            )
        {
            _pageManager = pageManager;
        }

        public AddContentPageOutput AddContentPage(AddContentPageInput input)
        {
            ContentPage page = new ContentPage(input.Name);

            page.DisplayName = input.DisplayName;

            page.Description = input.Description;

            _pageManager.AddPage(page);

            return new AddContentPageOutput();
        }

        public AddStaticPageOutput AddStaticPage(AddStaticPageInput input)
        {
            PageData pageData = new PageData()
            {
                Name = input.Name,
                Title = input.DisplayName
            };

            StaticPage page = new StaticPage(input.Name, pageData);

            page.DisplayName = input.DisplayName;

            page.Description = input.Description;

            _pageManager.AddPage(page);

            return new AddStaticPageOutput();
        }

        public DeletePageOutput DeletePage(DeletePageInput input)
        {
            _pageManager.DeletePage(input.Name);

            return new DeletePageOutput();
        }

        public UpdatePageOutput UpdatePage(UpdatePageInput input)
        {
            var page = _repository.FirstOrDefault(item=>item.Name == input.Name);

            if (page == null) {
                throw new MessageException("未找到页面");
            }

            page.DisplayName = input.DisplayName;
            page.Description = input.Description;

            return new UpdatePageOutput();
        }

        public UpdatePageComponentOutput UpdatePageComponent(UpdatePageComponentInput input)
        {
            List<PageComponentBase> pageComponents = new List<PageComponentBase>();
            foreach (var item in input.PageComponents) {
                pageComponents.Add(CreatePageComponent(item));
            }

            _pageManager.UpdatePageComponents(input.Name, pageComponents);

            return new UpdatePageComponentOutput();
        }

        private PageComponentBase CreatePageComponent(PageComponentDto dto)
        {
            List<PageComponentBase> childPageComponents = new List<PageComponentBase>();
            if (dto.PageComponents != null) {
                foreach (var item in dto.PageComponents) {
                    childPageComponents.Add(CreatePageComponent(item));
                }
            }

            PageComponentBase pageComponent = null;

            if (dto.ComponentType == "CompositeComponent")
            {
                pageComponent = new CompositeComponent(dto.Name) {
                    PageComponents = childPageComponents
                };
            }
            else
            {
                pageComponent = new ContentLeafComponent(dto.Name);
            }

            pageComponent.Sign = dto.Sign;
            pageComponent.Col = dto.Col;
            pageComponent.Height = dto.Height;
            pageComponent.Padding = dto.Padding;
            pageComponent.Margin = dto.Margin;
            pageComponent.BackgroundColor = dto.BackgroundColor;
            pageComponent.ClassName = dto.ClassName;

            var pageComponentSettings = new List<PageComponentSetting>();
            foreach (var item in dto.PageComponentSettings) {
                PageComponentSetting pageComponentSetting = new PageComponentSetting()
                {
                    Name = item.Name,
                    DisplayName = item.DisplayName,
                    Field1 = item.Field1,
                    Field2 = item.Field2,
                    Field3 = item.Field3,
                    Field4 = item.Field4,
                    Field5 = item.Field5
                };
                pageComponentSettings.Add(pageComponentSetting);
            }
            pageComponent.PageComponentSettings = pageComponentSettings;

            return pageComponent;
        }

        public AddPageDataOutput AddPageData(AddPageDataInput input)
        {
            PageData pageData = new PageData() {
                Name = input.Name,
                Title = input.Title
            };

            _pageManager.AddPageData(input.PageName, pageData);

            return new AddPageDataOutput();
        }

        public UpdatePageDataOutput UpdatePageData(UpdatePageDataInput input)
        {
            var page = _repository.GetAllIncluding(e => e.PageDatas).FirstOrDefault(e => e.Name == input.PageName);

            if (page is StaticPage)
            {
                throw new MessageException("无法更改单页文章");
            }

            var contentPage = (ContentPage) page;
            contentPage.SetPageDataName(input.Id, input.Name);
            contentPage.SetPageDataTitle(input.Id, input.Title);

            return new UpdatePageDataOutput();
        }

        public DeletePageDataOutput DeletePageData(DeletePageDataInput input)
        {
            var page = _repository.GetAllIncluding(e => e.PageDatas).FirstOrDefault(e => e.Name == input.PageName);

            var pageData = page.PageDatas.FirstOrDefault(e=>e.Name == input.Name);
            page.PageDatas.Remove(pageData);

            return new DeletePageDataOutput();
        }

        public UpdateComponentDataOutput UpdateComponentData(UpdateComponentDataInput input)
        {
            List<ContentComponentData> contentComponentDatas = new List<ContentComponentData>();
            foreach (var item in input.ComponentDatas)
            {
                contentComponentDatas.Add(new ContentComponentData() {
                    Sign = item.Sign,
                    Field1 = item.Field1,
                    Field2 = item.Field2,
                    Field3 = item.Field3,
                    Field4 = item.Field4,
                    Field5 = item.Field5,
                });
            }

            _repository.SetContentComponentDatas(input.PageName, input.PageDataName, contentComponentDatas);

            return new UpdateComponentDataOutput();
        }
    }
}
