using Abp.Application.Services;
using IEManageSystem.Services.ManageHome.AuthorizeManage.Admins.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace IEManageSystem.Services.ManageHome.AuthorizeManage.Admins
{
    public interface IAdminAppService : IApplicationService
    {
        Task<GetAdminsOutput> GetAdmins(GetAdminsInput input);

        Task<GetAdminNumOutput> GetAdminNum(GetAdminNumInput input);

        Task<CreateAdminOutput> CreateAdmin(CreateAdminInput input);

        Task<UpdateAdminOutput> UpdateAdmin(UpdateAdminInput input);

        Task<DeleteAdminOutput> DeleteAdmin(DeleteAdminInput input);
    }
}
