using Abp.Domain.Entities;
using IEManageSystem.ApiAuthorization.DomainModel.ApiScopes;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.ApiAuthorization.DomainModel.ApiScopes
{
    public class ApiSingle : Entity
    {
        public string ControllerName { get; set; }

        public string ControllerDescribe { get; set; }

        public int ApiScopeId { get; set; }

        public ApiScope ApiScope { get; set; }
    }
}
