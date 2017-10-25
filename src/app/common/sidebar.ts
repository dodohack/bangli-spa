/**
 * Desktop sidebar
 */

import {
    Component,
    Input,
    OnInit,
    ChangeDetectorRef,
    ChangeDetectionStrategy,
} from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from "rxjs";

import * as EntityActions from '../core/actions/entity';
import { Entity, Paginator } from "../core/models";
import {
    AppState,
    getAdvertisesCurPage,
    getAdvertisePaginators
} from '../core/reducers';

import {
    trigger,
    state,
    style,
    animate,
    transition
} from '@angular/animations';


import { ENTITY } from "../core/models/entity";
import { Helper } from '../core/helper';


@Component({
    selector: 'sidebar',
    templateUrl: './sidebar.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        trigger('fadeIn', [
            state('in', style({ opacity: '1'})),
            transition(':enter', [
                style({ opacity: '0'}),
                animate(500),
            ]),
        ]),
    ],
})
export class Sidebar implements OnInit
{
    // Which type of page this sidebar is shown on
    @Input() type: string;

    ads$: Observable<Entity[]>;
    paginators$: Observable<{[key: string]: Paginator}>;

    // Advertisements query params
    params: any;

    constructor(private store: Store<AppState>,
                private helper: Helper) {}

    ngOnInit() {
        this.params = {
            key: 'default',
            per_page: 5,
            page: 1,
            position: 'ad-pc-sidebar-banner',
            order_by: 'rank',
            order: 'asc'
        };

        this.ads$ = this.store.select(getAdvertisesCurPage);
        this.paginators$ = this.store.select(getAdvertisePaginators);
        this.store.dispatch(new EntityActions.LoadEntities(
            {etype: ENTITY.ADVERTISE, data: this.params}));
    }

}