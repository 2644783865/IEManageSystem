using Abp.Domain.Repositories;
using IEManageSystem.Entitys.Authorization;
using IEManageSystem.Services.ManageHome.AuthorizeManage.Permissions.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using IEManageSystem.Dtos.Core;
using System.Threading.Tasks;
using IEManageSystem.Entitys.Authorization.Permissions;

namespace IEManageSystem.Services.ManageHome.AuthorizeManage.Permissions
{
    public class PermissionManageAppService: IEManageSystemAppServiceBase, IPermissionManageAppService
    {
        private IRepository<Permission> _permissionRepository { get; set; }

        public PermissionManageAppService(
            IRepository<Permission> permissionRepository)
        {
            _permissionRepository = permissionRepository;
        }

        public async Task<GetPermissionsOutput> GetPermissions(GetPermissionsInput input)
        {
            var permissions = _permissionRepository.GetAll()
                .OrderByDescending(e => e.Id).Where(e => (e.Name != null && e.Name.Contains(input.SearchKey)) || string.IsNullOrEmpty(input.SearchKey)).Skip(input.PageSize * (input.PageIndex - 1))
                .Take(input.PageSize).ToList();

            return new GetPermissionsOutput() { Permissions = AutoMapper.Mapper.Map<List<PermissionDto>>(permissions) };
        }

        public async Task<GetPermissionNumOutput> GetPermissionNum(GetPermissionNumInput input)
        {
            int num = _permissionRepository.GetAll()
                .OrderByDescending(e => e.Id).Where(e => (e.Name != null && e.Name.Contains(input.SearchKey)) || string.IsNullOrEmpty(input.SearchKey)).Count();

            return new GetPermissionNumOutput() { Num = num };
        }

        public async Task<AddPermissionOutput> AddPermission(AddPermissionInput input)
        {
            if (_permissionRepository.FirstOrDefault(e => e.Name == input.Name) != null)
            {
                return new AddPermissionOutput() { ErrorMessage = $"已存在名为{input.Name}的权限" };
            }

            Permission permission = new Permission(input.Name);
            permission.DisplayName = input.DisplayName;

            _permissionRepository.Insert(permission);

            return new AddPermissionOutput();
        }

        public async Task<DeletePermissionOutput> DeletePermission(DeletePermissionInput input)
        {
            Permission permission = _permissionRepository.FirstOrDefault(input.Id);

            if (permission == null)
            {
                return new DeletePermissionOutput() { ErrorMessage = "找不到要删除的权限" };
            }

            _permissionRepository.Delete(permission);
            return new DeletePermissionOutput();
        }

        public async Task<UpdatePermissionOutput> UpdatePermission(UpdatePermissionInput input)
        {
            Permission permission = _permissionRepository.FirstOrDefault(input.Id);

            if (permission == null)
            {
                return new UpdatePermissionOutput() { ErrorMessage = "找不到要更新的权限" };
            }

            permission.DisplayName = input.DisplayName;

            return new UpdatePermissionOutput();
        }
    }
}
