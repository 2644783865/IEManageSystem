using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.Application.Navigation;
using IEManageSystem.ApiAuthorization;
using IEManageSystem.ApiAuthorization.Authorizations;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace IEManageSystem.Web.Controllers
{
    public class ManageHomeController : IEManageSystemControllerBase
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}