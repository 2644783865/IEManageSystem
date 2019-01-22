using Abp.Application.Services;
using IEManageSystem.Services.ManageHome.AuthorizeManage.Roles.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace IEManageSystem.Services.ManageHome.AuthorizeManage.Roles
{
    public interface IRoleAppService : IApplicationService
    {
        Task<GetRolesOutput> GetRoles(GetRolesInput input);

        Task<GetRoleNumOutput> GetRoleNum(GetRoleNumInput input);

        Task<AddRoleOutput> AddRole(AddRoleInput input);

        Task<UpdateRoleOutput> UpdateRole(UpdateRoleInput input);

        Task<DeleteRoleOutput> DeleteRole(DeleteRoleInput input);

        Task<AddPermissionOutput> AddPermission(AddPermissionInput input);

        Task<RemovePermissionOutput> RemovePermission(RemovePermissionInput input);
    }
}
