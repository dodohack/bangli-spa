/**
 * Site wide shared directives and components
 */

import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule }  from '@angular/common';
import { RouterModule }  from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
    MatTabsModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatInputModule,
    MatRippleModule,
    MatExpansionModule,
    MatProgressBarModule,
    MatAutocompleteModule
} from '@angular/material';

import { NgxCarouselModule } from 'ngx-carousel';
import { ClipboardModule }   from 'ngx-clipboard';

import { AutofocusDirective } from './autofocus';
import { Helper }      from '../core/helper';
import { OfferCard }   from './offer-card';
//import { Search }      from './search';
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
    MatInputModule,
    MatRippleModule,
    MatExpansionModule,
    MatProgressBarModule,
    MatAutocompleteModule
];

export const COMPONENTS = [
    AutofocusDirective,
    OfferCard,
    //Search,
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
        FormsModule,
        ReactiveFormsModule,
        NgxCarouselModule,
        ClipboardModule,
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
        FormsModule,
        ReactiveFormsModule,
        NgxCarouselModule,
        ClipboardModule,
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
