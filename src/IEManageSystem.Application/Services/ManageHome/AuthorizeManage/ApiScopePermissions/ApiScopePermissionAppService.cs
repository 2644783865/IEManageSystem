using IEManageSystem.ApiAuthorization.DomainModel.ApiScopes;
using IEManageSystem.Dtos.ApiAuthorization;
using IEManageSystem.Services.ManageHome.AuthorizeManage.ApiScopePermissions.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace IEManageSystem.Services.ManageHome.AuthorizeManage.ApiScopePermissions
{
    public class ApiScopePermissionAppService: IApiScopePermissionAppService
    {
        private ApiScopeManager _apiScopeManager { get; set; }

        public ApiScopePermissionAppService(ApiScopeManager apiScopeManager)
        {
            _apiScopeManager = apiScopeManager;
        }

        public GetApiScopesOutput GetApiScopes(GetApiScopesInput input)
        {
            return new GetApiScopesOutput() {
                ApiScopes = AutoMapper.Mapper.Map<List<ApiScopeDto>>(_apiScopeManager.GetApiScopes().ToList())
            };
        }
    }
}
