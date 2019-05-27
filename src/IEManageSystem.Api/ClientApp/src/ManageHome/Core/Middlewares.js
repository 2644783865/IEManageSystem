export {Request, Error} from 'Core/Reducers/Actions'

export const fecth = store => next => action => 
{
    let result = next(action)

    if(action.isFetch == undefined){
        return result;
    }

    let state = store.getState();
    // 如果是发送请求
    if(action.isFetch == true)
    {
        state.fecth = {
            fecthSign: state.fecth.fecthSign + 1,
            isFecth: true
        }

        return result;
    }

    // 如果接收错误
    if(action.type == Error){
        state.fecth = {
            fecthSign: state.fecth.fecthSign + 1,
            isFecth: false,
            isSuccess: false,
            error: action.error,
            isAuthorize: true
        }

        return result;
    }

    // 接收成功
    state.fecth = {
        fecthSign: state.fecth.fecthSign + 1,
        isFecth: false,
        isSuccess: true,
        error: null,
        isAuthorize: true
    }
    
    return result
}