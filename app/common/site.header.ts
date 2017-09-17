/**
 * This is site wide common component, it shows different logos and banners
 * for different channels.
 * NOTE: it is named <site-header> to avoid name conflict with <header>
 */

import {
    Component,
    OnInit,
    OnDestroy,
    Input,
    Output,
    SimpleChanges,
    OnChanges,
    ChangeDetectorRef,
    ChangeDetectionStrategy,
} from '@angular/core';

import {
    Router,
    ActivatedRoute
} from '@angular/router';

import { Store } from '@ngrx/store';

import {
    AppState
} from '../core/reducers';


@Component({
    selector: 'site-header',
    templateUrl: './site.header.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SiteHeader implements OnInit, OnDestroy
{
    constructor(private route: ActivatedRoute,
                private store: Store<AppState>,
                private cd: ChangeDetectorRef) {}

    ngOnInit() {

    }

    ngOnDestroy() {

    }
}