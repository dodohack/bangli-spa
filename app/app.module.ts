import { NgModule }          from '@angular/core';
import { HttpModule }        from '@angular/http';
import { StoreModule }       from '@ngrx/store';
import { EffectsModule }     from '@ngrx/effects';
import { AppMaterialModule } from './app-material.module';

import { BangliSpa }         from './app';
import { SharedModule }      from './common/shared.module';

@NgModule({
    imports: [
        HttpModule,
        AppMaterialModule,

        SharedModule,
    ],
    declarations: [
        BangliSpa
    ],
    providers: [

    ],
    bootstrap: [ BangliSpa ]
})
export class BangliSpaModule { }