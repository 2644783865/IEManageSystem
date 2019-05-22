import {request,receive} from 'Core/Reducers/Actions'

export const NewPageSelectComponent = 'NewPageSelectComponent'
export function newPageSelectComponent(componentName) {
  return {
    type: NewPageSelectComponent,
    componentName
  }
}

// PageComponent={ sign=0, name="组件名", col, height }
export const NewPageAddComponent = 'NewPageAddComponent'
export function newPageAddComponent(pageComponent) {
  return {
    type: NewPageAddComponent,
    pageComponent
  }
}

export const NewPageRemoveComponent = 'NewPageRemoveComponent'
export function newPageRemoveComponent(pageComponent) {
  return {
    type: NewPageRemoveComponent,
    pageComponent
  }
}

export const NewPageEditComponent = "NewPageEditComponent"
export function newPageEditComponent(pageComponent) {
  return {
    type: NewPageEditComponent,
    pageComponent
  }
}

export const PagesRequest = "PagesRequest"
function pagesRequest(pageIndex, pageSize, searchKey) {
  return request({
    type: PagesRequest,
    pageIndex,
    pageSize,
    searchKey
  })
}

export const PagesReceive = "PagesReceive"
function pagesReceive(data) {
  return receive({
    type: PagesReceive,
    data
  })
}

// 请求页面数据action
export function pagesFetch(pageIndex, pageSize, searchKey) {
  return function (dispatch) {
    dispatch(pagesRequest(pageIndex, pageSize, searchKey));

    let postData = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      searchKey: searchKey
    };

    return fetch("/api/PageManage/GetPages", {
      method: 'post',
      type: "json",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    }).then(
      response => {
        if(response.status == 404){
          return null;
        }
        return response.json()
      },
      error => dispatch(pagesReceive(error))
    ).then(
      data => dispatch(pagesReceive(data))	// dispatch 响应动作
    )
  }
}

export const PageNumRequest = "PageNumRequest"
function pageNumRequest(searchKey){
  return request({
    type: PageNumRequest,
    searchKey
  })
}

export const PageNumReceive = "PageNumReceive"
function pageNumReceive(data){
  return receive({
    type: PageNumReceive,
    data
  })
}

export function pageNumFetch(searchKey){
  return function (dispatch) {
    dispatch(pageNumRequest(searchKey));

    let postData = {
      searchKey: searchKey
    };

    return fetch("/api/PageManage/GetPageNum", {
      method: 'post',
      type: "json",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    }).then(
      response => {
        if(response.status == 404){
          return null;
        }
        return response.json()
      },
      error => dispatch(pageNumReceive(error))
    ).then(
      data => dispatch(pageNumReceive(data))	// dispatch 响应动作
    )
  }
}

export const PageAddRequest = "PageAddRequest"
function pageAddRequest(resource){
  return request({
    type: PageAddRequest,
    resource
  })
}

export const PageAddReceive = "PageAddReceive"
function pageAddReceive(data){
  return receive({
    type: PageAddReceive
  })
}

export function pageAddFetch(resource){
  return function (dispatch) {
    dispatch(pageAddRequest(resource));

    let postData = resource;

    return fetch("/api/PageManage/AddContentPage", {
      method: 'post',
      type: "json",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    }).then(
      response => {
        if(response.status == 404){
          return null;
        }
        return response.json()
      },
      error => dispatch(pageAddReceive(error))
    ).then(
      data => dispatch(pageAddReceive(data))	// dispatch 响应动作
    )
  }
}

export const PageDeleteRequest = "PageDeleteRequest"
function pageDeleteRequest(resource){
  return request({
    type: PageDeleteRequest,
    resource
  })
}

export const PageDeleteReceive = "PageDeleteReceive"
function pageDeleteReceive(data){
  return receive({
    type: PageDeleteReceive
  })
}

export function pageDeleteFetch(resource){
  return function (dispatch) {
    dispatch(pageDeleteRequest(resource));

    let postData = {
      id: resource.id
    };

    return fetch("/api/PageManage/DeleteContentPage", {
      method: 'post',
      type: "json",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    }).then(
      response => {
        if(response.status == 404){
          return null;
        }
        return response.json()
      },
      error => dispatch(pageDeleteReceive(error))
    ).then(
      data => dispatch(pageDeleteReceive(data))	// dispatch 响应动作
    )
  }
}