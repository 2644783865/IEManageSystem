import BaseIERedux from 'Core/IEReduxs/BaseIERedux'

class Redux extends BaseIERedux
{
    getStateType(){
        return "layout";
    }
}

export const LayoutRedux = new Redux();

