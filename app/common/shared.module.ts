/**
 * Site wide shared directives and components
 */

import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SiteHeader }  from './site.header';
import { SiteFooter }  from './site.footer';
//import { SearchModal } from './search';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        SiteHeader,
        SiteFooter,
        //SearchModal,
    ],
    exports: [
        CommonModule,

        SiteHeader,
        SiteFooter,
        //SearchModal,
    ],
    providers: [

    ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return { ngModule: SharedModule };
    }
}
