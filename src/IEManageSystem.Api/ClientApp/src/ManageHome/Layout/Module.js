import BaseModule from 'Core/Modules/BaseModule'
import ModuleFactory from 'Core/Modules/ModuleFactory'

import 'Core/Module'
import 'Personal/Module'
import 'AuthorizeManage/Module'
import 'OAuthManage/Module'
import 'CMSManage/Module'

import { reducer } from './Reducers'
import {LayoutRedux} from './LayoutRedux'
import {RootRedux} from 'Core/IEReduxs/RootRedux'

class Module extends BaseModule
{
    initialize(){
        LayoutRedux.setReducer(reducer);
        RootRedux.register(LayoutRedux);
    }
}

new ModuleFactory().register(new Module(), "LayoutModule", [
    "AuthorizeManageModule",
    "CMSManageModule",
    "OAuthManageModule",
    "PersonalModule",
    "CoreModule"
]);