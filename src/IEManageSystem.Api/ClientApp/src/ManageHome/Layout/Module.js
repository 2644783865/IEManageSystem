import BaseModule from 'Core/BaseModule'
import AuthorizeManage from 'AuthorizeManage/Module'
import CMSManage from 'CMSManage/Module'
import OAuthManage from 'OAuthManage/Module'
import Personal from 'Personal/Module'

import { reducer } from './Reducers'
import ReducerProvider from 'Core/Reducers/ReducerProvider'

export default class Module extends BaseModule
{
    constructor(){
        super();

        this.addDependModule(new Personal());
        this.addDependModule(new AuthorizeManage());
        this.addDependModule(new OAuthManage());
        this.addDependModule(new CMSManage());

        new ReducerProvider().register(reducer);
    }
}