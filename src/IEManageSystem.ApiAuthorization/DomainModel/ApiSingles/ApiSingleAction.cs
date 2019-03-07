using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.ApiAuthorization.DomainModel.ApiSingles
{
    public class ApiSingleAction : Entity
    {
        protected ApiSingleAction() {
        }

        public ApiSingleAction(string name) {
            Name = name;
        }

        public string Name { get; protected set; }

        public bool IsQueryAction { get; set; }

        public int ApiSingleId { get; set; }
    }
}
