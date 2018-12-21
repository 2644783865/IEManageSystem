using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace IEManageSystem.Services.ManageHome.AuthorizeManage.ClientManages.Dto
{
    public class AddClientInput
    {
        /// <summary>
        /// 
        /// </summary>
        [Required]
        [StringLength(50, MinimumLength = 6)]
        public string ClientId { get; set; }

        /// <summary>
        /// 
        /// </summary>
        [Required]
        [StringLength(50, MinimumLength = 6)]
        public string ClientSecret { get; set; }

        /// <summary>
        /// 
        /// </summary>
        [Required]
        public string AllowedGrantType { get; set; }

        /// <summary>
        /// 
        /// </summary>
        [Required]
        public List<string> AllowedScopes { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public List<string> RedirectUris { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public List<string> PostLogoutRedirectUris { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public bool AllowAccessTokensViaBrowser { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public string AccessTokenType { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public bool Enabled { get; set; }

        /// <summary>
        /// 
        /// </summary>
        [Required]
        public bool AllowOfflineAccess { get; set; }
    }
}
