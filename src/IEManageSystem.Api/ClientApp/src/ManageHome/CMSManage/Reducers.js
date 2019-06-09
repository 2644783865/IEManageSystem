import {
    NewPageSelectComponent, 
    NewPageAddComponent, 
    NewPageRemoveComponent, 
    NewPageEditComponent,
    PagesReceive,
    PageAddReceive,
    PageDeleteReceive,
    PageUpdateReceive,
    PageComponentReceive,
    PageDatasReceive,
    PageDataAddReceive,
    PageDataUpdateReceive,
    PageDataDeleteReceive,
    ComponentDatasReceive,
    ComponentDataUpdateReceive} from './Actions'


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

function pageData(state = {
    pageDatas:[],
    pageDataNum: 0,
    pageDataIndex: 1,
    pageDatasDidInvalidate: false
}, action){
    switch(action.type)
    {
        case PageDatasReceive:
            return {...state, ...{
                pageDatas: action.data.pageDatas,
                pageDataNum: action.data.pageDataNum,
                pageDatasDidInvalidate: false
            }}
        case PageDataAddReceive:
            return {...state, ...{
                pageDatasDidInvalidate: true
            }}
        case PageDataUpdateReceive:
            return {...state, ...{
                pageDatasDidInvalidate: true
            }}
        case PageDataDeleteReceive:
            return {...state, ...{
                pageDatasDidInvalidate: true
            }}
        default:
            return state;
    }
}

function componentData(state = {
    componentDatas:[],
    componentDatasDidInvalidate: false
}, action){
    switch(action.type)
    {
        case ComponentDatasReceive:
            return {...state, ...{
                componentDatas: action.data.componentDatas,
                componentDatasDidInvalidate: false
            }}
        case ComponentDataUpdateReceive:
            return {...state, ...{
                componentDatasDidInvalidate: true
            }}
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
        page:page(state.page, action),
        pageData:pageData(state.pageData, action),
        componentData: componentData(state.componentData, action)
    })
}