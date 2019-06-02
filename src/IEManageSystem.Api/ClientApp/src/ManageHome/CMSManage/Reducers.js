import {
    NewPageSelectComponent, 
    NewPageAddComponent, 
    NewPageRemoveComponent, 
    NewPageEditComponent,
    PagesReceive,
    PageAddReceive,
    PageDeleteReceive,
    PageUpdateReceive,
    PageComponentReceive} from './Actions'


function componentOperate(state = {}, action){
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
        case PageComponentReceive:
            return action.data.pageComponents
        default:
            return state;
    }
}

// 页面Reducer
function page(state = {
    pages:[],
    pageNum:0,
    pageIndex: 1,
    pagesDidInvalidate: false
}, action)
{
    switch(action.type){
        case PagesReceive:
            return {...state, ...{
                pages:action.data.pages,
                pageNum:action.data.pageNum,
                pagesDidInvalidate: false
            }};
        case PageAddReceive:
            return {...state, ...{
                pagesDidInvalidate: true,
            }};
        case PageDeleteReceive:
            return {...state, ...{
                pagesDidInvalidate: true,
            }};
        case PageUpdateReceive:
            return {...state, ...{
                pagesDidInvalidate: true,
            }};
        default:
            return state;
    }
}

// PageComponent={ sign=0, name="组件名", col, height, padding, pageComponents }
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