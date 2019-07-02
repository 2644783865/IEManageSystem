import Container from './Container/Container.jsx'
import Text from './Text/Text.jsx'
import CitiesSlider from './CitiesSlider/CitiesSlider.jsx'
import Groupedcolumn from './Groupedcolumn/Groupedcolumn.jsx'
import Donut from './Donut/Donut.jsx'
import Clock from './Clock/Clock.jsx'

let Components = null;

export const componentType = {
    container: "container",
    text: "text",
    graph: "graph"
}

export const componentTypes = [
    { name: componentType.container, text: "容器组件", icon: "oi-box" },
    { name: componentType.text, text: "文本组件", icon: "oi-text" },
    { name: componentType.graph, text: "图表组件", icon: "oi-graph" }
];

export default class ComponentFactory {
    constructor() {
        if (Components == null) {
            this.createComponents();
        }
    }

    createComponents() {
        Components = [];

        Components.push({ component: Container, name: "Container", componentType: componentType.container });
        Components.push({ component: Text, name: "Text", componentType: componentType.text });
        Components.push({ component: CitiesSlider, name: "CitiesSlider" });
        Components.push({ component: Groupedcolumn, name: "Groupedcolumn", componentType: componentType.graph });
        Components.push({ component: Donut, name: "Donut", componentType: componentType.graph });
        Components.push({ component: Clock, name: "Clock", componentType: componentType.graph });
    }

    getComponents() {
        return [...Components];
    }

    getComponentForName(name) {
        return Components.find(item => item.name == name);
    }
}