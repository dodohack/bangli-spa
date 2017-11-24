import { Inject, Component } from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import { PLATFORM_ID }       from '@angular/core';
import { Router,NavigationEnd } from '@angular/router';
import { DOCUMENT }          from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { Store }             from '@ngrx/store';
import { AppState }          from './core/reducers';
import "rxjs";

@Component({
    selector: 'app',
    templateUrl: './app.html',
})
export class BangliSpa implements OnInit, OnDestroy
{
    constructor(private router: Router,
                private store: Store<AppState>,
                @Inject(DOCUMENT) private document: any,
                @Inject(PLATFORM_ID) private platformId: Object) {}

    ngOnInit() {
        // window does not exist on server side
        if (isPlatformBrowser(this.platformId)) {
            this.router.events.subscribe((evt) => {
                if (!(evt instanceof NavigationEnd)) {
                    return;
                }
                window.scrollTo(0, 0)
            });
        }
    }

    ngOnDestroy() {

    }
}
