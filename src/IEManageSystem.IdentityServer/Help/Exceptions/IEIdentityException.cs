using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.IdentityServer.Help.Exceptions
{
    public class IEIdentityException:Exception
    {
        public IEIdentityException() : base()
        {
        }

        public IEIdentityException(string message) : base(message)
        {
        }

        public IEIdentityException(string message, Exception innerException) : base(message, innerException)
        {
        }
    }
}
