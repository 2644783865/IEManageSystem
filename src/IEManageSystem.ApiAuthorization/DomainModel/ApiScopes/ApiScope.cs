using Abp.Domain.Entities;
using IEManageSystem.ApiAuthorization.DomainModel.ApiScopes;
using IEManageSystem.ApiAuthorization.DomainModel.ApiScopes.AuthorizationNodes;
using IEManageSystem.ApiAuthorization.DomainModel.ApiSingles;
using IEManageSystem.Entitys.Authorization;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;

namespace IEManageSystem.ApiAuthorization.DomainModel.ApiScopes
{
    [Table("ApiScope")]
    public class ApiScope:Entity
    {
        protected ApiScope() {
        }

        public ApiScope(string name)
        {
            Name = name;

            ApiManageScope = new ApiManageScope();

            ApiQueryScope = new ApiQueryScope();
        }

        public string Name { get; protected set; }

        public string DisplayName { get; protected set; }

        public ICollection<ApiSingle> ApiSingles { get; set; }

        public ApiManageScope ApiManageScope { get; set; }

        public ApiQueryScope ApiQueryScope { get; set; }

        public void SetDisplayName(string displayName)
        {
            DisplayName = displayName;
        }

        public void AddApiScopeApi(ApiSingle apiSingle)
        {
            if (ApiSingles == null)
            {
                ApiSingles = new List<ApiSingle>();
            }

            ApiSingles.Add(apiSingle);
        }

        public void RemoveApiScopeApi(ApiSingle apiSingle)
        {
            if (ApiSingles == null)
            {
                throw new Exception("Api域Api为空");
            }

            ApiSingles.Remove(apiSingle);
        }
    }
}
