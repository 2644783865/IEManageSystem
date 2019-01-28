using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IEManageSystem.Api.Help.IEApiScopeHelp
{
    public class ApiScopeGroupDescribe
    {
        public string Name { get; set; }

        public List<ApiScopeDescribe> ApiScopeDescribes { get; set; }
    }
}
