/**
 * Desktop sidebar
 */

import {
    Component,
    OnInit,
    OnDestroy,
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
import { ENTITY } from "../core/models/entity";
import { imageUrl } from '../core/utils';


@Component({
    selector: 'sidebar',
    templateUrl: './sidebar.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Sidebar implements OnInit, OnDestroy
{
    ads$: Observable<Entity[]>;
    paginators$: Observable<{[key: string]: Paginator}>;

    // Advertisements query params
    params: any;

    constructor(private store: Store<AppState>,
                private cd: ChangeDetectorRef) {}

    ngOnInit() {
        this.params = {
            key: 'default',
            per_page: 3,
            page: 1,
        };

        this.ads$ = this.store.select(getAdvertisesCurPage);
        this.paginators$ = this.store.select(getAdvertisePaginators);
        this.store.dispatch(new EntityActions.LoadEntities(
            {etype: ENTITY.ADVERTISE, data: this.params}));
    }

    ngOnDestroy() {

    }

    imgurl(uri: string) { return imageUrl(uri); }
}