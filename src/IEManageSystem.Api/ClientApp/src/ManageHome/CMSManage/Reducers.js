import {
    NewPageSelectComponent, 
    NewPageAddComponent, 
    NewPageRemoveComponent, 
    NewPageEditComponent} from './Actions'


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
        case NewPageEditComponent:
            let newState = state.map(item => {
                if(item.sign == action.pageComponent.sign){
                    return action.pageComponent;
                }
                return item;
            })
            return newState
        default:
            return state;
    }
}

// PageComponent={ sign=0, name="组件名", col, height, padding, childPageComponent }
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