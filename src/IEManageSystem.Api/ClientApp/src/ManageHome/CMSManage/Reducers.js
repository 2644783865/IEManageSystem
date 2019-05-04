import {NewPageSelectComponent, NewPageAddComponent, NewPageRemoveComponent} from './Actions'


function componentOperate(state, action){
    switch(action.type){
        case NewPageSelectComponent:
            return action.componentName
        default:
            return state;
    }
}

function newPageComponents(state = [], action){
    switch(action.type){
        case NewPageAddComponent:
            return [...state, action.pageComponent]
        case NewPageRemoveComponent:
            return state.filter(item => item.sign != action.pageComponent.sign);
        default:
            return state;
    }
}

// PageComponent={ sign=0, name="组件名" }
export function reducer(state, action)
{
    state.page = state.page || {};

    return Object.assign({}, state, 
    {
        page: {
            newPageSelectedComponent: componentOperate(state.page.newPageSelectedComponent, action),
            newPageComponents: newPageComponents(state.page.newPageComponents, action)
        }
    })
}