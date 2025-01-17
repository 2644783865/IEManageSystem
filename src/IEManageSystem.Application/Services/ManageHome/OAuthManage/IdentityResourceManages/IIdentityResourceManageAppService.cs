﻿using Abp.Application.Services;
using IEManageSystem.Services.ManageHome.OAuthManage.IdentityResourceManages.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace IEManageSystem.Services.ManageHome.OAuthManage.IdentityResourceManages
{
    public interface IIdentityResourceManageAppService:IApplicationService
    {
        Task<GetIdentityResourceOutput> GetIdentityResources(GetIdentityResourceInput input);

        Task<GetIdentityResourceNumOutput> GetIdentityResourceNum(GetIdentityResourceNumInput input);

        Task<AddIdentityResourceOutput> AddIdentityResource(AddIdentityResourceInput input);

        Task<DeleteIdentityResourceOutput> DeleteIdentityResource(DeleteIdentityResourceInput input);

        Task<UpdateIdentityResourceOutput> UpdateIdentityResource(UpdateIdentityResourceInput input);
    }
}
