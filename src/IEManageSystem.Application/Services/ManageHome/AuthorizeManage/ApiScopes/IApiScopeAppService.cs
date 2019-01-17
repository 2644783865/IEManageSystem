using Abp.Application.Services;
using IEManageSystem.Services.ManageHome.AuthorizeManage.ApiScopes.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace IEManageSystem.Services.ManageHome.AuthorizeManage.ApiScopes
{
    public interface IApiScopeAppService : IApplicationService
    {
        Task<GetApiScopesOutput> GetApiScopes(GetApiScopesInput input);

        Task<GetApiScopePermissionOutput> GetApiScopePermissions(GetApiScopePermissionInput input);

        Task<AddApiScopePermissionOutput> AddApiScopePermission(AddApiScopePermissionInput input);

        Task<RemoveApiScopePermissionOutput> RemoveApiScopePermission(RemoveApiScopePermissionInput input);

        Task<GetApiScopeApiSinglesOutput> GetApiScopeApiSingles(GetApiScopeApiSinglesInput input);

        Task<AddApiScopeApiSingleOutput> AddApiScopeApiSingle(AddApiScopeApiSingleInput input);

        Task<RemoveApiScopeApiSingleOutput> RemoveApiScopeApiSingle(RemoveApiScopeApiSingleInput input);
    }
}
