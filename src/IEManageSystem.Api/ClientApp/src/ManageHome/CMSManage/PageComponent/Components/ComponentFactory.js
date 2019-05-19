import Container from './Container/Container.jsx'
import Text from './Text/Text.jsx'
import CitiesSlider from './CitiesSlider/CitiesSlider.jsx'
import Groupedcolumn from './Groupedcolumn/Groupedcolumn.jsx'
import Donut from './Donut/Donut.jsx'
import Clock from './Clock/Clock.jsx'

let Components = null;

export default class ComponentFactory{
    constructor(){
        if(Components == null){
            this.createComponents();
        }
    }

    createComponents(){
        Components = [];

        Components.push({component: Container, name:"Container"});
        Components.push({component: Text, name:"Text"});
        Components.push({component: CitiesSlider, name:"CitiesSlider"});
        Components.push({component: Groupedcolumn, name:"Groupedcolumn"});
        Components.push({component: Donut, name:"Donut"});
        Components.push({component: Clock, name:"Clock"});
    }

    getComponents(){
        return Components;
    }

    getComponentForName(name){
        return Components.find(item => item.name == name);
    }
}