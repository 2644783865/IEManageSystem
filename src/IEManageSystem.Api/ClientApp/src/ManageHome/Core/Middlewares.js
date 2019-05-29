import { Request, ErrorAction } from 'Core/Reducers/Actions'

export const fecth = store => next => action => {
    if (action.isFetch != undefined) {
        let state = store.getState();
        // 如果是发送请求
        if (action.isFetch == true) {
            state.fecth = {
                fecthSign: state.fecth.fecthSign + 1,
                isFecth: true
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