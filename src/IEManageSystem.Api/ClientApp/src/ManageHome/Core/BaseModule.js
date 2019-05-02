class BaseModule
{
    constructor(){
        this.reducer = (state, action)=>state;
        this.dependModules = [];
    }

    setReducer(reducer){
        this.reducer = reducer;
    }

    getReducer()
    {
        let dependReducers = this.dependModules.map(item => item.getReducer());

        let dependReducer = (state, action) => {
            let newState = {};
            dependReducers.map((item, index)=> {
                newState = {...newState, ...{ index: item(state[index], action)}};
            });
        };

        let reducer = this.reducer;

        return (state = {}, action)=>{
            return {...reducer(state, action), ...dependReducer(state, action)}
        }
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