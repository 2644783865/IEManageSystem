using Abp.Dependency;
using IEManageSystem.Api.Configuration;
using IEManageSystem.ApiAuthorization;
using IEManageSystem.Entitys.Authorization.Identitys;
using IEManageSystem.Entitys.Authorization.LoginManagers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace IEManageSystem.Api.Help.ClaimHelp
{
    /// <summary>
    /// 提供站点Claim
    /// </summary>
    public class ClaimHelper : ITransientDependency
    {
        public ClaimHelper(
            )
        {
        }

        /// <summary>
        /// 获取站点Claim类型列表
        /// </summary>
        /// <returns></returns>
        public List<string> GetWebClaimTypes()
        {
            return new List<string>
                    {
                            ClaimBuilder.Subject.ClaimName,
                            ClaimBuilder.Audience.ClaimName,
                            ClaimBuilder.Issuer.ClaimName,
                            ClaimBuilder.Id.ClaimName,
                            ClaimBuilder.UserName.ClaimName,
                            ClaimBuilder.EmailAddress.ClaimName,
                            ClaimBuilder.Name.ClaimName,
                            ClaimBuilder.Phone.ClaimName,
                    };
        }

        /// <summary>
        /// 用IdentityUser生成Claims
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public List<Claim> CreateClaimsForIdentityUser(IdentityUser user)
        {
            List<Claim> claims = new List<Claim>
                    {
                            ClaimBuilder.Subject.CreateClaim(user.Id.ToString()),
                            ClaimBuilder.Audience.CreateClaim(WebConfiguration.Audience),
                            ClaimBuilder.Issuer.CreateClaim(WebConfiguration.Issuer),
                            ClaimBuilder.Id.CreateClaim(user.Id.ToString()),
                            ClaimBuilder.UserName.CreateClaim(user.UserName ?? ""),
                            ClaimBuilder.EmailAddress.CreateClaim(user.EmailAddress ?? ""),
                            ClaimBuilder.Name.CreateClaim(user.Name ?? ""),
                            ClaimBuilder.Phone.CreateClaim(user.Phone ?? ""),
                    };

            // Api域权限Claim
            user.Permissions.ForEach(e => {
                claims.Add(new Claim(ApiAuthorizationExtensions.ApiPermissiionClaimName, e));
            });

            return claims;
        }
    }
}
