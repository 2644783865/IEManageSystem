class BaseModule
{
    constructor(){
        this.dependModules = [];
    }

    addDependModule(module){
        this.dependModules.push(module);
    }

    preInitialize(){
        this.dependModules.forEach(element => {
            element.preInitialize();
        });
    }

    initialize(){
        this.dependModules.forEach(element => {
            element.initialize();
        });
    }

    postInitialize(){
        this.dependModules.forEach(element => {
            element.postInitialize();
        });
    }
}

export default BaseModule;