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
import { TopicBody, VoucherCodeDialog }   from './mobile/topic.body';
import { Carousel }    from './carousel/carousel';
import { Slide }       from './carousel/slide';
import { OfferCardGroup }  from './mobile/offer-card-group';

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
        Carousel,
        Slide,
        OfferCardGroup,
        VoucherCodeDialog
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
    entryComponents: [
        VoucherCodeDialog
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
