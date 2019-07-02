using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Abp.Domain.Repositories;
using IEManageSystem.ApiAuthorization;
using IEManageSystem.CMS.DomainModel.Menus;
using IEManageSystem.Dtos.CMS;
using IEManageSystem.Help.Exceptions;
using IEManageSystem.Help.IEApiScopeHelp;
using IEManageSystem.Services.ManageHome.CMS.Menus.Dto;

namespace IEManageSystem.Services.ManageHome.CMS.Menus
{
    [ApiAuthorization(IEApiScopeProvider.Menu)]
    public class MenuManageAppService : IEManageSystemAppServiceBase, IMenuManageAppService
    {
        private MenuManager _menuManager { get; set; }

        private IRepository<MenuBase> _menuRepository => _menuManager.MenuRepository;

        public MenuManageAppService(
            MenuManager menuManager)
        {
            _menuManager = menuManager;
        }

        [ApiAuthorizationQuery]
        public GetMenusOutput GetMenus(GetMenusInput input)
        {
            List<MenuBase> menus = _menuRepository.GetAllList();

            List<MenuBase> rootMenus = menus.Where(e => e.CompositeMenuId == null).ToList();

            List<MenuDto> results = new List<MenuDto>();

            foreach (MenuBase menu in rootMenus)
            {
                results.Add(CreateMenuDto(menu));
            }

            return new GetMenusOutput() { Menus = results };
        }

        private MenuDto CreateMenuDto(MenuBase menu)
        {
            MenuDto returnMenu = new MenuDto();

            returnMenu.Id = menu.Id;
            returnMenu.Name = menu.Name;
            returnMenu.DisplayName = menu.DisplayName;
            returnMenu.Icon = menu.Icon;

            if (menu is LeafMenu)
            {
                return returnMenu;
            }

            if (!(menu is CompositeMenu))
            {
                throw new MessageException("菜单转换异常");
            }

            returnMenu.Menus = new List<MenuDto>();
            CompositeMenu compositeMenu = (CompositeMenu) menu;

            if (compositeMenu.Menus == null) {
                return returnMenu;
            }

            foreach (var childMenu in compositeMenu.Menus)
            {
                returnMenu.Menus.Add(CreateMenuDto(childMenu));
            }

            return returnMenu;
        }

        public AddLeafMenuOutput AddLeafMenu(AddLeafMenuInput input)
        {
            LeafMenu leafMenu = new LeafMenu(input.Name)
            {
                CompositeMenuId = input.ParentMenuId,
                DisplayName = input.DisplayName,
                Icon = input.Icon
            };

            _menuManager.AddLeafMenu(leafMenu);

            return new AddLeafMenuOutput();
        }

        public AddCompositeMenuOutput AddCompositeMenu(AddCompositeMenuInput input)
        {
            CompositeMenu compositeMenu = new CompositeMenu(input.Name)
            {
                CompositeMenuId = input.ParentMenuId,
                DisplayName = input.DisplayName,
                Icon = input.Icon
            };

            _menuManager.AddCompositeMenu(compositeMenu);

            return new AddCompositeMenuOutput();
        }

        public RemoveMenuOutput RemoveMenu(RemoveMenuInput input)
        {
            _menuManager.RemoveMenu(input.Id);

            return new RemoveMenuOutput();
        }

        public UpdateMenuOutput UpdateMenu(UpdateMenuInput input)
        {
            var menu = _menuRepository.FirstOrDefault(input.Id);

            if (!string.IsNullOrEmpty(input.Name))
            {
                _menuManager.UpdateName(menu, input.Name);
            }

            if (!string.IsNullOrEmpty(input.DisplayName))
            {
                menu.DisplayName = input.DisplayName;
            }

            if (!string.IsNullOrEmpty(input.Icon))
            {
                menu.Icon = input.Icon;
            }

            return new UpdateMenuOutput();
        }
    }
}
