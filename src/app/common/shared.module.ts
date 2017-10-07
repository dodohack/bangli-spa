/**
 * Site wide shared directives and components
 */

import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule }  from '@angular/common';
import { RouterModule }  from '@angular/router';

import {
    MatTabsModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatRippleModule,
    MatExpansionModule
} from '@angular/material';

import { environment }   from '../../environments/environment';

import { TopNav }      from './mobile/top.nav';
import { BottomNav }   from './mobile/bottom.nav';
import { SideNav }     from './mobile/side.nav';
import { TopicHead }   from './mobile/topic.head';
import { TopicBody }   from './mobile/topic.body';
import { Card }        from './mobile/card';
import { Carousel }    from './carousel/carousel';
import { Slide }       from './carousel/slide';

import { SiteHeader }  from './site.header';
import { SiteFooter }  from './site.footer';

export const MD_MODULES = [
    MatTabsModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatRippleModule,
    MatExpansionModule
];

export const COMPONENTS = environment.mobile ?
    [
        TopNav,
        BottomNav,
        SideNav,
        TopicHead,
        TopicBody,
        Card,
        Carousel,
        Slide
    ] :
    [
        // FIXME: Actually We could use MerchantTopic as OfferTopic!!
        SiteHeader,
        SiteFooter,
        Carousel,
        Slide
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
