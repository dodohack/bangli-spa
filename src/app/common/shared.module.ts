/**
 * Site wide shared directives and components
 */

import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule }  from '@angular/common';
import { RouterModule }  from '@angular/router';
import { environment }   from '../../environments/environment';

import {
    MatTabsModule,
    MatButtonModule,
    MatCardModule,
    MatRippleModule
} from '@angular/material';



import { TopNav }      from './mobile/top.nav';
import { BottomNav }   from './mobile/bottom.nav';
import { TopicHead }   from './mobile/topic.head';
import { TopicBody }   from './mobile/topic.body';
import { Card }        from './mobile/card';

import { SiteHeader }  from './site.header';
import { SiteFooter }  from './site.footer';

export const MD_MODULES = [
    MatTabsModule,
    MatButtonModule,
    MatCardModule,
    MatRippleModule,
];

export const COMPONENTS = environment.mobile ?
    [
        TopNav,
        BottomNav,
        TopicHead,
        TopicBody,
        Card,
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
        MD_MODULES,
    ],
    declarations: [
        COMPONENTS
    ],
    exports: [
        CommonModule,
        RouterModule,
        MD_MODULES,
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
