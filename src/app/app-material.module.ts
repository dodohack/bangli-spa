/**
 * Instead of importing lots of angular material modules into the main module,
 * we use this module to manage the importing angular material modules instead.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
    MdInputModule,
    MdButtonModule,
    MdSelectModule,
    MdToolbarModule,
} from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        MdInputModule,
        MdButtonModule,
        MdSelectModule,
        MdToolbarModule,
    ],
    exports: [
        MdInputModule,
        MdButtonModule,
        MdSelectModule,
        MdToolbarModule,
    ]
})
export class AppMaterialModule { }
