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

        [ApiAuthorizationQuery]
        public GetPagesOutput GetPages(GetPagesInput input)
        {
            IEnumerable<PageBase> pages = string.IsNullOrEmpty(input.SearchKey)?
                _repository.GetAll():
                GetPagesForSearchKey(input.SearchKey);

            int pageNum = pages.Count();

            pages = pages.Skip((input.PageIndex - 1) * input.PageSize).Take(input.PageSize);

            return new GetPagesOutput() {
                PageNum = pageNum,
                Pages = CreatePageDtos(pages.ToList())
            };
        }

        private List<PageDto> CreatePageDtos(List<PageBase> pageBases)
        {
            List<PageDto> pageDtos = new List<PageDto>();

            foreach (var page in pageBases)
            {
                var pageDto = new PageDto();
                pageDto.Id = page.Id;
                pageDto.Name = page.Name;
                pageDto.DisplayName = page.DisplayName;
                pageDto.Description = page.Description;

                if (page is StaticPage)
                {
                    pageDto.PageType = "StaticPage";
                }
                else if(page is ContentPage)
                {
                    pageDto.PageType = "ContentPage";
                }

                pageDtos.Add(pageDto);
            }

            return pageDtos;
        }

        private IEnumerable<PageBase> GetPagesForSearchKey(string searchKey)
        {
            return _repository.GetAll().Where(e =>
                e.DisplayName.Contains(searchKey) || e.Name.Contains(searchKey)
            );
        }

        [ApiAuthorizationQuery]
        public GetPageOutput GetPage(GetPageInput input)
        {
            var page = _repository.FirstOrDefault(item=>item.Name == input.Name);

            return new GetPageOutput() { Page = AutoMapper.Mapper.Map<PageDto>(page) };
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

        [ApiAuthorizationQuery]
        public GetPageComponentOutput GetPageComponent(GetPageComponentInput input)
        {
            List<PageComponentDto> dtos = new List<PageComponentDto>();
            foreach (var item in _pageManager.GetPageComponents(input.Name)) {
                dtos.Add(CreatePageComponentDto(item));
            }

            return new GetPageComponentOutput() { PageComponents = dtos };
        }

        private PageComponentDto CreatePageComponentDto(PageComponentBase page)
        {
            PageComponentDto dto = new PageComponentDto();

            dto.Name = page.Name;
            dto.Sign = page.Sign;
            dto.Col = page.Col;
            dto.Height = page.Height;
            dto.Padding = page.Padding;

            if (page is CompositeComponent)
            {
                List<PageComponentDto> childs = new List<PageComponentDto>();
                var concrete = (CompositeComponent)page;

                if (concrete.PageComponents != null) {
                    foreach (var item in concrete.PageComponents) {
                        childs.Add(CreatePageComponentDto(item));
                    }
                }
                dto.PageComponents = childs;
                dto.ComponentType = "CompositeComponent";
            }
            else
            {
                dto.ComponentType = "ContentLeafComponent";
            }

            return dto;
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

            return pageComponent;
        }

        [ApiAuthorizationQuery]
        public GetPageDatasOutput GetPageDatas(GetPageDatasInput input)
        {
            var page = _repository.GetAllIncluding(e => e.PageDatas).FirstOrDefault(e => e.Name == input.PageName);

            return new GetPageDatasOutput() {
                PageDatas = AutoMapper.Mapper.Map<List<PageDataDto>>(page.PageDatas),
                PageDataNum = page.PageDatas.Count
            };
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

        [ApiAuthorizationQuery]
        public GetComponentDataOutput GetComponentDatas(GetComponentDataInput input)
        {
            var pageData = _repository.GetPageDataIncludeComponentDatas(input.PageName, input.PageDataName);

            return new GetComponentDataOutput()
            {
                ComponentDatas = AutoMapper.Mapper.Map<List<ContentComponentDataDto>>(pageData.ContentComponentDatas)
            };
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
