import { Request, ErrorAction, ClearError } from 'Core/Reducers/Actions'

export const fecth = store => next => action => {
    if (action.isFetch != undefined) {
        let state = store.getState();
        // 如果是发送请求
        if (action.type == Request) {
            state.fecth = {
                fecthSign: state.fecth.fecthSign + 1,
                isFecth: true,
                isSuccess: true,
                error: null,
                isAuthorize: true
            }
        }
        else if (action.type == ErrorAction) {
            state.fecth = {
                fecthSign: state.fecth.fecthSign + 1,
                isFecth: false,
                isSuccess: false,
                error: action.error,
                isAuthorize: true
            }
        }
        else if(action.type == ClearError){
            state.fecth = {
                fecthSign: state.fecth.fecthSign + 1,
                isFecth: false,
                isSuccess: true,
                error: null,
                isAuthorize: true
            }
        }
        else{
            state.fecth = {
                fecthSign: state.fecth.fecthSign + 1,
                isFecth: false,
                isSuccess: true,
                error: null,
                isAuthorize: true
            }
        }
    }

    let result = next(action)

    return result
}