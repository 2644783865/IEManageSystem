using Abp.Application.Services;
using IEManageSystem.Services.ManageHome.CMS.Menus.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Services.ManageHome.CMS.Menus
{
    public interface IMenuManageAppService: IApplicationService
    {
        GetMenusOutput GetMenus(GetMenusInput input);

        AddLeafMenuOutput AddLeafMenu(AddLeafMenuInput input);

        AddCompositeMenuOutput AddCompositeMenu(AddCompositeMenuInput input);

        RemoveMenuOutput RemoveMenu(RemoveMenuInput input);

        UpdateMeunOutput UpdateMeun(UpdateMeunInput input);
    }
}
