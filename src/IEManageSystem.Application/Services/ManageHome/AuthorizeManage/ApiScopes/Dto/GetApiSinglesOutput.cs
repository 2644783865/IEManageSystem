using IEManageSystem.Dtos;
using IEManageSystem.Dtos.ApiAuthorization;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Services.ManageHome.AuthorizeManage.ApiScopes.Dto
{
    public class GetApiSinglesOutput:OutputDtoBase
    {
        public List<ApiSingleDto> ApiSingles { get; set; }
    }
}
