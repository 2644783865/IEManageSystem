﻿using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Services.ManageHome.AuthorizeManage.ApiScopes.Dto
{
    public class RemoveApiSingleInput
    {
        public int ApiScopeId { get; set; }

        public int ApiSingleId { get; set; }
    }
}
