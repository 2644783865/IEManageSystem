using Abp.AspNetCore.Configuration;
using Abp.AspNetCore.Mvc.Extensions;
using Abp.Dependency;
using IEManageSystem.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace IEManageSystem.Web.Filters
{
    public class IEValidationActionFilter : IAsyncActionFilter, ITransientDependency
    {
        private readonly IIocResolver _iocResolver;
        private readonly IAbpAspNetCoreConfiguration _configuration;

        public IEValidationActionFilter(IIocResolver iocResolver, IAbpAspNetCoreConfiguration configuration)
        {
            _iocResolver = iocResolver;
            _configuration = configuration;
        }

        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            Dictionary<string, string> errors = null;
            foreach (var item in context.ActionArguments)
            {
                if (ValidateModel(item.Value, out errors) == false)
                {
                    context.Result = new JsonResult(new ApiResultDataModel(errors));
                    return;
                }
            }

            await next();
        }

        /// <summary>
        /// 反射验证模型
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="t"></param>
        /// <returns></returns>
        protected bool ValidateModel(object t, out Dictionary<string, string> errors)
        {
            errors = new Dictionary<string, string>();

            ValidationContext context = new ValidationContext(t);
            List<ValidationResult> results = new List<ValidationResult>();
            bool isValid = Validator.TryValidateObject(t, context, results, true);
            if (isValid == true)
            {
                return true;
            }

            foreach (var item in results)
            {
                foreach (var itemchild in item.MemberNames)
                {
                    if (!errors.ContainsKey(itemchild))
                        errors.Add(itemchild, item.ErrorMessage);
                }
            }

            return false;
        }
    }
}
