using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using IEManageSystem.Api.Controllers.ManageHome.AuthorizeManage.ApiScopeManages.Dto;
using IEManageSystem.Api.Help;
using IEManageSystem.Api.Models;
using IEManageSystem.ApiAuthorization;
using IEManageSystem.ApiAuthorization.DomainModel.ApiScopes;
using IEManageSystem.ApiAuthorization.DomainModel.ApiSingles;
using IEManageSystem.Help.IEApiScopeHelp;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace IEManageSystem.Api.Controllers.ManageHome.AuthorizeManage.ApiScopeManages
{
    [Route("api/[controller]/[action]")]
    [ApiAuthorization(IEApiScopeProvider.ApiScopeManage)]
    public class ApiScopeManageController : IEManageSystemControllerBase
    {
        private IRepository<ApiSingle> _apiSingleRepository { get; set; }

        public ApiScopeManageController(
            IRepository<ApiSingle> apiSingleRepository)
        {
            _apiSingleRepository = apiSingleRepository;
        }

        [HttpPost]
        [ApiAuthorizationQuery]
        public async Task<ActionResult<ApiResultDataModel>> GetApiScopeUrls([FromBody]GetApiScopeUrlsInput input)
        {
            Expression<Func<ApiSingle, object>>[] propertySelectors = new Expression<Func<ApiSingle, object>>[] {
                e => e.ApiSingleActions
            };
            var apiSingles = _apiSingleRepository.GetAllIncluding(propertySelectors).Where(e => e.ApiScopeId == input.Id).ToList();

            List<GetApiScopeUrlsUrl> urls = new List<GetApiScopeUrlsUrl>();
            apiSingles.ForEach(apiSingle => {
                apiSingle.ApiSingleActions.ToList().ForEach(action =>
                {
                    urls.Add(new GetApiScopeUrlsUrl() {
                        Url = IEUrlHelper.CreateUrl(apiSingle.Name, action.Name),
                        IsQueryUrl = action.IsQueryAction
                    });
                });
            });

            return new ApiResultDataModel(true, new GetApiScopeUrlsOutput() { Urls = urls });
        }
    }
}