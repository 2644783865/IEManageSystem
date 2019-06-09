using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Services.ManageHome.CMS.Pages.Dto
{
    public class UpdatePageDataInput
    {
        public int PageId { get; set; }

        public int Id { get; set; }

        public string Name { get; set; }

        public string Title { get; set; }
    }
}
