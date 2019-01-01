using Abp.Dependency;
using IdentityServer4.EntityFramework.Entities;
using IEIdentityServer.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;
using System.Linq;
using IEIdentityServer.Core.Help.Exceptions;

namespace IEIdentityServer.Core.Entitys.IdentityService.IdentityResources
{
    public class IdentityResourceManager: ITransientDependency
    {
        private IIEIdentityServerRepository<IdentityResource> _repository { get; set; }

        public IdentityResourceManager(
            IIEIdentityServerRepository<IdentityResource> repository)
        {
            _repository = repository;
        }

        public IdentityResource CreateIdentityResource(
            string name,
            List<string> useClaims)
        {
            List<IdentityClaim> identityClaims = new List<IdentityClaim>();
            useClaims.ForEach(e => identityClaims.Add(new IdentityClaim() { Type = e }));

            IdentityResource identityResource = new IdentityResource()
            {
                Name = name,
                UserClaims = identityClaims,
            };

            return identityResource;
        }

        public IdentityResource GetIdentityResource(int id, Expression<Func<IdentityResource, object>>[] expressions)
        {
            return _repository.GetAllInclude(expressions).FirstOrDefault(e => e.Id == id);
        }

        public void AddIdentityResource(IdentityResource identityResource)
        {
            if (string.IsNullOrWhiteSpace(identityResource.Name))
            {
                throw new IEIdentityException("资源名称不能为空");
            }

            if (_repository.FirstOrDefault(e => e.Name == identityResource.Name) != null) {
                throw new IEIdentityException("已存在相同名称的资源");
            }

            _repository.Insert(identityResource);
        }

        public void UpdateIdentityResourceClaims(IdentityResource identityResource, List<string> useClaims)
        {
            List<IdentityClaim> identityClaims = new List<IdentityClaim>();
            useClaims.ForEach(e => identityClaims.Add(new IdentityClaim() { Type = e }));

            identityResource.UserClaims = identityClaims;
        }

        public void RemoveIdentityResource(int id)
        {
            var identityResource = _repository.FirstOrDefault(id);
            if (identityResource == null)
            {
                throw new Exception("未找到资源");
            }

            if (identityResource.Name == "openid") {
                throw new IEIdentityException("无法删除openid资源，该资源为必须存在");
            }

            if (identityResource.Name == "profile")
            {
                throw new IEIdentityException("无法删除profile资源，该资源为必须存在");
            }

            _repository.Remove(identityResource);
        }
    }
}
