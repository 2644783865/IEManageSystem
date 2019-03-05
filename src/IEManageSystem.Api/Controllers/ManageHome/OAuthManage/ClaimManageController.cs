using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IEManageSystem.Api.Models;
using IEManageSystem.JwtAuthentication.DomainModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace IEManageSystem.Api.Controllers.ManageHome.OAuthManage
{
    [Route("api/[controller]/[action]")]
    public class ClaimManageController : IEManageSystemControllerBase
    {
        private ClaimManager _claimManager { get; set; }

        public ClaimManageController(
            ClaimManager claimManager
            )
        {
            _claimManager = claimManager;
        }

        /// <summary>
        /// 获取站点Claim类型
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult<ApiResultDataModel>> GetWebClaimTypes()
        {
            if (ValidateModel() == false)
            {
                return new ApiResultDataModel(_ValidateModelErrors);
            }

            return new ApiResultDataModel()
            {
                IsSuccess = true,
                Value = _claimManager.GetIssueClaims(),
            };
        }
    }
}