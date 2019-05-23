import ErrorModal from 'ErrorModal/ErrorModal.jsx';
import LoadingModal from 'LoadingModal/LoadingModal.jsx';

var fecthSign = 0;

export const fecth = store => next => action => 
{
    if(action.isFetch == true)
    {
        fecthSign++;
        if(fecthSign > 0){
        }
    }

    if(action.isFetch == false)
    {
        fecthSign--;
        if(fecthSign == 0){
        }
    }
    
    let result = next(action)
    return result
}