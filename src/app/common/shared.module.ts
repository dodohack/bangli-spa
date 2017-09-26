/**
 * Site wide shared directives and components
 */

import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule }      from '@angular/router';

import { SiteHeader }  from './site.header';
import { SiteFooter }  from './site.footer';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
    ],
    declarations: [
        SiteHeader,
        SiteFooter,
    ],
    exports: [
        CommonModule,
        RouterModule,

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
