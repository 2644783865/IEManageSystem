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

export const PageComponentReceive = "PageComponentReceive"
export function pageComponentFetch(id){
  let postData = {
    id: id
  };

  return createIEThunkAction(
    "/api/PageManage/GetPageComponent",
    postData,
    data => ({
      type: PageComponentReceive,
      data
    })
  );
}

export const PageComponentUpdateReceive = "PageComponentUpdateReceive"
export function pageComponentUpdateFetch(id, components) {
  let postData = {
    id: id,
    pageComponents: components
  };

  return createIEThunkAction(
    "/api/PageManage/UpdatePageComponent",
    postData,
    data => ({
      type: PageComponentUpdateReceive
    })
  );
}

export const PageDatasReceive = "PageDatasReceive"
export function pageDatasFetch(pageIndex, pageSize, searchKey, pageId){
  let postData = {
    pageIndex: pageIndex,
    pageSize: pageSize,
    searchKey: searchKey,
    pageId: pageId
  };

  return createIEThunkAction(
    "/api/PageManage/GetPageDatas",
    postData,
    data => ({
      type: PageDatasReceive,
      data
    })
  );
}

export const PageDataAddReceive = "PageDataAddReceive"
export function pageDataAddFetch(resource, pageId)
{
  let postData = {...resource, ...{
    pageId:pageId
  }};

  return createIEThunkAction(
    "/api/PageManage/AddPageData",
    postData,
    data => ({
      type: PageDataAddReceive,
      data
    })
  );
}

export const PageDataUpdateReceive = "PageDataUpdateReceive"
export function pageDataUpdateFetch(resource, pageId){
  let postData = {...resource, ...{
    pageId:pageId
  }};

  return createIEThunkAction(
    "/api/PageManage/UpdatePageData",
    postData,
    data => ({
      type: PageDataUpdateReceive,
      data
    })
  );
}


export const PageDataDeleteReceive = "PageDataDeleteReceive"
export function pageDataDeleteFetch(resource, pageId){
  let postData = {
    id: resource.id,
    pageId: pageId
  };

  return createIEThunkAction(
    "/api/PageManage/DeletePageData",
    postData,
    data => ({
      type: PageDataDeleteReceive,
      data
    })
  );
}

export const ComponentDatasReceive = "ComponentDatasReceive"
export function componentDatasFetch(pageId, pageDataId){
  let postData = {
    pageId: pageId,
    pageDataId: pageDataId
  };

  return createIEThunkAction(
    "/api/PageManage/GetComponentDatas",
    postData,
    data => ({
      type: ComponentDatasReceive,
      data
    })
  );
}

export const ComponentDataUpdateReceive = "ComponentDataUpdateReceive"
export function componentDataUpdateFetch(pageId, pageDataId, componentDatas)
{
  let postData = {
    pageId: pageId,
    pageDataId: pageDataId,
    componentDatas: componentDatas
  };

  return createIEThunkAction(
    "/api/PageManage/UpdateComponentData",
    postData,
    data => ({
      type: ComponentDataUpdateReceive,
      data
    })
  );
}