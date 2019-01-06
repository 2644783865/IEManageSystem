using System.Threading.Tasks;
using IEManageSystem.Web.Controllers;
using Shouldly;
using Xunit;

namespace IEManageSystem.Web.Tests.Controllers
{
    public class HomeController_Tests: IEManageSystemWebTestBase
    {
        [Fact]
        public async Task Index_Test()
        {
            //Act
            var response = await GetResponseAsStringAsync(
                GetUrl<HomeController>(nameof(HomeController.Index))
            );

            //Assert
            response.ShouldNotBeNullOrEmpty();
        }
    }
}
