using Abp.AspNetCore.Configuration;
using Abp.AspNetCore.Mvc.Extensions;
using Abp.Authorization;
using Abp.Dependency;
using Abp.Domain.Entities;
using Abp.Events.Bus;
using Abp.Events.Bus.Exceptions;
using Abp.Runtime.Validation;
using Abp.Web.Models;
using Castle.Core.Logging;
using IEManageSystem.Api.Models;
using IEManageSystem.ApiAuthorization.Exceptions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace IEManageSystem.Web.Filters
{
    public class IEExceptionFilter : IExceptionFilter, ITransientDependency
    {
        public ILogger Logger { get; set; }

        public IEventBus EventBus { get; set; }

        private readonly IErrorInfoBuilder _errorInfoBuilder;
        private readonly IAbpAspNetCoreConfiguration _configuration;

        public IEExceptionFilter(IErrorInfoBuilder errorInfoBuilder, IAbpAspNetCoreConfiguration configuration)
        {
            _errorInfoBuilder = errorInfoBuilder;
            _configuration = configuration;

            Logger = NullLogger.Instance;
            EventBus = NullEventBus.Instance;
        }

        public void OnException(ExceptionContext context)
        {
            if (!context.ActionDescriptor.IsControllerAction())
            {
                return;
            }

            Logger.Error(context.Exception.Message);

            HandleAndWrapException(context);
        }

        protected virtual void HandleAndWrapException(ExceptionContext context)
        {
            context.Result = new ObjectResult(
                new ApiResultDataModel(false) { Message = context.Exception.Message }
            );

            EventBus.Trigger(this, new AbpHandledExceptionData(context.Exception));

            context.Exception = null; //Handled!
        }

        protected virtual IActionResult HandleException(ExceptionContext context)
        {
            if (context.Exception is UnauthorizedException)
            {
                return new ObjectResult(
                    new ApiResultDataModel(false) { Message = context.Exception.Message }
                );
            }

            return new ObjectResult(
                new ApiResultDataModel(false) { Message = context.Exception.Message }
            );
        }

        /// <summary>
        /// 暂时不用
        /// </summary>
        /// <param name="context"></param>
        /// <param name="wrapOnError"></param>
        /// <returns></returns>
        protected virtual int GetStatusCode(ExceptionContext context)
        {
            if (context.Exception is AbpAuthorizationException)
            {
                return context.HttpContext.User.Identity.IsAuthenticated
                    ? (int)HttpStatusCode.Forbidden
                    : (int)HttpStatusCode.Unauthorized;
            }

            if (context.Exception is AbpValidationException)
            {
                return (int)HttpStatusCode.BadRequest;
            }

            if (context.Exception is EntityNotFoundException)
            {
                return (int)HttpStatusCode.NotFound;
            }

            return context.HttpContext.Response.StatusCode;
        }
    }
}
