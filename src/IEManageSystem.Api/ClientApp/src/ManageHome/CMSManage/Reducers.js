import {SelectComponent} from './Actions'

function selectedComponent(state, action){
    switch(action.type){
        case SelectComponent:
            return action.componentName
        default:
            return state;
    }
}

export function reducer(state, action)
{
    state.page = state.page || {};

    return Object.assign({}, state, 
    {
        page: {
            selectedComponent: selectedComponent(state.page.selectedComponent, action)
        }
    })
}