using Abp.AspNetCore.Mvc.Extensions;
using Abp.Dependency;
using Castle.Core.Logging;
using IEManageSystem.Api.Models;
using IEManageSystem.Dtos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc.Formatters;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using System;
using System.Buffers;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IEManageSystem.Web.Filters
{
    public class IEResultFilter : IResultFilter, ITransientDependency
    {
        private readonly IServiceProvider _serviceProvider;
        public IEResultFilter(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        public void OnResultExecuting(ResultExecutingContext context)
        {
            if (!context.ActionDescriptor.IsControllerAction())
            {
                return;
            }

            // 对象结果
            if (context.Result is ObjectResult)
            {
                var objectResult = context.Result as ObjectResult;
                if (objectResult == null)
                {
                    throw new ArgumentException($"{nameof(context)} should be ObjectResult!");
                }

                var valueType = objectResult.Value.GetType();
                if (valueType.IsGenericType ? valueType.GetGenericTypeDefinition() != typeof(ApiResultDataModel<>) : valueType != typeof(ApiResultDataModel))
                {
                    objectResult.Value = new ApiResultDataModel(true, objectResult.Value);
                    if (!objectResult.Formatters.Any(f => f is JsonOutputFormatter))
                    {
                        objectResult.Formatters.Add(
                            new JsonOutputFormatter(
                                _serviceProvider.GetRequiredService<IOptions<MvcJsonOptions>>().Value.SerializerSettings,
                                _serviceProvider.GetRequiredService<ArrayPool<char>>()
                            )
                        );
                    }
                }
            }

            //  json结果
            if (context.Result is JsonResult)
            {
                var jsonResult = context.Result as JsonResult;
                if (jsonResult == null)
                {
                    throw new ArgumentException($"{nameof(context)} should be JsonResult!");
                }

                var valueType = jsonResult.Value.GetType();
                if (valueType.IsGenericType ? valueType.GetGenericTypeDefinition() != typeof(ApiResultDataModel<>) : valueType != typeof(ApiResultDataModel))
                {
                    jsonResult.Value = new ApiResultDataModel(true, jsonResult.Value);
                }
            }

            // 空结果
            if (context.Result is EmptyResult)
            {
                context.Result = new ObjectResult(new ApiResultDataModel(true));
            }
        }

        public void OnResultExecuted(ResultExecutedContext context)
        {
            // Can't add to headers here because response has already begun.
        }
    }
}
