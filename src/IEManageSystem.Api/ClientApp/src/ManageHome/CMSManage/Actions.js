import { createIEThunkAction } from 'Core/Reducers/Actions'

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

export const PagesReceive = "PagesReceive"
export function pagesFetch(pageIndex, pageSize, searchKey) {
  let postData = {
    pageIndex: pageIndex,
    pageSize: pageSize,
    searchKey: searchKey
  };

  return createIEThunkAction(
    "/api/PageManage/GetPages",
    postData,
    data => ({
      type: PagesReceive,
      data
    })
  );
}

export const PageAddReceive = "PageAddReceive"
export function pageAddFetch(resource) {
  let postData = resource;

  return createIEThunkAction(
    "/api/PageManage/AddContentPage",
    postData,
    data => ({
      type: PageAddReceive
    })
  );
}

export const PageDeleteReceive = "PageDeleteReceive"
export function pageDeleteFetch(resource) {
  let postData = {
    id: resource.id
  };

  return createIEThunkAction(
    "/api/PageManage/DeletePage",
    postData,
    data => ({
      type: PageDeleteReceive
    })
  );
}

export const PageUpdateReceive = "PageUpdateReceive"
export function pageUpdateFetch(resource) {
  let postData = resource;

  return createIEThunkAction(
    "/api/PageManage/UpdatePage",
    postData,
    data => ({
      type: PageUpdateReceive
    })
  );
}