using System;
using System.Collections.Generic;
using System.Text;
using Abp.Domain.Repositories;
using IEManageSystem.CMS.DomainModel.Pages;
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
            throw new NotImplementedException();
        }
    }
}
