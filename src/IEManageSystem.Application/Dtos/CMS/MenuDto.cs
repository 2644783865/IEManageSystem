﻿using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Dtos.CMS
{
    public class MenuDto
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string DisplayName { get; set; }

        public string Icon { get; set; }

        public List<MenuDto> Menus { get; set; }
    }
}
