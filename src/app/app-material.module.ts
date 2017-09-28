/**
 * Instead of importing lots of angular material modules into the main module,
 * we use this module to manage the importing angular material modules instead.
 */

import { NgModule } from '@angular/core';

import {
    MatTabsModule,
    MatInputModule,
    MatButtonModule,
    MatSidenavModule,
    MatSnackBarModule
} from '@angular/material';

export const MODULES = [
    MatTabsModule,
    MatInputModule,
    MatButtonModule,
    MatSidenavModule,
    MatSnackBarModule
];

@NgModule({
    imports: MODULES,
    exports: MODULES
})
export class AppMaterialModule { }
