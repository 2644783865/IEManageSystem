using Abp.Dependency;
using IdentityServer4.EntityFramework.Entities;
using IEIdentityServer.Core.Help.Exceptions;
using IEIdentityServer.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;

namespace IEIdentityServer.Core.Entitys.IdentityService.ApiResources
{
    public class ApiResourceManager: ITransientDependency
    {
        private IIEIdentityServerRepository<ApiResource> _repository { get; set; }

        public ApiResourceManager(
            IIEIdentityServerRepository<ApiResource> repository
            )
        {
            _repository = repository;
            // IdentityServer4.EntityFramework.Entities.Client
        }

        public ApiResource GetApiResource(int id, Expression<Func<ApiResource, object>>[] expressions)
        {
            return _repository.GetAllInclude(expressions).FirstOrDefault(e => e.Id == id);
        }

        public ApiResource CreateApiResource(
            string name,
            List<string> useClaims)
        {
            List<ApiResourceClaim> apiClaims = new List<ApiResourceClaim>();
            useClaims.ForEach(e => apiClaims.Add(new ApiResourceClaim() { Type = e }));

            ApiResource apiResource = new ApiResource()
            {
                Name = name,
                UserClaims = apiClaims,
            };

            return apiResource;
        }

        /// <summary>
        /// 添加资源
        /// </summary>
        /// <param name="name"></param>
        /// <param name="displayName"></param>
        /// <param name="description"></param>
        /// <param name="useClaims"></param>
        public void AddResource(ApiResource resource)
        {
            if (string.IsNullOrWhiteSpace(resource.Name)) {
                throw new IEIdentityException("资源名称不能为空");
            }

            if (_repository.FirstOrDefault(e => e.Name == resource.Name) != null)
            {
                throw new IEIdentityException("已存在相同名称的资源");
            }

            _repository.Insert(resource);
        }

        /// <summary>
        /// 更新资源
        /// </summary>
        /// <param name="resource"></param>
        /// <param name="useClaims"></param>
        public void UpdateApiResourceClaims(
            ApiResource resource,
            List<string> useClaims
            )
        {
            List<ApiResourceClaim> claims = new List<ApiResourceClaim>();
            useClaims.ForEach(e => claims.Add(new ApiResourceClaim() { Type = e }));

            resource.UserClaims = claims;
        }

        /// <summary>
        /// 删除资源
        /// </summary>
        /// <param name="id"></param>
        public void RemoveApiResource(int id)
        {
            var resource = _repository.FirstOrDefault(id);
            if (resource == null)
            {
                throw new Exception("未找到资源");
            }
            _repository.Remove(resource);
        }
    }
}
