import BaseIERedux from './BaseIERedux'

class Redux extends BaseIERedux
{
    getReducer()
    {
        return (state = {}, action)=>
        {
            let newstate = state;

            this.ieRedux.forEach(item => {
                newstate = item.callReducer(newstate, action)
            })

            return newstate
        }
    }
}

export const RootRedux = new Redux();