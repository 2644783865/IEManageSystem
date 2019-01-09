using Abp.Domain.Values;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.ApiAuthorization.DomainModel
{
    public class ApiSingle: ValueObject<ApiSingle>
    {
        public ApiSingle(string name) {
            Name = name;
        }

        public string Name { get; protected set; }
    }
}
