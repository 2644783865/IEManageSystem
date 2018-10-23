﻿using Abp.Dependency;
using IdentityServer4.EntityFramework.Entities;
using IEIdentityServer.Core.RepositoriesI;
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

        public void AddIdentityResource(
            string name,
            string dispalyName,
            string description,
            List<string> useClaims
            )
        {
            if (_repository.FirstOrDefault(e => e.Name == name) != null)
            {
                throw new IEIdentityException("已存在相同名称的资源");
            }

            List<IdentityClaim> identityClaims = new List<IdentityClaim>();
            useClaims.ForEach(e=> identityClaims.Add(new IdentityClaim() { Type = e }));

            IdentityResource identityResource = new IdentityResource() {
                Name = name,
                DisplayName = dispalyName,
                Description = description,
                UserClaims = identityClaims,
            };

            _repository.Insert(identityResource);
            _repository.SaveChange();
        }

        public void UpdateIdentityResource(
            int id,
            string name,
            string dispalyName,
            string description,
            List<string> useClaims
            )
        {
            Expression<Func<IdentityResource, object>>[] propertySelectors = new Expression<Func<IdentityResource, object>>[] {
                e=>e.UserClaims,
            };
            var identityResource = _repository.GetAllInclude(propertySelectors).FirstOrDefault(e => e.Id == id);
            if (identityResource == null)
            {
                throw new Exception("未找到资源");
            }

            var compareResource = _repository.FirstOrDefault(e => e.Name == name);
            if (compareResource != null && !identityResource.Equals(compareResource))
            {
                throw new IEIdentityException("已存在相同名称的资源");
            }

            if (identityResource.Name == "openid")
            {
                throw new IEIdentityException("不支持更新openid资源");
            }

            if (identityResource.Name == "profile" && name != "profile") {
                throw new IEIdentityException("不支持对profile重新名称");
            }

            List<IdentityClaim> identityClaims = new List<IdentityClaim>();
            useClaims.ForEach(e => identityClaims.Add(new IdentityClaim() { Type = e }));

            identityResource.Name = name;
            identityResource.DisplayName = dispalyName;
            identityResource.Description = description;
            identityResource.UserClaims = identityClaims;

            _repository.SaveChange();
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

            _repository.SaveChange();
        }
    }
}
