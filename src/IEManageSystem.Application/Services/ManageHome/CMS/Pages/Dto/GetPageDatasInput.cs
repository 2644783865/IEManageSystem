﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace IEManageSystem.Services.ManageHome.CMS.Pages.Dto
{
    public class GetPageDatasInput
    {
        [Range(1, 99999999)]
        public int PageIndex { get; set; }

        [Range(1, 99999999)]
        public int PageSize { get; set; }

        public string SearchKey { get; set; }

        public int PageId { get; set; }
    }
}
