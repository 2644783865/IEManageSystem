class BaseModule
{
    constructor(){
        this.reducer = (state, action)=>state;
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