/**
 * Site wide shared directives and components
 */

import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule }      from '@angular/router';

import { environment }  from '../../environments/environment';

import { TopNav }      from './mobile/top.nav';
import { BottomNav }   from './mobile/bottom.nav';

import { SiteHeader }  from './site.header';
import { SiteFooter }  from './site.footer';

export const COMPONENTS = environment.mobile ?
    [
        TopNav,
        BottomNav,
    ] :
    [
        // FIXME: Actually We could use MerchantTopic as OfferTopic!!
        SiteHeader,
        SiteFooter,
    ];


@NgModule({
    imports: [
        CommonModule,
        RouterModule,
    ],
    declarations: [
        COMPONENTS
    ],
    exports: [
        CommonModule,
        RouterModule,

        COMPONENTS
    ],
    providers: [

    ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return { ngModule: SharedModule };
    }
}
