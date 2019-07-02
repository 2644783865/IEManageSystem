import BaseModule from 'Core/Modules/BaseModule'
import ModuleFactory from 'Core/Modules/ModuleFactory'
import MiddlewareFactory from 'Core/MiddlewareFactory'
import {fecth} from 'Core/Middlewares'

class Module extends BaseModule
{
    initialize(){
        new MiddlewareFactory().register(fecth);
    }
}

new ModuleFactory().register(new Module(), "CoreModule");