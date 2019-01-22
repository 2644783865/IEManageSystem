using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IEManageSystem.Api.Models;
using IEManageSystem.Services.ManageHome.AuthorizeManage.Admins;
using IEManageSystem.Services.ManageHome.AuthorizeManage.Admins.Dto;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace IEManageSystem.Api.Controllers.ManageHome.AuthorizeManage
{
    [Route("api/[controller]/[action]")]
    public class AdminManageController : IEManageSystemControllerBase
    {
        private IAdminAppService _adminAppService { get; set; }

        public AdminManageController(
            IAdminAppService adminAppService)
        {
            _adminAppService = adminAppService;
        }

        [HttpPost]
        public async Task<ActionResult<ApiResultDataModel<GetAdminsOutput>>> GetAdmins([FromBody]GetAdminsInput input)
        {
            if (ValidateModel() == false)
            {
                return new ApiResultDataModel<GetAdminsOutput>(_ValidateModelErrors);
            }

            return new ApiResultDataModel<GetAdminsOutput>(await _adminAppService.GetAdmins(input));
        }

        [HttpPost]
        public async Task<ActionResult<ApiResultDataModel<GetAdminNumOutput>>> GetAdminNum([FromBody]GetAdminNumInput input)
        {
            if (ValidateModel() == false)
            {
                return new ApiResultDataModel<GetAdminNumOutput>(_ValidateModelErrors);
            }

            return new ApiResultDataModel<GetAdminNumOutput>(await _adminAppService.GetAdminNum(input));
        }

        [HttpPost]
        public async Task<ActionResult<ApiResultDataModel<CreateAdminOutput>>> CreateAdmin([FromBody]CreateAdminInput input)
        {
            if (ValidateModel() == false)
            {
                return new ApiResultDataModel<CreateAdminOutput>(_ValidateModelErrors);
            }

            return new ApiResultDataModel<CreateAdminOutput>(await _adminAppService.CreateAdmin(input));
        }

        [HttpPost]
        public async Task<ActionResult<ApiResultDataModel<UpdateAdminOutput>>> UpdateAdmin([FromBody]UpdateAdminInput input)
        {
            if (ValidateModel() == false)
            {
                return new ApiResultDataModel<UpdateAdminOutput>(_ValidateModelErrors);
            }

            return new ApiResultDataModel<UpdateAdminOutput>(await _adminAppService.UpdateAdmin(input));
        }

        [HttpPost]
        public async Task<ActionResult<ApiResultDataModel<DeleteAdminOutput>>> DeleteAdmin([FromBody]DeleteAdminInput input)
        {
            if (ValidateModel() == false)
            {
                return new ApiResultDataModel<DeleteAdminOutput>(_ValidateModelErrors);
            }

            return new ApiResultDataModel<DeleteAdminOutput>(await _adminAppService.DeleteAdmin(input));
        }

        [HttpPost]
        public async Task<ActionResult<ApiResultDataModel<GetAdminRolesOutput>>> GetAdminRoles([FromBody]GetAdminRolesInput input)
        {
            if (ValidateModel() == false)
            {
                return new ApiResultDataModel<GetAdminRolesOutput>(_ValidateModelErrors);
            }

            return new ApiResultDataModel<GetAdminRolesOutput>(await _adminAppService.GetAdminRoles(input));
        }

        [HttpPost]
        public async Task<ActionResult<ApiResultDataModel<AddRoleOutput>>> AddRole([FromBody]AddRoleInput input)
        {
            if (ValidateModel() == false)
            {
                return new ApiResultDataModel<AddRoleOutput>(_ValidateModelErrors);
            }

            return new ApiResultDataModel<AddRoleOutput>(await _adminAppService.AddRole(input));
        }

        [HttpPost]
        public async Task<ActionResult<ApiResultDataModel<RemoveRoleOutput>>> RemoveRole([FromBody]RemoveRoleInput input)
        {
            if (ValidateModel() == false)
            {
                return new ApiResultDataModel<RemoveRoleOutput>(_ValidateModelErrors);
            }

            return new ApiResultDataModel<RemoveRoleOutput>(await _adminAppService.RemoveRole(input));
        }
    }
}