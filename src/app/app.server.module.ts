import { NgModule }           from '@angular/core';
import { ServerModule }       from '@angular/platform-server';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';

import {
    StoreRouterConnectingModule,
    RouterStateSerializer,
} from '@ngrx/router-store';

import { BangliSpa }         from './app';
import { BangliSpaModule }   from './app.module';
import { DefaultRouterStateSerializer } from '@ngrx/router-store';
import { CustomRouterStateSerializer } from "./core/utils";


@NgModule({
    imports: [
        // The BangliSpaServerModule should import BangliSpaModule followed
        // by the ServerModule from @angular/platform-server.
        BangliSpaModule,
        ServerModule,
        ModuleMapLoaderModule,
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
    // Since the bootstrapped component is not inherited from your
    // imported AppModule, it needs to be repeated here.
    bootstrap: [ BangliSpa ]
})
export class BangliSpaServerModule { }