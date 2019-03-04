using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IEManageSystem.Api.Configuration
{
    public static class WebConfiguration
    {
        public static string SymmetricKey { get; private set; }

        public const string Audience = "IceEmblemApi";

        public const string Issuer = "http://localhost:8081";

        public static void Init(IConfigurationRoot appConfiguration)
        {
            SymmetricKey = appConfiguration.GetSection("AppConfiguration").GetSection("SymmetricKey").Value;
        }
    }
}
