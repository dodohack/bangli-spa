import { Component }         from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import { Router }            from '@angular/router';
import { Store }             from '@ngrx/store';


@Component({
    selector: 'bangli-spa',
    templateUrl: './app.html'
})
export class BangliSpa implements OnInit, OnDestroy
{
    constructor(private router: Router,
                private store: Store<AppState>) {}

    ngOnInit() {

    }

    ngOnDestroy() {

    }
}
