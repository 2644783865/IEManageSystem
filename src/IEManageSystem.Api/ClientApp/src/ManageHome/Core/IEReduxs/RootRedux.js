import BaseIERedux from './BaseIERedux'

export default RootRedux = new RootRedux();

class RootRedux extends BaseIERedux
{
    getReducer()
    {
        return (state = {}, action)=>
        {
            let newstate = {};

            this.ieRedux.forEach(item => {
                newstate = {...newstate, ...item.reducer(state, action)}
            })

            return newstate
        }
    }
}