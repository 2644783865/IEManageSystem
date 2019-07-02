import BaseIERedux from 'Core/IEReduxs/BaseIERedux'

class Redux extends BaseIERedux
{
    getStateType(){
        return "cms";
    }
}

export const CmsRedux = new Redux();