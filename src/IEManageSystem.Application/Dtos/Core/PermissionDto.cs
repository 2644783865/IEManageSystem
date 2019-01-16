using Abp.AutoMapper;
using IEManageSystem.Entitys.Authorization;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.Dtos.Core
{
    [AutoMap(typeof(Permission))]
    public class PermissionDto
    {
        public string Name { get; set; }
    }
}
