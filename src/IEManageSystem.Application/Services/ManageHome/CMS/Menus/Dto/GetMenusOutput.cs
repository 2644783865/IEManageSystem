﻿using IEManageSystem.Dtos;
using IEManageSystem.Dtos.CMS;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Services.ManageHome.CMS.Menus.Dto
{
    public class GetMenusOutput:OutputDtoBase
    {
        public List<MenuDto> Menus { get; set; }
    }
}
