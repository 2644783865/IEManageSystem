export const SelectComponent = 'SelectComponent'
export function selectComponent(componentName) 
{
  return {
    type: SelectComponent,
    componentName
  }
}
