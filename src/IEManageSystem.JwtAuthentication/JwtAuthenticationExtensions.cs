using IEManageSystem.JwtAuthentication.Configuration;
using IEManageSystem.JwtAuthentication.DomainModel;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.JwtAuthentication
{
    public static class JwtAuthenticationExtensions
    {
        public static AuthenticationBuilder AddIEJwtBearer(this IServiceCollection services, string symmetricKey)
        {
            return services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    NameClaimType = JwtClaimType.UserName,
                    //RoleClaimType = JwtClaimTypes.Role,
                    ValidIssuer = JwtAuthenConfiguration.Issuer,
                    ValidAudience = JwtAuthenConfiguration.Audience,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(symmetricKey))
                };

                options.IncludeErrorDetails = true;
            }); ;
        }
    }
}
