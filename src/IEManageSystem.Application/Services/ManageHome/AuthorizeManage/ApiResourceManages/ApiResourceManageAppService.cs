using IdentityServer4.EntityFramework.Entities;
using IEManageSystem.IdentityServer.Entitys.ApiResources;
using IEManageSystem.IdentityServer.Repositories;
using IEManageSystem.Dtos.IdentityService;
using IEManageSystem.Services.ManageHome.AuthorizeManage.ApiResourceManages.Dto;
using IEManageSystem.Services.ManageHome.AuthorizeManage.IdentityResourceManages.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IEManageSystem.Services.ManageHome.AuthorizeManage.ApiResourceManages
{
    public class ApiResourceManageAppService: IApiResourceManageAppService
    {
        private IIEIdentityServerRepository<ApiResource> _apiResourceRepository { get; set; }

        private ApiResourceManager _apiResourceManager { get; set; }

        public ApiResourceManageAppService(
            IIEIdentityServerRepository<ApiResource> apiResourceRepository,
            ApiResourceManager apiResourceManager
            )
        {
            _apiResourceRepository = apiResourceRepository;

            _apiResourceManager = apiResourceManager;
        }

        /// <summary>
        /// 获取Api资源列表
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task<GetApiResourceOutput> GetApiResources(GetApiResourceInput input)
        {
            var includes = new System.Linq.Expressions.Expression<Func<ApiResource, object>>[] {
                    e=>e.UserClaims,
                };

            List<ApiResource> resources = FiltersResources(_apiResourceRepository.GetAllInclude(includes), input.SearchKey).OrderByDescending(e => e.Id).Skip((input.PageIndex - 1) * input.PageSize).Take(input.PageSize).ToList();

            List<ApiResourceDto> resourceDtos = new List<ApiResourceDto>();
            foreach (var item in resources) {
                ApiResourceDto apiResourceDto = new ApiResourceDto()
                {
                    Id = item.Id,
                    Name = item.Name,
                    DisplayName = item.DisplayName,
                    Description = item.Description,
                    Enabled = item.Enabled,
                    UserClaims = item.UserClaims.Select(e=>e.Type).ToList(),
                };

                resourceDtos.Add(apiResourceDto);
            }

            return new GetApiResourceOutput() { ApiResources = resourceDtos };
        }

        /// <summary>
        /// 获取Api资源数量
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task<GetApiResourceNumOutput> GetApiResourceNum(GetApiResourceNumInput input)
        {
            int resourceNum = FiltersResources(_apiResourceRepository.GetAll(), input.SearchKey).Count();

            return new GetApiResourceNumOutput() { ResourceNum = resourceNum };
        }

        public IEnumerable<ApiResource> FiltersResources(IEnumerable<ApiResource> apiResources, string searchKey)
        {
            if (!string.IsNullOrWhiteSpace(searchKey))
                apiResources = apiResources.Where(e =>
                (e.Name != null && e.Name.Contains(searchKey)) || 
                (e.DisplayName != null && e.DisplayName.Contains(searchKey))
                );

            return apiResources;
        }

        /// <summary>
        /// 添加资源
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task<AddApiResourceOutput> AddApiResource(AddApiResourceInput input)
        {
            var apiResource = _apiResourceManager.CreateApiResource(input.Name, input.UserClaims);
            apiResource.Description = input.Description;
            apiResource.DisplayName = input.DisplayName;
            apiResource.Enabled = input.Enabled;
            apiResource.Name = input.Name;

            _apiResourceManager.AddResource(apiResource);

            return new AddApiResourceOutput();
        }

        /// <summary>
        /// 删除Api资源
        /// </summary>
        /// <returns></returns>
        public async Task<DeleteApiResourceOutput> DeleteApiResource(DeleteApiResourceInput input)
        {
            ApiResource resource = _apiResourceRepository.FirstOrDefault(input.Id);
            if (resource == null) {
                return new DeleteApiResourceOutput() { ErrorMessage = "找不到Api资源" };
            }

            _apiResourceManager.RemoveApiResource(input.Id);
            return new DeleteApiResourceOutput();
        }

        /// <summary>
        /// 更新Api资源
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task<UpdateApiResourceOutput> UpdateApiResource(UpdateApiResourceInput input)
        {
            var includes = new System.Linq.Expressions.Expression<Func<ApiResource, object>>[] {
                    e=>e.UserClaims,
            };
            var apiResource = _apiResourceManager.GetApiResource(input.Id, includes);

            if (apiResource == null) {
                return new UpdateApiResourceOutput() { ErrorMessage = "找不到Api资源" };
            }

            _apiResourceManager.UpdateApiResourceClaims(apiResource, input.UserClaims);
            apiResource.Description = input.Description;
            apiResource.DisplayName = input.DisplayName;
            apiResource.Enabled = input.Enabled;

            return new UpdateApiResourceOutput();
        }
    }
}
