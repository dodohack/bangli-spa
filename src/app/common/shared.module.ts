/**
 * Site wide shared directives and components
 */

import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SiteHeader }  from './site.header';
import { SiteFooter }  from './site.footer';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        SiteHeader,
        SiteFooter,
    ],
    exports: [
        CommonModule,

        SiteHeader,
        SiteFooter,
    ],
    providers: [

    ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return { ngModule: SharedModule };
    }
}
