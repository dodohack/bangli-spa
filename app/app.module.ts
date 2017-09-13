import { NgModule }          from '@angular/core';
import { HttpModule }        from '@angular/http';
import { StoreModule }       from '@ngrx/store';
import { EffectsModule }     from '@ngrx/effects';
import { AppMaterialModule } from './app-material.module';


@NgModule({
    imports: [
        HttpModule,
        AppMaterialModule
    ],
    declarations: [
        BangliSpa
    ],
    providers: [

    ],
    bootstrap: [ BangliSpa ]
})
export class BangliSpaModule { }