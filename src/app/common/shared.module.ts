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

import { NgxCarouselModule } from 'ngx-carousel';

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

export const COMPONENTS = [
        TopNav,
        BottomNav,
        SideNav,
        TopicHead,
        TopicBody,
        Carousel,
        Slide,
        OfferCardGroup,
        VoucherCodeDialog,

        SiteHeader,
        SiteFooter,
    ];


@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        NgxCarouselModule,
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
        NgxCarouselModule,
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
