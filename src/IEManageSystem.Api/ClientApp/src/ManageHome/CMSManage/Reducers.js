import {
    NewPageSelectComponent, 
    NewPageAddComponent, 
    NewPageRemoveComponent, 
    NewPageEditComponent,
    PagesRequest,
    PagesReceive,
    PageNumRequest,
    PageNumReceive,
    PageAddRequest,
    PageAddReceive,
    PageDeleteRequest,
    PageDeleteReceive} from './Actions'


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

// 请求页面数据Reducer
function page(state = {
    pages:[],
    pageNum:0,
    pageIndex: 1,
    isFetch:false
}, action)
{
    switch(action.type){
        case PagesRequest:
            return {...state, ...{
                pageIndex: action.pageIndex,
                isFetch:true
            }};
        case PagesReceive:
            return {...state, ...{
                pages:action.data.value.pages,
                isFetch:false
            }};
        case PageNumRequest:
            return {...state, ...{
                isFetch:true
            }};
        case PageNumReceive:
            return {...state, ...{
                pageNum:action.data.value.pageNum,
                isFetch:false
            }};
        case PageAddRequest:
            return {...state, ...{
                isFetch:true
            }};
        case PageAddReceive:
            return {...state, ...{
                isFetch:false
            }};
        case PageDeleteRequest:
            return {...state, ...{
                isFetch:true
            }};
        case PageDeleteReceive:
            return {...state, ...{
                isFetch:false
            }};
        default:
            return state;
    }
}

// PageComponent={ sign=0, name="组件名", col, height, padding, childPageComponent }
export function reducer(state, action)
{
    state.cms = state.cms || {};

    let curState = state.cms;

    return Object.assign({}, state, 
    {
        cms: {
            newPageSelectedComponent: componentOperate(curState.newPageSelectedComponent, action),
            newPageComponents: newPageComponents(curState.newPageComponents, action),
            page:page(curState.page, action)
        }
    })
}