import MenuProvider from 'Core/Menu/MenuProvider'
import { TopLevelMenusSelect, SideMenuSelect } from 'Core/Actions'

let topLevelMenus = null;

function getTopLevelMenus(){
    topLevelMenus = new MenuProvider().getTopLevelMenus();

    return topLevelMenus;
}

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

export function reducer(state = {}, action)
{
    return Object.assign({}, state, 
    {
        topLevelMenus: topLevelMenus || getTopLevelMenus(),
        selectedTopMenu: selectedTopMenu(state.selectedTopMenu, action),
        selectedSideMenu: selectedSideMenu(state.selectedSideMenu, action)
    })
}