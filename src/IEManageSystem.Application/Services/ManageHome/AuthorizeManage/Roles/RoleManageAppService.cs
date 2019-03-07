﻿using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using IEManageSystem.Entitys.Authorization.Roles;
using IEManageSystem.Services.ManageHome.AuthorizeManage.Roles.Dto;
using System.Linq;
using IEManageSystem.Dtos.Core;
using IEManageSystem.Help.Exceptions;
using Abp.Domain.Repositories;
using IEManageSystem.Entitys.Authorization;
using System.Linq.Expressions;
using IEManageSystem.Entitys.Authorization.Permissions;
using IEManageSystem.Help.IEApiScopeHelp;
using IEManageSystem.ApiAuthorization;

namespace IEManageSystem.Services.ManageHome.AuthorizeManage.Roles
{
    [ApiAuthorization(IEApiScopeProvider.RoleManage)]
    public class RoleManageAppService : IEManageSystemAppServiceBase, IRoleManageAppService
    {
        private RoleManager _roleManager { get; set; }

        private IRepository<Permission> _permissionRepository { get; set; }

        public RoleManageAppService(
            RoleManager roleManager,
            IRepository<Permission> permissionRepository)
        {
            _roleManager = roleManager;

            _permissionRepository = permissionRepository;
        }

        [ApiAuthorizationQuery]
        public async Task<GetRolesOutput> GetRoles(GetRolesInput input)
        {
            var roles = _roleManager.GetRoles().Where(e => (string.IsNullOrEmpty(input.SearchKey) || e.Name.Contains(input.SearchKey))).Skip((input.PageIndex - 1) * input.PageSize).Take(input.PageSize).ToList();

            return new GetRolesOutput() { Roles = AutoMapper.Mapper.Map<List<RoleDto>>(roles) };
        }

        [ApiAuthorizationQuery]
        public async Task<GetRoleNumOutput> GetRoleNum(GetRoleNumInput input)
        {
            int num = _roleManager.GetRoles().Where(e => (string.IsNullOrEmpty(input.SearchKey) || e.Name.Contains(input.SearchKey))).Count();

            return new GetRoleNumOutput() { Num = num };
        }

        public async Task<AddRoleOutput> AddRole(AddRoleInput input)
        {
            Role role = new Role(input.Name)
            {
                DisplayName = input.DisplayName,
                Describe = input.DisplayName
            };

            await _roleManager.CreateRole(role);

            return new AddRoleOutput();
        }

        public async Task<DeleteRoleOutput> DeleteRole(DeleteRoleInput input)
        {
            _roleManager.DeleteRole(input.Id);

            return new DeleteRoleOutput();
        }

        public async Task<UpdateRoleOutput> UpdateRole(UpdateRoleInput input)
        {
            var role = _roleManager.GetRole(input.Id);

            role.DisplayName = input.DisplayName;
            role.Describe = input.Describe;

            return new UpdateRoleOutput();
        }

        [ApiAuthorizationQuery]
        public async Task<GetPermissionsOutput> GetPermissions(GetPermissionsInput input)
        {
            Expression<Func<Role, object>>[] propertySelectors = new Expression<Func<Role, object>>[] {
                e => e.RolePermissions
            };
            var role = _roleManager.RoleRepository.GetAllIncluding(propertySelectors).FirstOrDefault(e => e.Id == input.Id);

            List<int> permissionIds = role.RolePermissions.Select(e => e.PermissionId).ToList();
            var permissions = await _permissionRepository.GetAllListAsync(e => permissionIds.Contains(e.Id));

            return new GetPermissionsOutput() { Permissions = AutoMapper.Mapper.Map<List<PermissionDto>>(permissions) };
        }

        public async Task<AddPermissionOutput> AddPermission(AddPermissionInput input)
        {
            var role = _roleManager.GetRole(input.RoleId);
            if (role == null) {
                throw new MessageException("找不到要添加权限的角色");
            }

            var permission = _permissionRepository.Get(input.PermissionId);
            if (permission == null) {
                throw new MessageException("找不到要添加的权限");
            }

            _roleManager.AddPermission(role, permission);
            return new AddPermissionOutput();
        }

        public async Task<RemovePermissionOutput> RemovePermission(RemovePermissionInput input)
        {
            var role = _roleManager.GetRole(input.RoleId);
            if (role == null)
            {
                throw new MessageException("找不到要移除权限的角色");
            }

            var permission = _permissionRepository.Get(input.PermissionId);
            if (permission == null)
            {
                throw new MessageException("找不到要移除的权限");
            }

            _roleManager.RemovePermission(role, permission);
            return new RemovePermissionOutput();
        }
    }
}
