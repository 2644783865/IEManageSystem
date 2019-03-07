using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IEManageSystem.Api.Controllers.ManageHome.AuthorizeManage.ApiScopeManages.Dto
{
    public class GetApiScopeUrlsOutput
    {
        public List<GetApiScopeUrlsUrl> Urls { get; set; }
    }

    public class GetApiScopeUrlsUrl
    {
        public string Url { get; set; }

        public bool IsQueryUrl { get; set; }
    }
}
