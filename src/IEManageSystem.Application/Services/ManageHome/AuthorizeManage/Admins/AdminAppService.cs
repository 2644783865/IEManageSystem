using IEManageSystem.Entitys.Authorization.Users;
using IEManageSystem.Services.ManageHome.AuthorizeManage.Admins.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using IEManageSystem.Dtos.Core;
using System.Threading.Tasks;

namespace IEManageSystem.Services.ManageHome.AuthorizeManage.Admins
{
    public class AdminAppService: IAdminAppService
    {
        private AdminManager _adminManager { get; set; }

        public AdminAppService(
            AdminManager adminManager)
        {
            _adminManager = adminManager;
        }

        public async Task<GetAdminsOutput> GetAdmins(GetAdminsInput input)
        {
            var admins = _adminManager.GetAdmins().Where(e => (string.IsNullOrEmpty(input.SearchKey) || e.Name.Contains(input.SearchKey))).Skip((input.PageIndex - 1) * input.PageSize).Take(input.PageSize).ToList();

            return new GetAdminsOutput() { Admins = AutoMapper.Mapper.Map<List<UserDto>>(admins) };
        }

        public async Task<GetAdminNumOutput> GetAdminNum(GetAdminNumInput input)
        {
            int num = _adminManager.GetAdmins().Where(e => (string.IsNullOrEmpty(input.SearchKey) || e.Name.Contains(input.SearchKey))).Count();

            return new GetAdminNumOutput() { Num = num };
        }

        public async Task<CreateAdminOutput> CreateAdmin(CreateAdminInput input)
        {
            var admin = await _adminManager.CreateAdmin(input.UserName, input.Password, input.Name, input.TenantId);

            admin.EmailAddress = input.EmailAddress;
            admin.HeadSculpture = input.HeadSculpture;
            admin.Phone = input.Phone;

            return new CreateAdminOutput();
        }

        public async Task<UpdateAdminOutput> UpdateAdmin(UpdateAdminInput input)
        {
            var admin = _adminManager.GetAdmin(input.Id);

            if (admin == null) {
                throw new Exception("找不到要更新的管理员");
            }

            if (!string.IsNullOrEmpty(input.Password)) {
                _adminManager.UpdatePassword(admin, input.Password);
            }

            admin.EmailAddress = input.EmailAddress;
            admin.Name = input.Name;
            admin.Phone = input.Phone;
            admin.HeadSculpture = input.HeadSculpture;

            return new UpdateAdminOutput();
        }

        public async Task<DeleteAdminOutput> DeleteAdmin(DeleteAdminInput input)
        {
            _adminManager.DeleteAdmin(input.Id);

            return new DeleteAdminOutput();
        }
    }
}
