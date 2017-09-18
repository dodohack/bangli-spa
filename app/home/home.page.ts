/**
 * Home page
 */
import { Component }         from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import { Store }             from '@ngrx/store';

import { AppState }          from '../core/reducers';

@Component({ templateUrl: './home.page.html' })
export class HomePage implements OnInit, OnDestroy
{
    constructor(private store: Store<AppState>) {}

    ngOnInit() {

    }

    ngOnDestroy() {

    }
}