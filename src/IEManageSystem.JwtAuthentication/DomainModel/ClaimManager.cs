using Abp.Dependency;
using IEManageSystem.Entitys.Authorization.Identitys;
using IEManageSystem.JwtAuthentication.Configuration;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text;

namespace IEManageSystem.JwtAuthentication.DomainModel
{
    public class ClaimManager : ITransientDependency
    {
        public List<Claim> CreateClaims(IdentityUser identityUser)
        {
            List<Claim> claims = new List<Claim>() {
                new Claim(JwtClaimType.Subject, identityUser.Id.ToString()),
                new Claim(JwtClaimType.Audience, JwtAuthenConfiguration.Audience),
                new Claim(JwtClaimType.Issuer, JwtAuthenConfiguration.Issuer),
                new Claim(JwtClaimType.NameIdentifier, identityUser.Id.ToString()),
                new Claim(JwtClaimType.UserName, identityUser.UserName),
                new Claim(JwtClaimType.Name, identityUser.Name ?? ""),
                new Claim(JwtClaimType.EmailAddress, identityUser.EmailAddress ?? ""),
                new Claim(JwtClaimType.Phone, identityUser.Phone ?? ""),
            };

            identityUser.Permissions.ForEach(e => {
                claims.Add(new Claim(JwtClaimType.Permission, e));
            });

            return claims;
        }

        /// <summary>
        /// 获取公布的claim类型
        /// </summary>
        /// <returns></returns>
        public List<string> GetIssueClaims()
        {
            return new List<string>() {
                JwtClaimType.Subject,
                JwtClaimType.Audience,
                JwtClaimType.Issuer,
                JwtClaimType.NameIdentifier,
                JwtClaimType.UserName,
                JwtClaimType.Name,
                JwtClaimType.EmailAddress,
                JwtClaimType.Phone,
            };
        }
    }
}
