using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IEManageSystem.IdentityServer.Entitys.Clients.ClientGrantTypes;
using IEManageSystem.Api.Models;
using IEManageSystem.Services.ManageHome.OAuthManage.ClientManages;
using IEManageSystem.Services.ManageHome.OAuthManage.ClientManages.Dto;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using IEManageSystem.ApiAuthorization;
using IEManageSystem.Help.IEApiScopeHelp;

namespace IEManageSystem.Api.Controllers.ManageHome.OAuthManage
{
    [Route("api/[controller]/[action]")]
    public class ClientManageController : IEManageSystemControllerBase
    {
        private ClientGrantTypeGroupManager _clientGrantTypeManager { get; set; }

        public ClientManageController(
            ClientGrantTypeGroupManager clientGrantTypeManager
            )
        {
            _clientGrantTypeManager = clientGrantTypeManager;
        }

        [HttpPost]
        public async Task<ActionResult<ApiResultDataModel>> GetClientGrantTypeGroupNames()
        {
            return new ApiResultDataModel() { IsSuccess = true, Value = _clientGrantTypeManager.GetClientGrantTypeGroupNames() };
        }
    }
}