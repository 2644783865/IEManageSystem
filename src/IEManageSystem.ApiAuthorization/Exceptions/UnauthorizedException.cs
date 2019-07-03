using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.ApiAuthorization.Exceptions
{
    public class UnauthorizedException : Exception
    {
        public UnauthorizedException() : base()
        {
        }

        public UnauthorizedException(string message) : base(message)
        {
        }

        public UnauthorizedException(string message, Exception innerException) : base(message, innerException)
        {
        }
    }
}
