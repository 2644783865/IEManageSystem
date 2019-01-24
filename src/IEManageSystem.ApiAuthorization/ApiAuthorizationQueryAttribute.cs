using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.ApiAuthorization
{
    [AttributeUsage(AttributeTargets.Method, AllowMultiple = true, Inherited = true)]
    public class ApiAuthorizationQueryAttribute: Attribute
    {
    }
}
