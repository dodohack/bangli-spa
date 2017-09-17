/**
 * Site wide footer
 */

import {
    Component,
    OnInit,
    OnDestroy,
    ChangeDetectorRef,
    ChangeDetectionStrategy,
} from '@angular/core';

import { Store } from '@ngrx/store';

import { AppState } from '../core/reducers';

@Component({
    selector: 'site-footer',
    templateUrl: './site.footer.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SiteFooter implements OnInit, OnDestroy
{
    constructor(private store: Store<AppState>,
                private cd: ChangeDetectorRef) {}

    ngOnInit() {

    }

    ngOnDestroy() {

    }
}