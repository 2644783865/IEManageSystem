using IEManageSystem.Dtos;
using IEManageSystem.Dtos.Core;
using IEManageSystem.Entitys.Authorization.Users;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Services.ManageHome.AuthorizeManage.Admins.Dto
{
    public class GetAdminsOutput:OutputDtoBase
    {
        public List<UserDto> Admins { get; set; }
    }
}
