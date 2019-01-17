using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Services.ManageHome.AuthorizeManage.ApiScopes.Dto
{
    public class RemoveApiScopeApiSingleInput
    {
        public int ApiScopeId { get; set; }

        public string ApiSingleName { get; set; }
    }
}
