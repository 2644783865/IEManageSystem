using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Abp.Domain.Repositories;
using IEManageSystem.CMS.DomainModel.Pages;
using IEManageSystem.Dtos.CMS;
using IEManageSystem.Help.Exceptions;
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

            int pageNum = pages.Count();

            pages = pages.Skip((input.PageIndex - 1) * input.PageSize).Take(input.PageSize);

            return new GetPagesOutput() { PageNum = pageNum, Pages = AutoMapper.Mapper.Map<List<PageDto>>(pages.ToList()) };
        }

        private IEnumerable<PageBase> GetPagesForSearchKey(string searchKey)
        {
            return _repository.GetAll().Where(e =>
                e.DisplayName.Contains(searchKey) || e.Name.Contains(searchKey)
            );
        }

        public GetPageOutput GetPage(GetPageInput input)
        {
            var page = _repository.FirstOrDefault(input.Id);

            return new GetPageOutput() { Page = AutoMapper.Mapper.Map<PageDto>(page) };
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

        public DeletePageOutput DeletePage(DeletePageInput input)
        {
            _repository.Delete(input.Id);

            return new DeletePageOutput();
        }

        public UpdatePageOutput UpdatePage(UpdatePageInput input)
        {
            var page = _repository.FirstOrDefault(input.Id);

            if (page == null) {
                throw new MessageException("未找到页面");
            }

            page.DisplayName = input.DisplayName;
            page.Description = input.Description;

            return new UpdatePageOutput();
        }
    }
}
