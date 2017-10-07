/**
 * Instead of importing lots of angular material modules into the main module,
 * we use this module to manage the importing angular material modules instead.
 */

import { NgModule } from '@angular/core';

import {
    MatTabsModule,
    MatListModule,
    MatInputModule,
    MatButtonModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatExpansionModule,
} from '@angular/material';

export const MODULES = [
    MatTabsModule,
    MatListModule,
    MatInputModule,
    MatButtonModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatExpansionModule,
];

@NgModule({
    imports: MODULES,
    exports: MODULES
})
export class AppMaterialModule { }
