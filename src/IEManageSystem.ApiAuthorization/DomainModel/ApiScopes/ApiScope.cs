using Abp.Domain.Entities;
using IEManageSystem.ApiAuthorization.DomainModel.ApiScopes;
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

        public ApiScope(string name) {
            Name = name;
        }

        public string Name { get; private set; }

        public ICollection<ApiScopeApi> ApiScopeApis { get; set; }

        public ICollection<ApiScopePermission> ApiScopePermissions { get; set; }

        public void AddPermission(Permission permission)
        {
            if (ApiScopePermissions == null)
            {
                ApiScopePermissions = new List<ApiScopePermission>();
            }

            ApiScopePermissions.Add(new ApiScopePermission(this, permission));
        }

        public  void RemovePermission(Permission permission)
        {
            if (ApiScopePermissions == null)
            {
                throw new Exception("Api域权限为空");
            }

            var removeItem = ApiScopePermissions.FirstOrDefault(e => e.PermissionId == permission.Id);
            if (removeItem == null)
            {
                throw new Exception("Api域不存在该权限");
            }

            ApiScopePermissions.Remove(removeItem);
        }

        public void AddApiScopeApi(ApiSingle apiSingle)
        {
            if (ApiScopeApis == null) {
                ApiScopeApis = new List<ApiScopeApi>();
            }

            ApiScopeApis.Add(new ApiScopeApi(this, apiSingle));
        }

        public void RemoveApiScopeApi(ApiSingle apiSingle)
        {
            if (ApiScopeApis == null)
            {
                throw new Exception("Api域Api为空");
            }

            var removeItem = ApiScopeApis.FirstOrDefault(e=>e.ApiSingleName == apiSingle.Name);

            if (removeItem == null)
            {
                throw new Exception("Api域不存在该权限");
            }

            ApiScopeApis.Remove(removeItem);
        }
    }
}
