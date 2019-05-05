export const NewPageSelectComponent = 'NewPageSelectComponent'
export function newPageSelectComponent(componentName) 
{
  return {
    type: NewPageSelectComponent,
    componentName
  }
}

// PageComponent={ sign=0, name="组件名", col, height }
export const NewPageAddComponent = 'NewPageAddComponent'
export function newPageAddComponent(pageComponent) 
{
  return {
    type: NewPageAddComponent,
    pageComponent
  }
}

export const NewPageRemoveComponent = 'NewPageRemoveComponent'
export function newPageRemoveComponent(pageComponent) 
{
  return {
    type: NewPageRemoveComponent,
    pageComponent
  }
}

export const NewPageEditComponent = "NewPageEditComponent"
export function newPageEditComponent(pageComponent) 
{
  return {
    type: NewPageEditComponent,
    pageComponent
  }
}