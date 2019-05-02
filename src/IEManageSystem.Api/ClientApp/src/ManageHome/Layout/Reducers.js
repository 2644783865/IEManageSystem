import MenuProvider from './MenuProvider'
import { TopLevelMenusSelect, SideMenuSelect } from './Actions'

const topLevelMenus = new MenuProvider().getTopLevelMenus();

function selectedTopMenu(state = topLevelMenus[0], action) 
{
    switch (action.type) 
    {
        case TopLevelMenusSelect:
            return action.menu
        default:
            return state
    }
}

function selectedSideMenu(state = null, action){
    switch(action.type){
        case SideMenuSelect:
            return action.menu
        default:
            return state;
    }
}

export function app(state = {}, action)
{
    return Object.assign({}, state, 
    {
        topLevelMenus: topLevelMenus,
        selectedTopMenu: selectedTopMenu(state.selectedTopMenu, action),
        selectedSideMenu: selectedSideMenu(state.selectedSideMenu, action)
    })
}