using Abp.Dependency;
using IdentityServer4.EntityFramework.Entities;
using IdentityServer4.EntityFramework.Mappers;
using IdentityServer4.Models;
using IEIdentityServer.Core.Entitys.IdentityService.Clients.ClientGrantTypes;
using IEIdentityServer.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;

namespace IEIdentityServer.Core.Entitys.IdentityService.Clients
{
    public class ClientManager : ITransientDependency
    {
        private IIEIdentityServerRepository<IdentityServer4.EntityFramework.Entities.Client> _repository { get; set; }

        private ClientGrantTypeGroupManager _clientGrantTypeManager { get; set; }

        public ClientManager(
            IIEIdentityServerRepository<IdentityServer4.EntityFramework.Entities.Client> repository,
            ClientGrantTypeGroupManager clientGrantTypeManager
            )
        {
            _repository = repository;

            _clientGrantTypeManager = clientGrantTypeManager;
        }

        public IdentityServer4.EntityFramework.Entities.Client CreateClient(
            string clientId,
            string allowedGrantType,
            List<string> clientSecrets,
            List<string> redirectUris,
            List<string> postLogoutRedirectUris,
            List<string> allowedScopes
            )
        {
            ICollection<string> clientGrantTypeList = new List<string>();

            // 认证客户端认证类型是否存在
            if (!string.IsNullOrEmpty(allowedGrantType) && !_clientGrantTypeManager.IsExistClientGrantTypeGroup(allowedGrantType))
            {
                throw new Exception("不存在的客户端认证类型[" + allowedGrantType + "]");
            }

            if (!string.IsNullOrEmpty(allowedGrantType))
            {
                clientGrantTypeList = _clientGrantTypeManager.GetClientGrantTypesForName(allowedGrantType);
            }

            List<IdentityServer4.Models.Secret> clientSecretList = new List<IdentityServer4.Models.Secret>();
            clientSecrets.ForEach(e => {
                clientSecretList.Add(new IdentityServer4.Models.Secret(e.Sha256()));
            });

            IdentityServer4.Models.Client client = new IdentityServer4.Models.Client()
            {
                ClientId = clientId,
                AllowedGrantTypes = clientGrantTypeList,
                ClientSecrets = clientSecretList,
                RedirectUris = redirectUris,
                PostLogoutRedirectUris = postLogoutRedirectUris,
                AllowedScopes = allowedScopes,
            };

            return client.ToEntity();
        }

        public IdentityServer4.EntityFramework.Entities.Client GetClient(int id)
        {
            return _repository.FirstOrDefault(id);
        }

        public void AddClient(IdentityServer4.EntityFramework.Entities.Client client)
        {
            _repository.Insert(client);
        }

        public void RemoveClient(
            int id
            )
        {
            IdentityServer4.EntityFramework.Entities.Client client = _repository.FirstOrDefault(id);
            if (client == null) {
                throw new Exception("不存在的客户端");
            }

            _repository.Remove(client);
        }

        public void UpdateAllowedGrantType(
            IdentityServer4.EntityFramework.Entities.Client client,
            string allowedGrantType
            )
        {
            ICollection<string> clientGrantTypeList = new List<string>();

            if (!string.IsNullOrEmpty(allowedGrantType))
            {
                clientGrantTypeList = _clientGrantTypeManager.GetClientGrantTypesForName(allowedGrantType);
            }

            IdentityServer4.Models.Client clientModel = new IdentityServer4.Models.Client();
            clientModel.AllowedGrantTypes = clientGrantTypeList;

            client.AllowedGrantTypes = clientModel.ToEntity().AllowedGrantTypes;
        }

        public void UpdateAllowedScopes(
            IdentityServer4.EntityFramework.Entities.Client client,
            List<string> allowedScopes
            )
        {
            IdentityServer4.Models.Client clientModel = new IdentityServer4.Models.Client();
            clientModel.AllowedScopes = allowedScopes;

            client.AllowedScopes = clientModel.ToEntity().AllowedScopes;
        }

        public void UpdatePostLogoutRedirectUris(
            IdentityServer4.EntityFramework.Entities.Client client,
            List<string> postLogoutRedirectUris)
        {
            IdentityServer4.Models.Client clientModel = new IdentityServer4.Models.Client();
            clientModel.PostLogoutRedirectUris = postLogoutRedirectUris;

            client.PostLogoutRedirectUris = clientModel.ToEntity().PostLogoutRedirectUris;
        }

        public void UpdateRedirectUris(
            IdentityServer4.EntityFramework.Entities.Client client,
            List<string> redirectUris
            )
        {
            IdentityServer4.Models.Client clientModel = new IdentityServer4.Models.Client();
            clientModel.RedirectUris = redirectUris;

            client.RedirectUris = clientModel.ToEntity().RedirectUris;
        }

        public void UpdateSecrets(
            IdentityServer4.EntityFramework.Entities.Client client,
            List<string> clientSecrets
            )
        {
            List<IdentityServer4.Models.Secret> SecretModels = new List<IdentityServer4.Models.Secret>();
            clientSecrets.ForEach(e => {
                SecretModels.Add(new IdentityServer4.Models.Secret(e.Sha256()));
            });

            IdentityServer4.Models.Client clientModel = new IdentityServer4.Models.Client();
            clientModel.ClientSecrets = SecretModels;

            client.ClientSecrets = clientModel.ToEntity().ClientSecrets;
        }
    }
}
