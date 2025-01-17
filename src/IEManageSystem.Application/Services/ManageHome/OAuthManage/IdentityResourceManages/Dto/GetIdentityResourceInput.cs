﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace IEManageSystem.Services.ManageHome.OAuthManage.IdentityResourceManages.Dto
{
    public class GetIdentityResourceInput
    {
        [Range(1,99999999)]
        public int PageIndex { get; set; }

        [Range(1,99999999)]
        public int PageSize { get; set; }

        public string SearchKey { get; set; }
    }
}
