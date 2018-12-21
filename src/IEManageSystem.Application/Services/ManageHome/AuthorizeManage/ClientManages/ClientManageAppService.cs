using IdentityServer4.EntityFramework.Entities;
using IEIdentityServer.Core.Entitys.IdentityService.Clients;
using IEIdentityServer.Core.Repositories;
using IEManageSystem.Services.ManageHome.AuthorizeManage.ClientManages.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Linq;
using IEManageSystem.Dtos.IdentityService;
using System.Linq.Expressions;
using UtilityAction.Other;
using IEIdentityServer.Core.Entitys.IdentityService.Clients.ClientGrantTypes;

namespace IEManageSystem.Services.ManageHome.AuthorizeManage.ClientManages
{
    public class ClientManageAppService: IClientManageAppService
    {
        private ClientManager _clientManager { get; set; }

        private IIEIdentityServerRepository<Client> _clientRepository { get; set; }

        private ClientGrantTypeGroupManager _clientGrantTypeGroupManager { get; set; }

        public ClientManageAppService(
            ClientManager clientManager,
            IIEIdentityServerRepository<Client> clientRepository,
            ClientGrantTypeGroupManager clientGrantTypeGroupManager
            )
        {
            _clientManager = clientManager;

            _clientRepository = clientRepository;

            _clientGrantTypeGroupManager = clientGrantTypeGroupManager;
        }

        public async Task<GetClientsOutput> GetClients(GetClientsInput input)
        {
            Expression<Func<Client, object>>[] clientLoad = new Expression<Func<Client, object>>[] {
                e=>e.AllowedGrantTypes,
                e=>e.RedirectUris,
                e=>e.PostLogoutRedirectUris,
                e=>e.AllowedScopes,
            };

            var clients = _clientRepository.GetAllInclude(clientLoad).OrderByDescending(e => e.Id).Skip((input.PageIndex - 1) * input.PageSize).Take(input.PageSize).ToList();

            List<ClientDto> clientDtos = new List<ClientDto>();
            foreach (var item in clients) {
                ClientDto clientDto = new ClientDto() {
                    Id = item.Id,
                    ClientId = item.ClientId,
                    AccessTokenType = item.AccessTokenType == (int)IdentityServer4.Models.AccessTokenType.Jwt ? "jwt" : "reference",
                    AllowAccessTokensViaBrowser = item.AllowAccessTokensViaBrowser,
                    AllowedGrantTypes = item.AllowedGrantTypes.Select(e => e.GrantType).ToList(),
                    AllowedScopes = item.AllowedScopes.Select(e=>e.Scope).ToList(),
                    AllowOfflineAccess = item.AllowOfflineAccess,
                    Enabled = item.Enabled,
                    RedirectUris = item.RedirectUris.Select(e=>e.RedirectUri).ToList(),
                    PostLogoutRedirectUris = item.PostLogoutRedirectUris.Select(e=>e.PostLogoutRedirectUri).ToList(),
                    AllowedGrantType = _clientGrantTypeGroupManager.GetClientGrantTypeGroupNameForClientGrantTypes(item.AllowedGrantTypes.Select(e=>e.GrantType).ToList())
                };

                clientDtos.Add(clientDto);
            }

            return new GetClientsOutput() { Clients = clientDtos };
        }

        public async Task<GetClientNumOutput> GetClientNum(GetClientNumInput input)
        {
            int clientNum = _clientRepository.GetAll().Count();

            return new GetClientNumOutput() { ClientNum = clientNum };
        }

        public async Task<AddClientOutput> AddClient(AddClientInput input)
        {
            if (!Regular.IsMatchLettersNumbers(input.ClientId))
            {
                return new AddClientOutput() { ErrorMessage = "客户端Id只能输入数字和字母" };
            }

            if (!Regular.IsMatchLettersNumbers(input.ClientSecret))
            {
                return new AddClientOutput() { ErrorMessage = "密匙只能输入数字和字母" };
            }

            var client = _clientManager.CreateClient(input.ClientId,
                input.AllowedGrantType,
                new List<string>() { input.ClientSecret },
                input.RedirectUris,
                input.PostLogoutRedirectUris,
                input.AllowedScopes);

            client.AllowOfflineAccess = input.AllowOfflineAccess;
            client.AccessTokenType = (int) ("jwt".Equals(input.AccessTokenType, StringComparison.OrdinalIgnoreCase) ? IdentityServer4.Models.AccessTokenType.Jwt: IdentityServer4.Models.AccessTokenType.Reference);
            client.AllowAccessTokensViaBrowser = input.AllowAccessTokensViaBrowser;
            client.Enabled = input.Enabled;

            _clientManager.AddClient(client);

            return new AddClientOutput();
        }

        public async Task<RemoveClientOutput> RemoveClient(RemoveClientInput input)
        {
            _clientManager.RemoveClient(input.Id);

            return new RemoveClientOutput();
        }

        public async Task<UpdateClientOutput> UpdateClient(UpdateClientInput input)
        {
            if (!Regular.IsMatchLettersNumbers(input.ClientId))
            {
                return new UpdateClientOutput() { ErrorMessage = "客户端Id只能输入数字和字母" };
            }

            if (!string.IsNullOrEmpty(input.ClientSecret) && !Regular.IsMatchLettersNumbers(input.ClientSecret)) {
                return new UpdateClientOutput() { ErrorMessage = "密匙只能输入数字和字母" };
            }

            if (!string.IsNullOrEmpty(input.ClientSecret) && (input.ClientSecret.Length < 6 || input.ClientSecret.Length > 50)) {
                return new UpdateClientOutput() { ErrorMessage = "客户端密匙长度必须大于或等于6，小于或等于50" };
            }

            var client = _clientManager.GetClient(input.Id);

            _clientManager.UpdateAllowedGrantType(client, input.AllowedGrantType);
            _clientManager.UpdateAllowedScopes(client, input.AllowedScopes);
            _clientManager.UpdatePostLogoutRedirectUris(client, input.PostLogoutRedirectUris);
            _clientManager.UpdateRedirectUris(client, input.RedirectUris);

            // 如果密匙不为空，则更新
            if (!string.IsNullOrEmpty(input.ClientSecret)) {
                _clientManager.UpdateSecrets(client, new List<string>() { input.ClientSecret });
            }

            client.ClientId = input.ClientId;
            client.AllowAccessTokensViaBrowser = input.AllowAccessTokensViaBrowser;
            client.AllowOfflineAccess = input.AllowOfflineAccess;
            client.Enabled = input.Enabled;

            return new UpdateClientOutput();
        }
    }
}
