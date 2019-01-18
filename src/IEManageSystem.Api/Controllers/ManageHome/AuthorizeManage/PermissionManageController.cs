using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IEManageSystem.Api.Models;
using IEManageSystem.Services.ManageHome.AuthorizeManage.Permissions;
using IEManageSystem.Services.ManageHome.AuthorizeManage.Permissions.Dto;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace IEManageSystem.Api.Controllers.ManageHome.AuthorizeManage
{
    [Route("api/[controller]/[action]")]
    public class PermissionManageController : IEManageSystemControllerBase
    {
        private IPermissionAppService _permissionAppService { get; set; }

        public PermissionManageController(
            IPermissionAppService permissionAppService)
        {
            _permissionAppService = permissionAppService;
        }

        [HttpPost]
        public async Task<ActionResult<ApiResultDataModel<GetPermissionsOutput>>> GetPermissions([FromBody]GetPermissionsInput input)
        {
            if (ValidateModel() == false)
            {
                return new ApiResultDataModel<GetPermissionsOutput>(_ValidateModelErrors);
            }

            return new ApiResultDataModel<GetPermissionsOutput>(await _permissionAppService.GetPermissions(input));
        }

        [HttpPost]
        public async Task<ActionResult<ApiResultDataModel<GetPermissionNumOutput>>> GetPermissionNum([FromBody]GetPermissionNumInput input)
        {
            if (ValidateModel() == false)
            {
                return new ApiResultDataModel<GetPermissionNumOutput>(_ValidateModelErrors);
            }

            return new ApiResultDataModel<GetPermissionNumOutput>(await _permissionAppService.GetPermissionNum(input));
        }

        [HttpPost]
        public async Task<ActionResult<ApiResultDataModel<AddPermissionOutput>>> AddPermission([FromBody]AddPermissionInput input)
        {
            if (ValidateModel() == false)
            {
                return new ApiResultDataModel<AddPermissionOutput>(_ValidateModelErrors);
            }

            return new ApiResultDataModel<AddPermissionOutput>(await _permissionAppService.AddPermission(input));
        }

        [HttpPost]
        public async Task<ActionResult<ApiResultDataModel<DeletePermissionOutput>>> DeletePermission([FromBody]DeletePermissionInput input)
        {
            if (ValidateModel() == false)
            {
                return new ApiResultDataModel<DeletePermissionOutput>(_ValidateModelErrors);
            }

            return new ApiResultDataModel<DeletePermissionOutput>(await _permissionAppService.DeletePermission(input));
        }

        [HttpPost]
        public async Task<ActionResult<ApiResultDataModel<UpdatePermissionOutput>>> UpdatePermission([FromBody]UpdatePermissionInput input)
        {
            if (ValidateModel() == false)
            {
                return new ApiResultDataModel<UpdatePermissionOutput>(_ValidateModelErrors);
            }

            return new ApiResultDataModel<UpdatePermissionOutput>(await _permissionAppService.UpdatePermission(input));
        }
    }
}