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

import { reducers, metaReducers } from './core/reducers';
import { EntityEffects } from './core/effects';

import { AppMaterialModule } from './app-material.module';
import { BangliSpa }         from './app';
import { Page404 }           from './404.page';
import { HomeModule }        from './home/home.module';
import { SharedModule }      from './common/shared.module';
import { ShoppingModule }    from './shopping/shopping.module';

import { AppRoutes }         from './routes';
import { DefaultRouterStateSerializer } from '@ngrx/router-store';
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
        ShoppingModule,
        
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
        //{ provide: RouterStateSerializer, useClass: DefaultRouterStateSerializer },
    ],
    bootstrap: [ BangliSpa ]
})
export class BangliSpaModule { }