import Container from './Container/Container.jsx'
import Text from './Text/Text.jsx'
import CitiesSlider from './CitiesSlider/CitiesSlider.jsx'
import Groupedcolumn from './Groupedcolumn/Groupedcolumn.jsx'
import Donut from './Donut/Donut.jsx'
import Clock from './Clock/Clock.jsx'

let Components = null;

export const componentType = {
    container: "container",
    text: "text"
}

export const componentTypes = [
    { name: componentType.container, text: "容器组件" },
    { name: componentType.text, text: "文本组件" }
];

export default class ComponentFactory{
    constructor(){
        if(Components == null){
            this.createComponents();
        }
    }

    createComponents(){
        Components = [];

        Components.push({component: Container, name:"Container", componentType: componentType.container});
        Components.push({component: Text, name:"Text", componentType: componentType.text});
        Components.push({component: CitiesSlider, name:"CitiesSlider", componentType: componentType.text});
        Components.push({component: Groupedcolumn, name:"Groupedcolumn", componentType: componentType.text});
        Components.push({component: Donut, name:"Donut", componentType: componentType.text});
        Components.push({component: Clock, name:"Clock", componentType: componentType.text});
    }

    getComponents(){
        return [...Components];
    }

    getComponentForName(name){
        return Components.find(item => item.name == name);
    }
}