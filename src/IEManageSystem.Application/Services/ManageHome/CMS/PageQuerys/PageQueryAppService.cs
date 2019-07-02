using IEManageSystem.CMS.DomainModel.Pages;
using IEManageSystem.CMS.Repositorys;
using IEManageSystem.Dtos.CMS;
using IEManageSystem.Services.ManageHome.CMS.PageQuerys.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace IEManageSystem.Services.ManageHome.CMS.PageQuerys
{
    public class PageQueryAppService: IEManageSystemAppServiceBase, IPageQueryAppService
    {
        private PageManager _pageManager { get; set; }

        private IPageRepository _repository => _pageManager.PageRepository;

        public PageQueryAppService(
            PageManager pageManager
            )
        {
            _pageManager = pageManager;
        }

        public GetPagesOutput GetPages(GetPagesInput input)
        {
            IEnumerable<PageBase> pages = string.IsNullOrEmpty(input.SearchKey) ?
                _repository.GetAll() :
                GetPagesForSearchKey(input.SearchKey);

            int pageNum = pages.Count();

            pages = pages.Skip((input.PageIndex - 1) * input.PageSize).Take(input.PageSize);

            return new GetPagesOutput()
            {
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
                else if (page is ContentPage)
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

        public GetPageOutput GetPage(GetPageInput input)
        {
            var page = _repository.FirstOrDefault(item => item.Name == input.Name);

            return new GetPageOutput() { Page = AutoMapper.Mapper.Map<PageDto>(page) };
        }

        public GetPageComponentOutput GetPageComponent(GetPageComponentInput input)
        {
            List<PageComponentDto> dtos = new List<PageComponentDto>();
            foreach (var item in _pageManager.GetPageComponents(input.Name))
            {
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

                if (concrete.PageComponents != null)
                {
                    foreach (var item in concrete.PageComponents)
                    {
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

        public GetPageDatasOutput GetPageDatas(GetPageDatasInput input)
        {
            var page = _repository.GetAllIncluding(e => e.PageDatas).FirstOrDefault(e => e.Name == input.PageName);

            return new GetPageDatasOutput()
            {
                PageDatas = AutoMapper.Mapper.Map<List<PageDataDto>>(page.PageDatas),
                PageDataNum = page.PageDatas.Count
            };
        }

        public GetComponentDataOutput GetComponentDatas(GetComponentDataInput input)
        {
            var pageData = _repository.GetPageDataIncludeComponentDatas(input.PageName, input.PageDataName);

            return new GetComponentDataOutput()
            {
                ComponentDatas = AutoMapper.Mapper.Map<List<ContentComponentDataDto>>(pageData.ContentComponentDatas)
            };
        }
    }
}
