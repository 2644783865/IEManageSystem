import Container from './Container/Container.jsx'
import Text from './Text/Text.jsx'

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
    }

    getComponents(){
        return Components;
    }

    getComponentForName(name){
        return Components.find(item => item.name == name);
    }
}