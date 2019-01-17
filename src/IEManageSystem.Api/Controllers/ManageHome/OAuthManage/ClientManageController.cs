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

namespace IEManageSystem.Api.Controllers.ManageHome.OAuthManage
{
    [Route("api/[controller]/[action]")]
    public class ClientManageController : IEManageSystemControllerBase
    {
        private ClientManageAppService _clientManageAppService { get; set; }

        private ClientGrantTypeGroupManager _clientGrantTypeManager { get; set; }

        public ClientManageController(
            ClientManageAppService clientManageAppService,
            ClientGrantTypeGroupManager clientGrantTypeManager
            )
        {
            _clientManageAppService = clientManageAppService;

            _clientGrantTypeManager = clientGrantTypeManager;
        }

        [HttpPost]
        public async Task<ActionResult<ApiResultDataModel<GetClientsOutput>>> GetClients([FromBody]GetClientsInput input)
        {
            if (ValidateModel() == false)
            {
                return new ApiResultDataModel<GetClientsOutput>(_ValidateModelErrors);
            }

            return new ApiResultDataModel<GetClientsOutput>(await _clientManageAppService.GetClients(input));
        }

        [HttpPost]
        public async Task<ActionResult<ApiResultDataModel<GetClientNumOutput>>> GetClientNum([FromBody]GetClientNumInput input)
        {
            if (ValidateModel() == false)
            {
                return new ApiResultDataModel<GetClientNumOutput>(_ValidateModelErrors);
            }

            return new ApiResultDataModel<GetClientNumOutput>(await _clientManageAppService.GetClientNum(input));
        }

        [HttpPost]
        public async Task<ActionResult<ApiResultDataModel<AddClientOutput>>> AddClient([FromBody]AddClientInput input)
        {
            if (ValidateModel() == false)
            {
                return new ApiResultDataModel<AddClientOutput>(_ValidateModelErrors);
            }

            return new ApiResultDataModel<AddClientOutput>(await _clientManageAppService.AddClient(input));
        }

        [HttpPost]
        public async Task<ActionResult<ApiResultDataModel<RemoveClientOutput>>> RemoveClient([FromBody]RemoveClientInput input)
        {
            if (ValidateModel() == false)
            {
                return new ApiResultDataModel<RemoveClientOutput>(_ValidateModelErrors);
            }

            return new ApiResultDataModel<RemoveClientOutput>(await _clientManageAppService.RemoveClient(input));
        }

        [HttpPost]
        public async Task<ActionResult<ApiResultDataModel<UpdateClientOutput>>> UpdateClient([FromBody]UpdateClientInput input)
        {
            if (ValidateModel() == false)
            {
                return new ApiResultDataModel<UpdateClientOutput>(_ValidateModelErrors);
            }

            return new ApiResultDataModel<UpdateClientOutput>(await _clientManageAppService.UpdateClient(input));
        }

        [HttpPost]
        public async Task<ActionResult<ApiResultDataModel>> GetClientGrantTypeGroupNames()
        {
            return new ApiResultDataModel() { IsSuccess = true, Value = _clientGrantTypeManager.GetClientGrantTypeGroupNames() };
        }
    }
}