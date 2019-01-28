using IEManageSystem.Dtos.IdentityService;
using IEManageSystem.Services.ManageHome.OAuthManage.IdentityResourceManages.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Linq;
using IEManageSystem.IdentityServer.Repositories;
using IdentityServer4.EntityFramework.Entities;
using System.Linq.Expressions;
using IEManageSystem.IdentityServer.Entitys.IdentityResources;

namespace IEManageSystem.Services.ManageHome.OAuthManage.IdentityResourceManages
{
    public class IdentityResourceManageAppService: IEManageSystemAppServiceBase, IIdentityResourceManageAppService
    {
        private IIEIdentityServerRepository<IdentityResource> _IdentityResourceRepository { get; set; }

        private IdentityResourceManager _IdentityResourceManager { get; set; }

        public IdentityResourceManageAppService(
            IIEIdentityServerRepository<IdentityResource> identityResourceRepository,
            IdentityResourceManager identityResourceManager
            )
        {
            _IdentityResourceRepository = identityResourceRepository;

            _IdentityResourceManager = identityResourceManager;
        }

        /// <summary>
        /// 获取身份资源列表
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task<GetIdentityResourceOutput> GetIdentityResources(GetIdentityResourceInput input)
        {
            var includes = new System.Linq.Expressions.Expression<Func<IdentityResource, object>>[] {
                    e=>e.UserClaims,
                };

            List<IdentityResource> resources = FiltersResources(_IdentityResourceRepository.GetAllInclude(includes), input.SearchKey).OrderByDescending(e => e.Id).Skip((input.PageIndex - 1) * input.PageSize).Take(input.PageSize).ToList();

            List<IdentityResourceDto> resourceDtos = new List<IdentityResourceDto>();
            foreach (var item in resources)
            {
                IdentityResourceDto resourceDto = new IdentityResourceDto()
                {
                    Id = item.Id,
                    Name = item.Name,
                    DisplayName = item.DisplayName,
                    Description = item.Description,
                    Enabled = item.Enabled,
                    Required = item.Required,
                    UserClaims = item.UserClaims.Select(e => e.Type).ToList(),
                };

                resourceDtos.Add(resourceDto);
            }

            return new GetIdentityResourceOutput() { IdentityResources = resourceDtos };
        }

        /// <summary>
        /// 获取Api资源数量
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task<GetIdentityResourceNumOutput> GetIdentityResourceNum(GetIdentityResourceNumInput input)
        {
            int resourceNum = FiltersResources(_IdentityResourceRepository.GetAll(), input.SearchKey).Count();

            return new GetIdentityResourceNumOutput() { ResourceNum = resourceNum };
        }

        public IEnumerable<IdentityResource> FiltersResources(IEnumerable<IdentityResource> apiResources, string searchKey)
        {
            if (!string.IsNullOrWhiteSpace(searchKey))
                apiResources = apiResources.Where(e =>
                    (e.Name != null && e.Name.Contains(searchKey)) ||
                    (e.DisplayName != null && e.DisplayName.Contains(searchKey))
                    );

            return apiResources;
        }

        /// <summary>
        /// 添加身份资源
        /// </summary>
        /// <returns></returns>
        public async Task<AddIdentityResourceOutput> AddIdentityResource(AddIdentityResourceInput input)
        {
            var resource = _IdentityResourceManager.CreateIdentityResource(input.Name, input.UserClaims);

            resource.Description = input.Description;
            resource.DisplayName = input.DisplayName;
            resource.Enabled = input.Enabled;
            resource.Required = input.Required;

            _IdentityResourceManager.AddIdentityResource(resource);

            return new AddIdentityResourceOutput();
        }

        /// <summary>
        /// 删除身份资源
        /// </summary>
        /// <returns></returns>
        public async Task<DeleteIdentityResourceOutput> DeleteIdentityResource(DeleteIdentityResourceInput input)
        {
            if (_IdentityResourceRepository.FirstOrDefault(input.Id) == null) {
                return new DeleteIdentityResourceOutput() { ErrorMessage = "未找到资源" };
            }

            _IdentityResourceManager.RemoveIdentityResource(input.Id);

            return new DeleteIdentityResourceOutput();
        }

        /// <summary>
        /// 更新身份资源
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task<UpdateIdentityResourceOutput> UpdateIdentityResource(UpdateIdentityResourceInput input)
        {
            Expression<Func<IdentityResource, object>>[] includes = new Expression<Func<IdentityResource, object>>[] {
                e=>e.UserClaims
            };
            var resource = _IdentityResourceManager.GetIdentityResource(input.Id, includes);

            if (resource == null)
            {
                return new UpdateIdentityResourceOutput() { ErrorMessage = "未找到资源" };
            }

            _IdentityResourceManager.UpdateIdentityResourceClaims(resource, input.UserClaims);
            resource.Description = input.Description;
            resource.DisplayName = input.DisplayName;
            resource.Enabled = input.Enabled;
            resource.Required = input.Required;

            return new UpdateIdentityResourceOutput();
        }
    }
}
