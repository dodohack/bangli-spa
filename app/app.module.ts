import { NgModule }          from '@angular/core';
import { CommonModule }      from '@angular/common';
import { BrowserModule }     from '@angular/platform-browser';
import { HttpModule }        from '@angular/http';
import { RouterModule }      from '@angular/router';

import { StoreModule }       from '@ngrx/store';
import { EffectsModule }     from '@ngrx/effects';
import {
    StoreRouterConnectingModule,
    RouterStateSerializer,
} from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { reducers, metaReducers } from './core/reducers';
import { EntityEffects } from './core/effects';

import { AppMaterialModule } from './app-material.module';
import { BangliSpa }         from './app';
import { Page404 }           from './404.page';
import { HomeModule }        from './home/home.module';
import { SharedModule }      from './common/shared.module';
import { OfferModule }       from './offer/offer.module';

import { AppRoutes }            from './routes';
import { CustomRouterStateSerializer } from "./core/utils";

@NgModule({
    imports: [
        AppRoutes,
        CommonModule,
        BrowserModule,
        RouterModule,
        HttpModule,
        AppMaterialModule,

        SharedModule,
        HomeModule,
        OfferModule,

        StoreModule.forRoot(reducers, { metaReducers }),
        StoreRouterConnectingModule,

        EffectsModule.forRoot([EntityEffects]),
    ],
    declarations: [
        BangliSpa,
        Page404,
    ],
    providers: [
        /**
         * Thie 'RouterStateSnapshot' provided by the 'Router' is a large
         * complex structure. A custom RouterStateSerializer is used to parse
         * the 'RouterStateSnapshot' provided by '@ngrx/router-store' to
         * include only the desired pieces of the snapshot.
         */
        { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer },
    ],
    bootstrap: [ BangliSpa ]
})
export class BangliSpaModule { }