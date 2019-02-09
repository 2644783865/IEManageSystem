using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IEManageSystem.Api.Controllers.Users.Dto;
using IEManageSystem.Api.Help.ClaimHelp;
using IEManageSystem.Api.Models;
using IEManageSystem.ApiAuthorization;
using IEManageSystem.ApiAuthorization.DomainModel.ApiScopes;
using IEManageSystem.Entitys.Authorization.LoginManagers;
using IEManageSystem.Services.Users;
using IEManageSystem.Services.Users.Dto;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace IEManageSystem.Api.Controllers.Users
{
    [Route("api/[controller]/[action]")]
    public class UserController : IEManageSystemControllerBase
    {
        private IUserAppService _UserAppService { get; set; }

        private ApiScopeManager _apiScopeManager { get; set; }

        public UserController(
            IUserAppService userAppService,
            ApiScopeManager apiScopeManager
            )
        {
            _UserAppService = userAppService;
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

            return new ApiResultDataModel(true, new GetUserScopeAccessAuthoritiesOutput() { UserScopeAccessAuthoritys = userScopeAccessAuthorities });
        }
    }
}