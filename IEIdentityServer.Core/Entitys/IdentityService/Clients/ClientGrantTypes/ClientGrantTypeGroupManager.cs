using Abp.Dependency;
using IdentityServer4.EntityFramework.Entities;
using IdentityServer4.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;

namespace IEIdentityServer.Core.Entitys.IdentityService.Clients.ClientGrantTypes
{
    public class ClientGrantTypeGroupManager: ITransientDependency
    {
        private static List<ClientGrantTypeGroup> _grantTypeGroupList = new List<ClientGrantTypeGroup>() {
            ClientGrantTypeGroup.Code,
            ClientGrantTypeGroup.Hybrid,
            ClientGrantTypeGroup.Implicit,
            ClientGrantTypeGroup.ClientCredentials,
            ClientGrantTypeGroup.ResourceOwnerPassword,
            ClientGrantTypeGroup.CodeAndClientCredentials,
            ClientGrantTypeGroup.HybridAndClientCredentials,
            ClientGrantTypeGroup.ImplicitAndClientCredentials,
            ClientGrantTypeGroup.ResourceOwnerPasswordAndClientCredentials,
        };

        public List<string> GetClientGrantTypeGroupNames()
        {
            return new List<string>(_grantTypeGroupList.Select(e=>e.Name));
        }

        public bool IsExistClientGrantTypeGroup(string name)
        {
            return _grantTypeGroupList.Select(e => e.Name).Contains(name);
        }

        public ICollection<string> GetClientGrantTypesForName(string name)
        {
            var clientGrantTypeGroup = _grantTypeGroupList.FirstOrDefault(e => e.Name == name);

            if (clientGrantTypeGroup == null) {
                throw new Exception("不存在的认证类型名称");
            }

            return clientGrantTypeGroup.ClientGrantTypes;
        }

        public string GetClientGrantTypeGroupNameForClientGrantTypes(List<string> clientGrantTypes)
        {
            foreach (var item in _grantTypeGroupList)
            {
                List<string> grantTypes = item.ClientGrantTypes.ToList();

                if (grantTypes.Count != clientGrantTypes.Count || !grantTypes.All(clientGrantTypes.Contains))
                    continue;

                grantTypes.Sort();
                clientGrantTypes.Sort();
                int count = grantTypes.Count;
                for (int n = 0; n < count; n++)
                {
                    if (0 != string.Compare(grantTypes[n], clientGrantTypes[n], false))
                    {
                        continue;
                    }
                }

                return item.Name;
            }

            return null;
        }
    }
}
