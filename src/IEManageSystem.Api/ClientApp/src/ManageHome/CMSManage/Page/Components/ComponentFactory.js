import Container from './Container/Container.jsx'
import Text from './Text/Text.jsx'
import CitiesSlider from './CitiesSlider/CitiesSlider.jsx'

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
    }

    getComponents(){
        return Components;
    }

    getComponentForName(name){
        return Components.find(item => item.name == name);
    }
}