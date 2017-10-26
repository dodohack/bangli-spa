import { Inject, Component } from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import { Router,NavigationEnd } from '@angular/router';
import { Store }             from '@ngrx/store';
import { DOCUMENT }          from '@angular/common';
import { AppState }          from './core/reducers';

@Component({
    selector: 'app',
    templateUrl: './app.html',
})
export class BangliSpa implements OnInit, OnDestroy
{
    constructor(private router: Router,
                private store: Store<AppState>,
                @Inject(DOCUMENT) private document: any) {}

    ngOnInit() {
        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
            window.scrollTo(0, 0)
        });
    }

    ngOnDestroy() {

    }
}
