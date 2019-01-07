using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.ApiAuthorization.DomainModel
{
    public class ApiSingle
    {
        public ApiSingle(string name) {
            Name = name;
        }

        public string Name { get; private set; }
    }
}
