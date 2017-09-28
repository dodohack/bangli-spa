/**
 * Instead of importing lots of angular material modules into the main module,
 * we use this module to manage the importing angular material modules instead.
 */

import { NgModule } from '@angular/core';

import {
    MatInputModule,
    MatButtonModule,
    MatSidenavModule,
} from '@angular/material';

export const MODULES = [
    MatInputModule,
    MatButtonModule,
    MatSidenavModule
];

@NgModule({
    imports: MODULES,
    exports: MODULES
})
export class AppMaterialModule { }
