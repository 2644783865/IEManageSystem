const reducers = [];

export default class ReducerProvider{
    register(Reducer){
        reducers.push(Reducer);
    }

    getRootReducer(){
        return (state = {}, action)=>{
            let newstate = state;

            reducers.forEach(item => {
                newstate = item(newstate, action)
            })

            return newstate;
        }
    }
}