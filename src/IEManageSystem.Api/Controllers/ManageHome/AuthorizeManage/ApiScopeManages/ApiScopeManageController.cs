using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IEManageSystem.Api.Controllers.ManageHome.AuthorizeManage.ApiScopeManages.Dto;
using IEManageSystem.Api.Models;
using IEManageSystem.ApiAuthorization;
using IEManageSystem.ApiAuthorization.DomainModel.ApiScopes;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace IEManageSystem.Api.Controllers.ManageHome.AuthorizeManage.ApiScopeManages
{
    [Route("api/[controller]/[action]")]
    public class ApiScopeManageController : IEManageSystemControllerBase
    {
        private ApiScopeManager _apiScopeManager { get; set; }

        public ApiScopeManageController(
            ApiScopeManager apiScopeManager)
        {
            _apiScopeManager = apiScopeManager;
        }

        /// <summary>
        /// 获取当前用户可以访问的域
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<ActionResult<ApiResultDataModel>> GetUserScopeAccessAuthorities([FromBody]GetUserScopeAccessAuthoritiesInput input)
        {
            List<string> permissionNames = User.Claims.Where(e => e.Type == ApiAuthorizationExtensions.ApiPermissiionClaimName).Select(e => e.Value).ToList();

            var userScopeAccessAuthorities = _apiScopeManager.GetUserScopeAccessAuthorities(permissionNames);

            return new ApiResultDataModel() { Value = new GetUserScopeAccessAuthoritiesOutput() { UserScopeAccessAuthoritys = userScopeAccessAuthorities } };
        }
    }
}