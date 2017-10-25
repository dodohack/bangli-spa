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
    MatExpansionModule,
    MatProgressBarModule
} from '@angular/material';

import { NgxCarouselModule } from 'ngx-carousel';

import { Helper } from '../core/helper';

import { OfferCard }   from './offer-card';

import { TopNav }      from './mobile/top.nav';
import { BottomNav }   from './mobile/bottom.nav';
import { SideNav }     from './mobile/side.nav';
import { TopicHead }   from './mobile/topic.head';
import { TopicBody, VoucherCodeDialog }   from './mobile/topic.body';

// Desktop only component
import { SiteHeader }  from './site.header';
import { SiteFooter }  from './site.footer';
import { Sidebar }     from './sidebar';

export const MD_MODULES = [
    MatTabsModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatRippleModule,
    MatExpansionModule,
    MatProgressBarModule
];

export const COMPONENTS = [
    OfferCard,
    TopNav,
    BottomNav,
    SideNav,
    TopicHead,
    TopicBody,
    VoucherCodeDialog,

    SiteHeader,
    SiteFooter,
    Sidebar,
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
    // Dynamic components entry point declaration
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
        Helper
    ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return { ngModule: SharedModule };
    }
}
