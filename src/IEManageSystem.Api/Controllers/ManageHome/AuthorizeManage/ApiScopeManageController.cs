using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IEManageSystem.Api.Models;
using IEManageSystem.Services.ManageHome.AuthorizeManage.ApiScopes;
using IEManageSystem.Services.ManageHome.AuthorizeManage.ApiScopes.Dto;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace IEManageSystem.Api.Controllers.ManageHome.AuthorizeManage
{
    [Route("api/[controller]/[action]")]
    public class ApiScopeManageController : IEManageSystemControllerBase
    {
        private IApiScopeAppService _apiScopeAppService { get; set; }

        public ApiScopeManageController(IApiScopeAppService apiScopeAppService)
        {
            _apiScopeAppService = apiScopeAppService;
        }

        [HttpPost]
        public async Task<ActionResult<ApiResultDataModel<GetApiScopesOutput>>> GetApiScopes([FromBody]GetApiScopesInput input)
        {
            if (ValidateModel() == false)
            {
                return new ApiResultDataModel<GetApiScopesOutput>(_ValidateModelErrors);
            }

            return new ApiResultDataModel<GetApiScopesOutput>(await _apiScopeAppService.GetApiScopes(input));
        }

        [HttpPost]
        public async Task<ActionResult<ApiResultDataModel<GetApiScopePermissionOutput>>> GetApiScopePermissions([FromBody]GetApiScopePermissionInput input)
        {
            if (ValidateModel() == false)
            {
                return new ApiResultDataModel<GetApiScopePermissionOutput>(_ValidateModelErrors);
            }

            return new ApiResultDataModel<GetApiScopePermissionOutput>(await _apiScopeAppService.GetApiScopePermissions(input));
        }

        [HttpPost]
        public async Task<ActionResult<ApiResultDataModel<AddApiScopePermissionOutput>>> AddApiScopePermission([FromBody]AddApiScopePermissionInput input)
        {
            if (ValidateModel() == false)
            {
                return new ApiResultDataModel<AddApiScopePermissionOutput>(_ValidateModelErrors);
            }

            return new ApiResultDataModel<AddApiScopePermissionOutput>(await _apiScopeAppService.AddApiScopePermission(input));
        }

        [HttpPost]
        public async Task<ActionResult<ApiResultDataModel<RemoveApiScopePermissionOutput>>> RemoveApiScopePermission([FromBody]RemoveApiScopePermissionInput input)
        {
            if (ValidateModel() == false)
            {
                return new ApiResultDataModel<RemoveApiScopePermissionOutput>(_ValidateModelErrors);
            }

            return new ApiResultDataModel<RemoveApiScopePermissionOutput>(await _apiScopeAppService.RemoveApiScopePermission(input));
        }

        [HttpPost]
        public async Task<ActionResult<ApiResultDataModel<GetApiScopeApiSinglesOutput>>> GetApiScopeApiSingles([FromBody]GetApiScopeApiSinglesInput input)
        {
            if (ValidateModel() == false)
            {
                return new ApiResultDataModel<GetApiScopeApiSinglesOutput>(_ValidateModelErrors);
            }

            return new ApiResultDataModel<GetApiScopeApiSinglesOutput>(await _apiScopeAppService.GetApiScopeApiSingles(input));
        }

        [HttpPost]
        public async Task<ActionResult<ApiResultDataModel<AddApiScopeApiSingleOutput>>> AddApiScopeApiSingle([FromBody]AddApiScopeApiSingleInput input)
        {
            if (ValidateModel() == false)
            {
                return new ApiResultDataModel<AddApiScopeApiSingleOutput>(_ValidateModelErrors);
            }

            return new ApiResultDataModel<AddApiScopeApiSingleOutput>(await _apiScopeAppService.AddApiScopeApiSingle(input));
        }

        [HttpPost]
        public async Task<ActionResult<ApiResultDataModel<RemoveApiScopeApiSingleOutput>>> RemoveApiScopeApiSingle([FromBody]RemoveApiScopeApiSingleInput input)
        {
            if (ValidateModel() == false)
            {
                return new ApiResultDataModel<RemoveApiScopeApiSingleOutput>(_ValidateModelErrors);
            }

            return new ApiResultDataModel<RemoveApiScopeApiSingleOutput>(await _apiScopeAppService.RemoveApiScopeApiSingle(input));
        }
    }
}