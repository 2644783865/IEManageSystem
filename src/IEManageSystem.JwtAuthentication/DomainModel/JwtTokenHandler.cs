using Abp.Dependency;
using IEManageSystem.Entitys.Authorization.Identitys;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace IEManageSystem.JwtAuthentication.DomainModel
{
    public class JwtTokenHandler: ITransientDependency
    {
        private ClaimManager _claimManager { get; set; }

        public JwtTokenHandler(ClaimManager claimManager)
        {
            _claimManager = claimManager;
        }

        public string CreateToken(IdentityUser identityUser, string symmetricKey)
        {
            var tokenHandler = new JwtSecurityTokenHandler();

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(_claimManager.CreateClaims(identityUser)),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = 
                    new SigningCredentials(
                        new SymmetricSecurityKey(Encoding.ASCII.GetBytes(symmetricKey)),
                        SecurityAlgorithms.HmacSha256Signature
                    )
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}
