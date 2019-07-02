using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Abp.Domain.Repositories;
using IEManageSystem.CMS.DomainModel.Menus;
using IEManageSystem.Dtos.CMS;
using IEManageSystem.Help.Exceptions;
using IEManageSystem.Services.Home.Menus.Dto;

namespace IEManageSystem.Services.Home.Menus
{
    public class MenuAppService : IEManageSystemAppServiceBase, IMenuAppService
    {
        private MenuManager _menuManager { get; set; }

        private IRepository<MenuBase> _menuRepository => _menuManager.MenuRepository;

        public MenuAppService(
            MenuManager menuManager)
        {
            _menuManager = menuManager;
        }

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
            CompositeMenu compositeMenu = (CompositeMenu)menu;

            if (compositeMenu.Menus == null)
            {
                return returnMenu;
            }

            foreach (var childMenu in compositeMenu.Menus)
            {
                returnMenu.Menus.Add(CreateMenuDto(childMenu));
            }

            return returnMenu;
        }
    }
}
