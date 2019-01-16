using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using Abp.Domain.Services;

namespace IEManageSystem.ApiAuthorization.DomainModel
{
    public class ApiSingleManager: IDomainService
    {
        private static List<ApiSingle> _apiSingles { get; set; } = new List<ApiSingle>();

        public static void Register(string controllerName)
        {
            if (_apiSingles.Where(e => e.Name == controllerName).Any()) {
                throw new Exception("Api[" + controllerName + "]重复注册");
            }

            ApiSingle apiSingle = new ApiSingle(controllerName);

            _apiSingles.Add(apiSingle);
        }

        public ApiSingleManager() {
        }

        public List<ApiSingle> GetApiSingles() => _apiSingles.ToList();

        public ApiSingle GetApiSingleForControllerName(string controllerName)
        {
            return _apiSingles.FirstOrDefault(e => e.Name == controllerName);
        }
    }
}
