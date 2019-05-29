import {
    NewPageSelectComponent, 
    NewPageAddComponent, 
    NewPageRemoveComponent, 
    NewPageEditComponent,
    PagesReceive,
    PageNumReceive,
    PageAddReceive,
    PageDeleteReceive} from './Actions'


function componentOperate(state, action){
    switch(action.type){
        case NewPageSelectComponent:
            return action.componentName
        default:
            return state;
    }
}

function Components(state = [], action){
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

// 页面Reducer
function page(state = {
    pages:[],
    pageNum:0,
    pageIndex: 1
}, action)
{
    switch(action.type){
        case PagesReceive:
            return {...state, ...{
                pages:action.data.pages
            }};
        case PageNumReceive:
            return {...state, ...{
                pageNum:action.data.pageNum
            }};
        case PageAddReceive:
            return state
        case PageDeleteReceive:
            return state
        default:
            return state;
    }
}

// PageComponent={ sign=0, name="组件名", col, height, padding, childPageComponent }
export function reducer(state = {
    PageComponent:{}
}, action)
{
    return Object.assign({}, state, 
    {
        PageComponent:{
            SelectedComponent: componentOperate(state.PageComponent.SelectedComponent, action),
            Components: Components(state.PageComponent.Components, action),
        },
        page:page(state.page, action)
    })
}