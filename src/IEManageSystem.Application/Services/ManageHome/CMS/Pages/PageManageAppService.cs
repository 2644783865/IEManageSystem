using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Abp.Domain.Repositories;
using IEManageSystem.CMS.DomainModel.Pages;
using IEManageSystem.Dtos.CMS;
using IEManageSystem.Services.ManageHome.CMS.Pages.Dto;

namespace IEManageSystem.Services.ManageHome.CMS.Pages
{
    public class PageManageAppService : IEManageSystemAppServiceBase, IPageManageAppService
    {
        private IRepository<PageBase> _repository { get; set; }

        public PageManageAppService(
            IRepository<PageBase> repository
            )
        {
            _repository = repository;
        }

        public GetPagesOutput GetPages(GetPagesInput input)
        {
            IEnumerable<PageBase> pages = string.IsNullOrEmpty(input.SearchKey)?
                _repository.GetAll():
                GetPagesForSearchKey(input.SearchKey);

            pages = pages.Skip((input.PageIndex - 1) * input.PageSize).Take(input.PageSize);

            return new GetPagesOutput() { Pages = AutoMapper.Mapper.Map<List<PageDto>>(pages.ToList()) };
        }

        public GetPageNumOutput GetPageNum(GetPageNumInput input)
        {
            IEnumerable<PageBase> pages = string.IsNullOrEmpty(input.SearchKey) ?
                _repository.GetAll() :
                GetPagesForSearchKey(input.SearchKey);

            return new GetPageNumOutput() { PageNum = pages.Count() };
        }

        private IEnumerable<PageBase> GetPagesForSearchKey(string searchKey)
        {
            return _repository.GetAll().Where(e =>
                e.DisplayName.Contains(searchKey) || e.Name.Contains(searchKey)
            );
        }

        public AddContentPageOutput AddContentPage(AddContentPageInput input)
        {
            ContentPage page = new ContentPage(input.Name);

            page.DisplayName = input.DisplayName;

            page.Description = input.Description;

            _repository.Insert(page);

            return new AddContentPageOutput();
        }

        public AddStaticPageOutput AddStaticPage(AddStaticPageInput input)
        {
            StaticPage page = new StaticPage(input.Name);

            page.DisplayName = input.DisplayName;

            page.Description = input.Description;

            _repository.Insert(page);

            return new AddStaticPageOutput();
        }
    }
}
