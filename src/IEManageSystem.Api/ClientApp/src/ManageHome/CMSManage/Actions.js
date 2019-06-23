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

export const ContentPageAddReceive = "ContentPageAddReceive"
export function contentPageAddFetch(resource) {
  let postData = resource;

  return createIEThunkAction(
    "/api/PageManage/AddContentPage",
    postData,
    data => ({
      type: ContentPageAddReceive
    })
  );
}

export const StaticPageAddReceive = "StaticPageAddReceive"
export function staticPageAddFetch(resource) {
  let postData = resource;

  return createIEThunkAction(
    "/api/PageManage/AddStaticPage",
    postData,
    data => ({
      type: StaticPageAddReceive
    })
  );
}

export const PageDeleteReceive = "PageDeleteReceive"
export function pageDeleteFetch(resource) {
  let postData = {
    name: resource.name
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
export function pageComponentFetch(name){
  let postData = {
    name: name
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
export function pageComponentUpdateFetch(name, components) {
  let postData = {
    name: name,
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
export function pageDatasFetch(pageIndex, pageSize, searchKey, pageName){
  let postData = {
    pageIndex: pageIndex,
    pageSize: pageSize,
    searchKey: searchKey,
    pageName: pageName
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
export function pageDataAddFetch(resource, pageName)
{
  let postData = {...resource, ...{
    pageName:pageName
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
export function pageDataUpdateFetch(resource, pageName){
  let postData = {...resource, ...{
    pageName:pageName
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
export function pageDataDeleteFetch(resource, pageName){
  let postData = {
    name: resource.name,
    pageName: pageName
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
export function componentDatasFetch(pageName, pageDataName){
  let postData = {
    pageName: pageName,
    pageDataName: pageDataName
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
export function componentDataUpdateFetch(pageName, pageDataName, componentDatas)
{
  let postData = {
    pageName: pageName,
    pageDataName: pageDataName,
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

export const ComponentDataUpdate = "ComponentDataUpdate"
export function componentDataUpdate(resource)
{
  return {
    type: ComponentDataUpdate,
    resource
  }
}