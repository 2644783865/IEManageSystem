import { connect } from 'react-redux'

export default class BaseIERedux
{
    constructor(){
        this.reducer = (state, action)=>{ return state }
        this.ieRedux = [];
    }

    getStateType(){
        return undefined;
    }


    setReducer(reducer){
        this.reducer = reducer;
    }

    connect(
        mapStateToProps,
        mapDispatchToProps,
        mergeProps,
        options)
    {
        let stateType = this.getStateType();
        if(!stateType){
            throw "未实现getStateType方法";
        }

        let ieMapStateToProps = (state, ownProps) => mapStateToProps(state[stateType], ownProps);
        let ieMapDispatchToProps = (dispatch, ownProps) => 
        {
            let iedispatch = (action)=>{
                dispatch({...action, ...{stateType: stateType}});
            }
            mapDispatchToProps(iedispatch, ownProps)
        }
        
        connect(ieMapStateToProps, ieMapDispatchToProps, mergeProps, options)
    }

    register(baseIERedux){
        this.ieRedux.push(baseIERedux);
    }

    reducer(state, action)
    {
        let stateType = this.getStateType();
        if(!stateType){
            throw "未实现getStateType方法";
        }

        return {...state, ...{
            [stateType]: this.reducer(state[stateType], action)
        }}
    }

    getReducer()
    {
        let stateType = this.getStateType();
        if(!stateType){
            throw "未实现getStateType方法";
        }

        return (state = {}, action)=>
        {
            let newstate = {};

            this.ieRedux.forEach(item => {
                newstate = {...newstate, ...item.reducer(state, action)}
            })

            return {
                [stateType]:newstate
            }
        }
    }
}