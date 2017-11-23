import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';

import { DynamicBuilder } from './dynamic.builder';
import { DynamicContent } from './dynamic.content';

@NgModule({
    imports: [BrowserModule],
    declarations: [DynamicContent],
    exports:      [DynamicContent],
    providers: [ // singletons accross the whole app
        DynamicBuilder
    ]
})
export class DynamicModule {
    static forRoot()
    {
        return {
            ngModule: DynamicModule,
        }
    }
}
