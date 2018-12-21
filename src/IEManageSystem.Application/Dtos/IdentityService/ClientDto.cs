using Abp.AutoMapper;
using IdentityServer4.EntityFramework.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Dtos.IdentityService
{
    [AutoMap(typeof(Client))]
    public class ClientDto
    {
        public int Id { get; set; }

        public string ClientId { get; set; }

        public string AllowedGrantType { get; set; }

        public List<string> AllowedGrantTypes { get; set; }

        public List<string> AllowedScopes { get; set; }

        public List<string> RedirectUris { get; set; }

        public List<string> PostLogoutRedirectUris { get; set; }

        public bool AllowAccessTokensViaBrowser { get; set; }

        public string AccessTokenType { get; set; }

        public bool AllowOfflineAccess { get; set; }

        public bool Enabled { get; set; }
    }
}
