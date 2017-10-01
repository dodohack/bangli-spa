import { Component }         from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import { ViewChild }         from '@angular/core';
import { Router }            from '@angular/router';
import { Store }             from '@ngrx/store';

import { environment }       from '../environments/environment';
import { AppState }          from './core/reducers';

@Component({
    selector: 'bangli-spa',
    templateUrl: './app.html'
})
export class _BangliSpa implements OnInit, OnDestroy
{
    constructor(private router: Router,
                private store: Store<AppState>) {}

    ngOnInit() {

    }

    ngOnDestroy() {

    }
}


//
// Mobile version
//
@Component({
    selector: 'bangli-spa',
    templateUrl: './app.m.html'
})
export class _BangliSpaMobile implements OnInit, OnDestroy
{
    constructor(private router: Router,
                private store: Store<AppState>) {}

    ngOnInit() {

    }

    ngOnDestroy() {

    }
}


export const BangliSpa = environment.mobile ? _BangliSpaMobile : _BangliSpa;