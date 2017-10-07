/**
 * Home page
 */
import { Component }         from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import { Store }             from '@ngrx/store';
import { Router }            from "@angular/router";

import { AppState }          from '../core/reducers';


@Component({ templateUrl: './home.page.html' })
export class HomePage implements OnInit, OnDestroy
{
    constructor(/*private router: Router,*/
                private store: Store<AppState>) {}

    ngOnInit() {

    }

    ngOnDestroy() {

    }
}