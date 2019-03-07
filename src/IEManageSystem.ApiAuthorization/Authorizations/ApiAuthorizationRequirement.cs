using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.ApiAuthorization.Authorizations
{
    public class ApiAuthorizationRequirement: IAuthorizationRequirement
    {
        public ApiAuthorizationRequirement(
            string controllerName,
            string actionNam
            )
        {
            ControllerName = controllerName;

            ActionName = actionNam;
        }

        public string ControllerName { get; private set; }

        public string ActionName { get; private set; }
    }
}
