/**
 * Site wide shared directives and components
 */

import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule }  from '@angular/common';
import { RouterModule }  from '@angular/router';
import { MatTabsModule } from '@angular/material';
import { environment }   from '../../environments/environment';

import { TopNav }      from './mobile/top.nav';
import { BottomNav }   from './mobile/bottom.nav';
import { TopicHead }   from './mobile/topic.head';

import { SiteHeader }  from './site.header';
import { SiteFooter }  from './site.footer';

export const COMPONENTS = environment.mobile ?
    [
        TopNav,
        BottomNav,
        TopicHead,
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
        MatTabsModule,
    ],
    declarations: [
        COMPONENTS
    ],
    exports: [
        CommonModule,
        RouterModule,
        MatTabsModule,
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
